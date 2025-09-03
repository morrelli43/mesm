import { NextRequest, NextResponse } from "next/server";
import { signUp } from "@/lib/auth-client";

export async function POST() {
  try {
    // Create the test user using Better Auth
    const result = await signUp.email({
      email: "test@test.com",
      password: "test",
      name: "Test User",
    });

    if (result.error) {
      if (result.error.code === "USER_ALREADY_EXISTS") {
        return NextResponse.json(
          { message: "Test user already exists", email: "test@test.com" },
          { status: 200 }
        );
      }
      throw new Error(result.error.message);
    }

    return NextResponse.json(
      { 
        message: "Test user created successfully", 
        email: "test@test.com",
        password: "test" 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating test user:", error);
    return NextResponse.json(
      { error: "Failed to create test user" },
      { status: 500 }
    );
  }
}