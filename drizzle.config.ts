import { defineConfig } from "drizzle-kit";
import './envConfig';

export default defineConfig({
  dialect: 'mysql',
  schema: './src/db/schema',
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!
  }
})
