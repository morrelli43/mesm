import { NextResponse } from 'next/server';
import userProfileData from '@/data/user-profile.json';

export async function GET() {
  try {
    // In a real app, this would get the user from session/auth
    const userProfile = userProfileData[0];
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}