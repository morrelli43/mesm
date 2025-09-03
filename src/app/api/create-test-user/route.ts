import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST() {
  try {
    // Create the test user using Better Auth's internal API
    const result = await auth.api.signUpEmail({
      body: {
        email: "test@test.com",
        password: "test",
        name: "Test User",
      }
    });

    if (result.user) {
      return NextResponse.json(
        { 
          message: "Test user created successfully", 
          email: "test@test.com",
          password: "test" 
        },
        { status: 201 }
      );
    } else {
      // Check if user already exists
      return NextResponse.json(
        { message: "Test user already exists", email: "test@test.com" },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    console.error("Error creating test user:", error);
    
    // Check if the error is because user already exists
    if (error instanceof Error && error.message && error.message.includes("already exists")) {
      return NextResponse.json(
        { message: "Test user already exists", email: "test@test.com" },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create test user", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}