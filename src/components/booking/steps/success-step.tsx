import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Clock, Gift, User, Calendar, MapPin } from "lucide-react";
import { useState } from "react";

interface SuccessStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    serviceType: "in-store" | "mobile";
    address?: string;
    preferredDate: string;
    preferredTime: string;
    issueType: string;
    createAccount: boolean;
  };
  updateFormData: (updates: Partial<{ createAccount: boolean }>) => void;
}

export function SuccessStep({ formData, updateFormData }: SuccessStepProps) {
  const [isChangingTime, setIsChangingTime] = useState(false);
  const [newTime, setNewTime] = useState(formData.preferredTime);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "Not specified";
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-AU', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  };

  const generateBookingId = () => {
    return `MES${Date.now().toString().slice(-6)}`;
  };

  const bookingId = generateBookingId();

  const handleTimeChange = () => {
    // Validate that new time is within 30 minutes of original
    const originalTime = new Date(`2000-01-01T${formData.preferredTime}:00`);
    const newTimeDate = new Date(`2000-01-01T${newTime}:00`);
    const diffMinutes = Math.abs(newTimeDate.getTime() - originalTime.getTime()) / (1000 * 60);
    
    if (diffMinutes <= 30) {
      // Accept the change
      setIsChangingTime(false);
      // In a real app, you would update the booking here
    } else {
      alert("Time can only be adjusted within 30 minutes of the original booking time.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-green-700">Booking Confirmed!</h2>
        <p className="text-lg text-muted-foreground">
          Your service has been successfully booked. We&apos;ll send you a confirmation email shortly.
        </p>
      </div>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Booking ID:</p>
              <p className="text-lg font-mono bg-muted px-2 py-1 rounded">{bookingId}</p>
            </div>
            <div>
              <p className="font-medium">Customer:</p>
              <p>{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <p className="font-medium">Service Type:</p>
              <p>{formData.serviceType === "in-store" ? "In-Store Service" : "Mobile Service"}</p>
            </div>
            <div>
              <p className="font-medium">Issue:</p>
              <p>{formData.issueType}</p>
            </div>
          </div>

          {formData.serviceType === "mobile" && formData.address && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="font-medium">Service Location:</p>
                <p className="text-sm">{formData.address}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">Scheduled Date & Time:</p>
              <p>{formatDate(formData.preferredDate)} at {formatTime(formData.preferredTime)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Adjustment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Adjust Time (within 30 minutes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isChangingTime ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Need to adjust your appointment time? You can change it by up to 30 minutes.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsChangingTime(true)}
                className="w-full md:w-auto"
              >
                Adjust Time
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-time">New Time (within 30 minutes of {formatTime(formData.preferredTime)})</Label>
                <Input
                  id="new-time"
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full md:w-auto"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleTimeChange}>
                  Confirm Change
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsChangingTime(false);
                    setNewTime(formData.preferredTime);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Creation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Create Your Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="create-account"
              checked={formData.createAccount}
              onChange={(e) => updateFormData({ createAccount: e.target.checked })}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="create-account" className="text-base font-medium cursor-pointer">
                Yes, create my account for faster future bookings
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your bookings, track service history, and get exclusive offers
              </p>
            </div>
          </div>
          
          {formData.createAccount && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-3">
                <Gift className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Welcome Bonus!</p>
                  <p className="text-sm text-green-700">
                    As a new member, you&apos;ll receive a <strong>free general service</strong> on your next booking worth $70!
                    We&apos;ll send your account details to {formData.email} after this booking is processed.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What happens next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                1
              </div>
              <div>
                <p className="font-medium">Confirmation Email</p>
                <p className="text-muted-foreground">You&apos;ll receive a detailed confirmation email within 5 minutes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                2
              </div>
              <div>
                <p className="font-medium">Service Preparation</p>
                <p className="text-muted-foreground">Our technician will review your case and prepare for your service</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                3
              </div>
              <div>
                <p className="font-medium">Service Day</p>
                <p className="text-muted-foreground">
                  {formData.serviceType === "mobile" 
                    ? "Our technician will arrive at your location at the scheduled time"
                    : "Bring your scooter to our Heidelberg workshop at the scheduled time"
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button size="lg" className="md:w-auto">
          Download Booking Confirmation (PDF)
        </Button>
        <Button variant="outline" size="lg" className="md:w-auto">
          Add to Calendar
        </Button>
        <Button variant="outline" size="lg" className="md:w-auto">
          Book Another Service
        </Button>
      </div>
    </div>
  );
}