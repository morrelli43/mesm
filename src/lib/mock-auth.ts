"use client";

// Mock authentication for demo purposes
// This is a temporary solution to demonstrate the admin interface

const MOCK_USER = {
  id: "test-user-id",
  email: "test@test.com",
  name: "Test User",
};

// Simple in-memory session storage for demo
let currentUser: typeof MOCK_USER | null = null;

export const mockAuth = {
  signIn: async (email: string, password: string) => {
    if (email === "test@test.com" && password === "test") {
      currentUser = MOCK_USER;
      // Store in localStorage and cookies for persistence
      if (typeof window !== "undefined") {
        localStorage.setItem("mock-auth-user", JSON.stringify(MOCK_USER));
        document.cookie = "mock-auth-user=" + JSON.stringify(MOCK_USER) + "; path=/; max-age=86400";
      }
      return { success: true, user: MOCK_USER };
    }
    throw new Error("Invalid credentials");
  },

  signUp: async (email: string, password: string, name: string) => {
    if (email === "test@test.com") {
      const user = { ...MOCK_USER, name };
      currentUser = user;
      if (typeof window !== "undefined") {
        localStorage.setItem("mock-auth-user", JSON.stringify(user));
        document.cookie = "mock-auth-user=" + JSON.stringify(user) + "; path=/; max-age=86400";
      }
      return { success: true, user };
    }
    throw new Error("User already exists or invalid data");
  },

  signOut: async () => {
    currentUser = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("mock-auth-user");
      document.cookie = "mock-auth-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    return { success: true };
  },

  getSession: () => {
    if (currentUser) return currentUser;
    
    // Check localStorage for persisted session
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("mock-auth-user");
      if (stored) {
        try {
          currentUser = JSON.parse(stored);
          return currentUser;
        } catch {
          localStorage.removeItem("mock-auth-user");
        }
      }
    }
    return null;
  },

  isAuthenticated: () => {
    return mockAuth.getSession() !== null;
  },
};

export const useSession = () => {
  const user = mockAuth.getSession();
  return {
    data: user ? { user } : null,
    status: user ? "authenticated" : "unauthenticated"
  };
};