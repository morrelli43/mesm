import { auth } from './auth';

async function initializeAuth() {
  try {
    console.log('Initializing Better Auth database...');
    // This should trigger the database initialization
    await auth.api.listSessions({
      query: {},
      headers: new Headers()
    });
    console.log('✓ Better Auth database initialized successfully');
  } catch (error) {
    console.error('Error initializing Better Auth:', error);
    throw error;
  }
}

if (require.main === module) {
  initializeAuth().catch(console.error);
}

export { initializeAuth };