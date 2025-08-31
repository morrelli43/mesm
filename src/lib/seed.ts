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
      { page: 'home', section: 'hero_title', content: 'Melbourne\'s Trusted e-Scooter Repair Specialists' },
      { page: 'home', section: 'hero_subtitle', content: 'Fast, friendly, and professional repairs — from tyre punctures to complex battery issues. Book your repair in just 90 seconds.' },
      // Introductory Copy
      { page: 'home', section: 'intro_content', content: 'At Melbourne eScooter Mechanics, we know how frustrating it is when your scooter breaks down. Whether it\'s a flat tyre, a scooter that won\'t turn on, or crash damage, we\'ll get you back on the road quickly.\n\nUnlike other repairers, we:\n• Offer mobile repairs across greater Melbourne\n• Provide transparent service — you\'ll get photos, updates, and calls during the repair\n• Have the experience and supplier network to handle almost any scooter brand\n• Are one of the only local mechanics who can repair out-of-balance batteries\n• Work fast — many repairs done on the spot or same day\n\nDon\'t risk costly DIY mistakes or unreliable services. Trust the team that Melbourne riders recommend.' },
      // Features
      { page: 'home', section: 'feature_1_title', content: 'Best eScooter Technicians' },
      { page: 'home', section: 'feature_1_content', content: 'Our technicians are the best in Melbourne, with years of experience.' },
      { page: 'home', section: 'feature_2_title', content: 'Mobile Service' },
      { page: 'home', section: 'feature_2_content', content: "We come to you, so you don't have to transport your scooter. Weather permitting!" },
      { page: 'home', section: 'feature_3_title', content: 'Years of Experience' },
      { page: 'home', section: 'feature_3_content', content: 'We have years of experience repairing all makes and models of eScooters.' },
      // About
      { page: 'home', section: 'about_title', content: 'About Us' },
      { page: 'home', section: 'about_content', content: 'We\'re a small, experienced team of technicians with years of background in Australia\'s top e-scooter retailers. We\'re not tied to any manufacturer or retailer, so our advice is always honest and independent.\n\nFrom kids\' scooters to high-performance e-scooters, we\'ve seen it all. If your scooter can be fixed, we\'ll find the solution.' },
      // Trust & Credibility
      { page: 'home', section: 'trust_title', content: 'Trust & Credibility' },
      { page: 'home', section: 'trust_content', content: '✔ Years of experience in the scooter industry\n✔ Strong relationships with Australia\'s biggest retailers\n✔ Independent and impartial advice — no brand bias\n✔ Transparent service — we\'ll always contact you before extra work is done\n✔ Backed by 5-star Google reviews from Melbourne scooter owners' },
      // Testimonials
      { page: 'home', section: 'testimonials_title', content: 'What Our Customers Say' },
      { page: 'home', section: 'testimonial_1', content: '"Excellent service! Quick tyre replacement on the spot and friendly staff who explained everything clearly." – Sarah L.' },
      { page: 'home', section: 'testimonial_2', content: '"Tried other places before but these guys actually fixed the problem the same day. Highly recommend." – Daniel M.' },
      { page: 'home', section: 'testimonial_3', content: '"They kept me updated with photos and calls during the repair. Super professional and trustworthy." – Alex R.' },
      // Final Call-to-Action
      { page: 'home', section: 'final_cta_title', content: 'Ready to get back on the road?' },
      { page: 'home', section: 'final_cta_content', content: 'Booking with us takes less than 90 seconds. Just tell us what\'s wrong with your scooter, choose a time, and our team will handle the rest.' },
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
