import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    host: 'ms1-postgres',
    user: 'admin',
    password: 'admin',
    port: 5432,
    database: 'ms_db',
    ssl: false,
  },
});
