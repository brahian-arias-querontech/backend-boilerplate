import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { appConfig } from './src/config';

export default defineConfig({
  out: './drizzle',
  schema: './src/shared/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: appConfig.db.url
  },
});
