"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Edit2, 
  MessageCircle, 
  X,
  Wrench,
  Car,
  FileText
} from "lucide-react";
import { UserAppointment } from "@/types/api";
import { BookingForm } from "@/components/booking/booking-form";

interface AppointmentDetailModalProps {
  appointment: UserAppointment;
}

function AppointmentDetailModal({ appointment }: AppointmentDetailModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Appointment Details</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Date & Time</h4>
            <p className="text-sm text-gray-600">{formatDate(appointment.scheduledDate)}</p>
            <p className="text-sm text-gray-600">{formatTime(appointment.scheduledTime)}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Service Type</h4>
            <Badge variant={appointment.serviceType === 'workshop' ? 'default' : 'secondary'}>
              {appointment.serviceType === 'workshop' ? (
                <>
                  <Wrench className="h-3 w-3 mr-1" />
                  Workshop Repair
                </>
              ) : (
                <>
                  <Car className="h-3 w-3 mr-1" />
                  Mobile Repair
                </>
              )}
            </Badge>
          </div>
        </div>

        {/* Scooter Info */}
        <div>
          <h4 className="font-semibold mb-2">Scooter</h4>
          <p className="text-sm text-gray-600">
            {appointment.scooterInfo.make} {appointment.scooterInfo.model}
          </p>
        </div>

        {/* Issue Description */}
        <div>
          <h4 className="font-semibold mb-2">Issue Description</h4>
          <p className="text-sm text-gray-600">{appointment.issueDescription}</p>
        </div>

        {/* Location */}
        <div>
          <h4 className="font-semibold mb-2">Location</h4>
          <p className="text-sm text-gray-600">{appointment.location}</p>
        </div>

        {/* Technician (for completed appointments) */}
        {appointment.technicianName && (
          <div>
            <h4 className="font-semibold mb-2">Technician</h4>
            <p className="text-sm text-gray-600">{appointment.technicianName}</p>
          </div>
        )}

        {/* Conversation History (for completed appointments) */}
        {appointment.conversationHistory && appointment.conversationHistory.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Service Notes</h4>
            <div className="space-y-2">
              {appointment.conversationHistory.map((note, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm">{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invoice (for completed appointments) */}
        {appointment.invoiceItems && appointment.invoiceTotal && (
          <div>
            <h4 className="font-semibold mb-2">Invoice</h4>
            <div className="border rounded-lg p-4">
              <div className="space-y-2">
                {appointment.invoiceItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.description}</span>
                    <span>${item.cost.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${appointment.invoiceTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Re-book button for completed appointments */}
        {appointment.status === 'completed' && (
          <div className="pt-4 border-t">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Re-Book Service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Book Another Service</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <BookingForm />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </DialogContent>
  );
}

export default function AppointmentsPage() {
  const [upcomingAppointments, setUpcomingAppointments] = useState<UserAppointment[]>([]);
  const [previousAppointments, setPreviousAppointments] = useState<UserAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const [upcomingResponse, previousResponse] = await Promise.all([
        fetch('/api/user/appointments?status=upcoming'),
        fetch('/api/user/appointments?status=completed')
      ]);
      
      const upcomingData = await upcomingResponse.json();
      const previousData = await previousResponse.json();
      
      setUpcomingAppointments(upcomingData);
      setPreviousAppointments(previousData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const canEdit = (appointment: UserAppointment) => {
    return appointment.canEdit;
  };

  if (loading) {
    return (
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Book New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <BookingForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="previous">
            Previous ({previousAppointments.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-gray-500">No upcoming appointments</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-4">
                          <Badge variant={appointment.serviceType === 'workshop' ? 'default' : 'secondary'}>
                            {appointment.serviceType === 'workshop' ? (
                              <>
                                <Wrench className="h-3 w-3 mr-1" />
                                Workshop Repair
                              </>
                            ) : (
                              <>
                                <Car className="h-3 w-3 mr-1" />
                                Mobile Repair
                              </>
                            )}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(appointment.scheduledDate)}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatTime(appointment.scheduledTime)}
                          </div>
                        </div>
                        
                        <div>
                          <p className="font-medium">
                            {appointment.scooterInfo.make} {appointment.scooterInfo.model}
                          </p>
                          <p className="text-sm text-gray-600">{appointment.issueDescription}</p>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {appointment.location}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {canEdit(appointment) && (
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Us
                        </Button>
                        <Button variant="destructive" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="previous" className="space-y-4">
          {previousAppointments.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-gray-500">No previous appointments</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {previousAppointments.map((appointment) => (
                <Dialog key={appointment.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-8 w-8 text-gray-400" />
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {appointment.scooterInfo.make} {appointment.scooterInfo.model}
                              </p>
                              <p className="text-xs text-gray-600">
                                {formatDate(appointment.scheduledDate)} at {formatTime(appointment.scheduledTime)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-600">
                            <p className="truncate">{appointment.issueDescription}</p>
                          </div>
                          
                          {appointment.technicianName && (
                            <div className="flex items-center text-xs text-gray-600">
                              <User className="h-3 w-3 mr-1" />
                              {appointment.technicianName}
                            </div>
                          )}
                          
                          {appointment.invoiceTotal && (
                            <div className="text-xs font-medium">
                              Total: ${appointment.invoiceTotal.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <AppointmentDetailModal
                    appointment={appointment}
                  />
                </Dialog>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}