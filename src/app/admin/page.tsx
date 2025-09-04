"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Settings, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const handleBookAppointment = () => {
    window.location.href = "/book-a-service?step=3";
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Welcome to your Admin Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage your profile, eScooters, appointments, and more from the sidebar navigation.
            </p>
            <div className="space-y-2">
              <Link 
                href="/admin/details" 
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <User className="h-4 w-4 mr-2" />
                Update your personal details
              </Link>
              <Link 
                href="/admin/scooters" 
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage your eScooters
              </Link>
              <Link 
                href="/admin/appointments" 
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <Calendar className="h-4 w-4 mr-2" />
                View your appointments
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Common tasks you might want to perform.
            </p>
            <div className="space-y-2">
              <button 
                onClick={handleBookAppointment}
                className="flex items-center text-sm text-green-600 hover:text-green-800 w-full text-left"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book a new appointment
              </button>
              <Link 
                href="/admin/contact" 
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact support
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
