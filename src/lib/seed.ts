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
      { page: 'mobile-services', section: 'title', content: 'Mobile Scooter Repairs Across Melbourne' },
      { page: 'mobile-services', section: 'intro', content: 'We know it\'s not always easy to bring your scooter into a workshop. That\'s why we offer mobile repairs anywhere in greater Melbourne.' },
      { page: 'mobile-services', section: 'how_it_works_title', content: 'How it Works:' },
      { page: 'mobile-services', section: 'step_1', content: 'Book online in under 90 seconds' },
      { page: 'mobile-services', section: 'step_2', content: 'Tell us your ideal time – we\'ll confirm the best slot with you' },
      { page: 'mobile-services', section: 'step_3', content: 'Our technician comes to your location, fully equipped' },
      { page: 'mobile-services', section: 'step_4', content: 'Most issues are fixed on the spot. If extra work is needed, we\'ll take your scooter to the workshop, repair it, and return it – with no extra fees' },
      { page: 'mobile-services', section: 'why_choose_title', content: 'Why Choose Mobile Repairs?' },
      { page: 'mobile-services', section: 'benefit_1', content: 'No need to transport your scooter' },
      { page: 'mobile-services', section: 'benefit_2', content: 'Repairs done on the spot, while you wait' },
      { page: 'mobile-services', section: 'benefit_3', content: 'Same level of service and transparency as in the workshop' },
      { page: 'mobile-services', section: 'benefit_4', content: 'Save time, avoid hassle, and ride sooner' },
      { page: 'mobile-services', section: 'cta_text', content: 'Book a Mobile Repair Now' },
      { page: 'mobile-services', section: 'cta_subtitle', content: 'we\'ll come to you.' },
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
