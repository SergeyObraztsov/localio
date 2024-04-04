// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from 'next-auth/adapters';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => name);

export const users = createTable('user', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 256 }),
  phoneNumber: varchar('phone_number', { length: 256 }).unique(),
  isActivated: boolean('is_activated').default(false),
  otp: varchar('otp', { length: 4 }),
  email: varchar('email', { length: 256 }).unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: varchar('image'),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});

export const usersRelations = relations(users, ({ one, many }) => ({
  usersProfile: one(usersProfiles),
  accounts: many(accounts)
}));

export const usersProfiles = createTable('user_profile', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  position: varchar('position', { length: 256 }),
  description: text('description'),
  telegramChatId: varchar('telegram_chat_id', { length: 256 }),
  telegramUsername: varchar('telegram_username', { length: 256 })
});

export const profileRelations = relations(usersProfiles, ({ one }) => ({
  user: one(users, { fields: [usersProfiles.userId], references: [users.id] })
}));

export const spots = createTable('spot', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 256 }),
  description: text('description'),
  location: varchar('location'),
  image: varchar('image'),
  typeId: integer('type_id')
    .references(() => spotTypes.id)
    .notNull(),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});

export const spotsRelations = relations(spots, ({ many, one }) => ({
  subscriptions: many(spotSubscriptions),
  types: one(spotTypes, { fields: [spots.typeId], references: [spotTypes.id] })
}));

export const spotTypes = createTable('spot_type', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  image: varchar('image')
});

export const spotSubscriptions = createTable('spot_subscription', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  spotId: uuid('spot_id').references(() => spots.id),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  closedAt: timestamp('closed_at')
});

export const subscriptionsRelations = relations(spotSubscriptions, ({ one }) => ({
  spot: one(spots, { fields: [spotSubscriptions.spotId], references: [spots.id] }),
  user: one(users, { fields: [spotSubscriptions.userId], references: [users.id] })
}));

// auth
export const accounts = createTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id),
    type: varchar('type', { length: 255 }).$type<AdapterAccount['type']>().notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 })
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId]
    }),
    userIdIdx: index('account_userId_idx').on(account.userId)
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] })
}));

export const sessions = createTable(
  'session',
  {
    sessionToken: varchar('sessionToken', { length: 255 }).notNull().primaryKey(),
    userId: uuid('userId')
      .notNull()
      .references(() => users.id),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (session) => ({
    userIdIdx: index('session_userId_idx').on(session.userId)
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] })
}));

export const verificationTokens = createTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
);
