import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '../server/db/index';

const main = async () => {
  try {
    // This will run migrations on the database, skipping the ones already applied
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('migration successful');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

await main();
