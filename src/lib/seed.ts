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
      { page: 'about', section: 'title', content: 'About Us – Melbourne eScooter Mechanics' },
      { page: 'about', section: 'who_we_are_title', content: 'Who We Are' },
      { page: 'about', section: 'who_we_are_content', content: 'At Melbourne eScooter Mechanics, we\'re passionate about keeping riders moving. With years of hands-on experience working for Australia\'s top e-scooter retailers, we\'ve seen (and fixed) just about every problem out there.\n\nOur team combines professional expertise with a friendly, approachable service that puts you first.' },
      { page: 'about', section: 'why_choose_us_title', content: 'Why Choose Us' },
      { page: 'about', section: 'why_choose_us_1', content: 'Experienced Technicians – We know e-scooters inside out, from kids\' models to high-performance machines.' },
      { page: 'about', section: 'why_choose_us_2', content: 'Trusted & Independent – We\'re not tied to any brand or retailer, so our advice is always impartial and honest.' },
      { page: 'about', section: 'why_choose_us_3', content: 'Transparent Service – We keep you updated with photos, phone calls, and approval requests before making important repair decisions.' },
      { page: 'about', section: 'why_choose_us_4', content: 'Fast Turnaround – Many repairs are done on the spot or the same day. Tyre changes can often be completed while you wait.' },
      { page: 'about', section: 'why_choose_us_5', content: 'Mobile Repairs – Can\'t get to us? We\'ll come to you anywhere in greater Melbourne, and if your scooter needs extra work, we\'ll take it to the workshop, fix it, and return it at no extra charge.' },
      { page: 'about', section: 'why_choose_us_6', content: 'Community Focus – We\'re local, independent, and proud to support Melbourne riders with reliable, affordable service.' },
      { page: 'about', section: 'why_choose_us_7', content: 'Customer Satisfaction – If you\'re not happy with our repair, we\'ll work with you until it\'s right.' },
      { page: 'about', section: 'mission_title', content: 'Our Mission' },
      { page: 'about', section: 'mission_content', content: 'We know how much you rely on your scooter — for commuting, convenience, or just the joy of riding. Our mission is simple:\nFast, friendly, and reliable repairs that keep Melbourne riders on the road.' },
      { page: 'about', section: 'where_we_operate_title', content: 'Where We Operate' },
      { page: 'about', section: 'where_we_operate_content', content: 'Our workshop is based in Heidelberg, and we service all of greater Melbourne with our mobile repair team. For special requests outside the city, just get in touch.' },
      { page: 'about', section: 'cta_text', content: 'Book Your Repair in 90 Seconds' },
      { page: 'about', section: 'cta_subtitle', content: 'Trusted service, friendly team, and Melbourne\'s most convenient e-scooter repairs.' },
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
      // Services Page
      { page: 'services', section: 'title', content: 'Our Services' },
      { page: 'services', section: 'subtitle', content: 'At Melbourne eScooter Mechanics, we handle everything from quick fixes to complex electrical repairs. Our goal is to get you back riding safely and as quickly as possible.' },
      { page: 'services', section: 'services_title', content: 'Common Repairs We Handle:' },
      { page: 'services', section: 'service_1_title', content: 'Tyre Punctures & Replacements' },
      { page: 'services', section: 'service_1_content', content: 'Flat tyres are the most common e-scooter issue. We can replace or repair them while you wait.' },
      { page: 'services', section: 'service_2_title', content: 'Scooters Not Turning On' },
      { page: 'services', section: 'service_2_content', content: 'Electrical issues can be frustrating — we diagnose the fault and get your scooter running again.' },
      { page: 'services', section: 'service_3_title', content: 'Battery Repairs & Balancing' },
      { page: 'services', section: 'service_3_content', content: 'We\'re one of the few local mechanics who can repair out-of-balance batteries and extend their life.' },
      { page: 'services', section: 'service_4_title', content: 'Crash & Accident Damage' },
      { page: 'services', section: 'service_4_content', content: 'From broken frames to bent parts, we can assess the damage and get your scooter back in shape.' },
      { page: 'services', section: 'service_5_title', content: 'General Maintenance & Safety Checks' },
      { page: 'services', section: 'service_5_content', content: 'Brakes, lights, steering, and more — we\'ll make sure everything is in safe working order.' },
      { page: 'services', section: 'service_6_title', content: 'Diagnostics' },
      { page: 'services', section: 'service_6_content', content: 'Not sure what\'s wrong? We provide full diagnostic testing for $70, giving you answers and a clear repair path.' },
      { page: 'services', section: 'cta_text', content: '👉 Book Your Repair Now – it only takes 90 seconds.' },
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
