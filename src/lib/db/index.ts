import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/lib/db/schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to initialize Drizzle.");
}

const client = postgres(databaseUrl, {
  max: 1,
  prepare: false,
});

export const db = drizzle(client, { schema });

export type Database = typeof db;
