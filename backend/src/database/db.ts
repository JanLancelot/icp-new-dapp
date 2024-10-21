// src/database/db.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
}

export async function initializeDatabase() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS organizations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      website TEXT NOT NULL,
      address1 TEXT NOT NULL,
      address2 TEXT,
      city TEXT NOT NULL,
      region TEXT NOT NULL,
      postalCode TEXT NOT NULL,
      country TEXT NOT NULL,
      phone TEXT NOT NULL,
      category TEXT NOT NULL,
      hideMap BOOLEAN NOT NULL,
      linkedin TEXT,
      facebook TEXT,
      twitter TEXT,
      photoUrl TEXT,
      mission TEXT NOT NULL,
      description TEXT NOT NULL,
      causes TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS volunteer_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      dob TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      province TEXT NOT NULL,
      zipCode TEXT NOT NULL,
      citizenship TEXT NOT NULL,
      skills TEXT NOT NULL,
      languages TEXT NOT NULL,
      volunteeredBefore TEXT NOT NULL,
      additionalQualifications TEXT,
      daysAvailable TEXT NOT NULL,
      monthsAvailable TEXT NOT NULL,
      totalHours INTEGER NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("Database initialized.");
  await db.close();
}

export async function createOrganization(org: any) {
  const db = await openDb();
  const result = await db.run(`
    INSERT INTO organizations (
      name, website, address1, address2, city, region, postalCode, country,
      phone, category, hideMap, linkedin, facebook, twitter, photoUrl,
      mission, description, causes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    org.name, org.website, org.address1, org.address2, org.city, org.region,
    org.postalCode, org.country, org.phone, org.category, org.hideMap ? 1 : 0,
    org.linkedin, org.facebook, org.twitter, org.photoUrl, org.mission,
    org.description, JSON.stringify(org.causes)
  ]);
  await db.close();
  return result.lastID;
}

export async function createVolunteerApplication(application: any) {
  const db = await openDb();
  const result = await db.run(`
    INSERT INTO volunteer_applications (
      firstName, lastName, dob, email, phone, address, city, province,
      zipCode, citizenship, skills, languages, volunteeredBefore,
      additionalQualifications, daysAvailable, monthsAvailable, totalHours
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    application.firstName, application.lastName, application.dob, application.email,
    application.phone, application.address, application.city, application.province,
    application.zipCode, application.citizenship, JSON.stringify(application.skills),
    JSON.stringify(application.languages), application.volunteeredBefore,
    application.additionalQualifications, JSON.stringify(application.daysAvailable),
    JSON.stringify(application.monthsAvailable), application.totalHours
  ]);
  await db.close();
  return result.lastID;
}