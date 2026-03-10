// SQLite database initialization and management

import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

let db: Database | null = null;

export async function initializeDatabase(): Promise<Database> {
  if (db) {
    return db;
  }

  const dbPath = process.env.DATABASE_URL || "./data/videos.db";

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // Enable foreign keys
  await db.exec("PRAGMA foreign_keys = ON");

  // Create favorites table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_path TEXT UNIQUE NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  return db;
}

export async function getDatabase(): Promise<Database> {
  if (!db) {
    return initializeDatabase();
  }
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}
