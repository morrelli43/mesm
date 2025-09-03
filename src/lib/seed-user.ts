import 'dotenv/config';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import bcrypt from 'bcryptjs';

// Better Auth user schema interface
interface UserTable {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PasswordTable {
  id: string;
  userId: string;
  hashedPassword: string;
}

interface Database {
  user: UserTable;
  password: PasswordTable;
}

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL || "postgresql://localhost:5432/mesm_development",
  })
});

const db = new Kysely<Database>({
  dialect,
});

async function createTestUser() {
  try {
    console.log('Creating test user...');
    
    const testEmail = 'test@test.com';
    const testPassword = 'test';
    const testName = 'Test User';
    
    // Check if user already exists
    const existingUser = await db
      .selectFrom('user')
      .where('email', '=', testEmail)
      .selectAll()
      .executeTakeFirst();
    
    if (existingUser) {
      console.log('Test user already exists');
      return;
    }
    
    // Generate unique user ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(testPassword, 12);
    
    // Create user
    await db
      .insertInto('user')
      .values({
        id: userId,
        email: testEmail,
        name: testName,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .execute();
    
    // Create password entry
    await db
      .insertInto('password')
      .values({
        id: `password_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: userId,
        hashedPassword: hashedPassword,
      })
      .execute();
    
    console.log('✓ Test user created successfully!');
    console.log('Email: test@test.com');
    console.log('Password: test');
    
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
}

async function checkTables() {
  try {
    // Check if Better Auth tables exist
    const tableCheck = await db
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .selectFrom('information_schema.tables' as any)
      .where('table_schema', '=', 'public')
      .where('table_name', 'in', ['user', 'password', 'session', 'account'])
      .select(['table_name'])
      .execute();
    
    console.log('Found tables:', tableCheck.map(t => t.table_name));
    
    if (tableCheck.length === 0) {
      console.log('⚠ Better Auth tables not found. Please start the application first to initialize the database.');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking tables:', error);
    return false;
  }
}

async function main() {
  try {
    console.log('✓ Checking database connection and tables...');
    
    const tablesExist = await checkTables();
    if (!tablesExist) {
      console.log('✗ Database tables not ready. Please run the application first.');
      process.exit(1);
    }
    
    await createTestUser();
    console.log('✓ User seeding complete!');
    
  } catch (error) {
    console.error('✗ Error during user seeding:', error);
    process.exit(1);
  } finally {
    await db.destroy();
    process.exit(0);
  }
}

main();