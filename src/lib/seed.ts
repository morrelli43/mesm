import 'dotenv/config';
import { db } from './db';
import { sql, ColumnDefinitionBuilder } from 'kysely';

async function seed() {
  const createTable = await db.schema
    .createTable('page_content')
    .ifNotExists()
    .addColumn('id', 'serial', (cb: ColumnDefinitionBuilder) => cb.primaryKey())
    .addColumn('page', 'varchar(255)', (cb: ColumnDefinitionBuilder) => cb.notNull())
    .addColumn('section', 'varchar(255)', (cb: ColumnDefinitionBuilder) => cb.notNull())
    .addColumn('content', 'text', (cb: ColumnDefinitionBuilder) => cb.notNull())
    .execute();

  console.log('Created "page_content" table');

  // Clear existing data
  await sql`TRUNCATE TABLE page_content RESTART IDENTITY`.execute(db);
  console.log('Cleared existing data');

  const insertedContent = await db
    .insertInto('page_content')
    .values([
      // Hero
      { page: 'home', section: 'hero_title', content: 'Mobile eScooter Mechanics in Melbourne' },
      { page: 'home', section: 'hero_subtitle', content: 'We come to you! Hassle-free eScooter repairs at your home or office.' },
      // Features
      { page: 'home', section: 'feature_1_title', content: 'Best eScooter Technicians' },
      { page: 'home', section: 'feature_1_content', content: 'Our technicians are the best in Melbourne, with years of experience.' },
      { page: 'home', section: 'feature_2_title', content: 'Mobile Service' },
      { page: 'home', section: 'feature_2_content', content: "We come to you, so you don't have to transport your scooter. Weather permitting!" },
      { page: 'home', section: 'feature_3_title', content: 'Years of Experience' },
      { page: 'home', section: 'feature_3_content', content: 'We have years of experience repairing all makes and models of eScooters.' },
      // About
      { page: 'home', section: 'about_title', content: 'About Us' },
      { page: 'home', section: 'about_content', content: "We are here to fix your scooter as quickly and professionally as possible. Don't worry about transporting your scooter, we come to you!" },
      // Quick Message
      { page: 'home', section: 'quick_message_title', content: 'Quick Message' },
      { page: 'home', section: 'quick_message_disclaimer', content: 'Please do not use this form for booking enquiries.' },
      // About Page
      { page: 'about', section: 'title', content: 'About Us' },
      { page: 'about', section: 'content', content: 'This will describe the history of the company. It started from the understanding that the current state of eScooter repairs were not meeting the needs of the owners. The standard of care and convenience was not as high as it could be. The technicians at Melbourne eScooter Mechanic are defining the standard for Melbourne. With deep technical knowledge for how these machines work and can combine this with the convenience of a mobile service there is no other company that can compete with that level of service.' },
      // For Sale Page
      { page: 'for-sale', section: 'title', content: 'For Sale' },
      { page: 'for-sale', section: 'content', content: 'This will list eScooters that have been refurbished by our technicians. You can trust that these second hand scooters have been fully checked and are in great condition. Some scooters will even have modifications added to them, we believe improve from the manufacturers implementations.' },
      // Contact Page
      { page: 'contact', section: 'title', content: 'Contact Us' },
      { page: 'contact', section: 'content', content: 'This page will give an overview of the opening times of the shop. Contact information. The location of the store and holiday beaks. There will also be links to the social media pages. If customer want to contact the store there will be a simple contact form or they can send an email be clicking a link.' },
      // Book a Service Page
      { page: 'book-a-service', section: 'title', content: 'Book a Service' },
      { page: 'book-a-service', section: 'content', content: 'This is the core service of the frontend site. It will be a booking form where users fill in information about their scooter location and requirements. The form will be split into 5 different sections/pages.' },
      // Mobile Services Page
      { page: 'mobile-services', section: 'title', content: 'Mobile Services' },
      { page: 'mobile-services', section: 'content', content: 'They will be an overview of the mobile services, where the service areas are, the differences in callout charges.' },
    ])
    .execute();
  
  console.log('Seeded content');

  return {
    createTable,
    insertedContent,
  };
}

seed()
  .then(() => {
    console.log('Seeding complete');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error during seeding:', err);
    process.exit(1);
  });
