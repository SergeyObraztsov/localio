// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from 'drizzle-orm';
import {
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => name);

export const users = createTable('user', {
  id: integer('id').unique().primaryKey().notNull(),
  name: varchar('name', { length: 256 }),
  phoneNumber: varchar('phone_number', { length: 256 }).unique(),
  email: varchar('email', { length: 256 }).unique(),
  telegramUsername: varchar('telegram_username').unique(),
  image: varchar('image'),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});

export const usersRelations = relations(users, ({ one }) => ({
  usersProfile: one(usersProfiles)
}));

export const usersProfiles = createTable('user_profile', {
  id: serial('id').primaryKey().unique(),
  userId: integer('user_id')
    .references(() => users.id)
    .unique(),
  position: varchar('position', { length: 256 }),
  description: text('description')
});

export const profileRelations = relations(usersProfiles, ({ one }) => ({
  user: one(users, { fields: [usersProfiles.userId], references: [users.id] })
}));

export const spots = createTable('spot', {
  id: uuid('id').defaultRandom().primaryKey().unique().notNull(),
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
  userId: integer('user_id').references(() => users.id),
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
