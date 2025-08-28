import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ConfirmationStepProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    manufacturer: string;
    model: string;
    issueType: string;
    customDescription: string;
    serviceType: "in-store" | "mobile";
    address?: string;
    preferredDate: string;
    preferredTime: string;
    createAccount: boolean;
  };
  updateFormData: (updates: any) => void;
  onEdit: (step: number) => void;
}

export function ConfirmationStep({ formData, updateFormData, onEdit }: ConfirmationStepProps) {
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
    const hour12 = parseInt(hours) > 12 ? parseInt(hours) - 12 : parseInt(hours);
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleCompleteBooking = () => {
    // In a real app, this would submit the booking
    alert("Booking completed! Thank you for choosing Melbourne eScooter Mechanics.");
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-green-600">🎉 Almost Done!</h3>
        <p className="text-muted-foreground">
          Please review your booking details below. You can make changes by clicking the edit buttons.
        </p>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contact Information</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onEdit(1)}>
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><strong>Name:</strong> {formData.name}</div>
          <div><strong>Email:</strong> {formData.email}</div>
          <div><strong>Phone:</strong> {formData.phone}</div>
        </CardContent>
      </Card>

      {/* Scooter Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Scooter Information</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onEdit(2)}>
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><strong>Manufacturer:</strong> {formData.manufacturer === "unknown" ? "Unknown" : formData.manufacturer}</div>
          {formData.manufacturer !== "unknown" && (
            <div><strong>Model:</strong> {formData.model || "Not specified"}</div>
          )}
        </CardContent>
      </Card>

      {/* Service Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Service Details</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onEdit(3)}>
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><strong>Issue Type:</strong> {formData.issueType || "Not specified"}</div>
          {formData.customDescription && (
            <div><strong>Description:</strong> {formData.customDescription}</div>
          )}
          <div><strong>Service Type:</strong> {formData.serviceType === "in-store" ? "In-Store Service" : "Mobile Service"}</div>
          {formData.serviceType === "mobile" && formData.address && (
            <div><strong>Service Address:</strong> {formData.address}</div>
          )}
          <div><strong>Preferred Date:</strong> {formatDate(formData.preferredDate)}</div>
          <div><strong>Preferred Time:</strong> {formatTime(formData.preferredTime)}</div>
        </CardContent>
      </Card>

      {/* Account Creation */}
      <Card>
        <CardHeader>
          <CardTitle>Create Account (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="create-account"
              checked={formData.createAccount}
              onChange={(e) => updateFormData({ createAccount: e.target.checked })}
              className="rounded border-gray-300"
            />
            <Label htmlFor="create-account" className="text-sm">
              Create an account to track your bookings and get a free general service on your next visit
            </Label>
          </div>
          
          {formData.createAccount && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                ✅ Great! We'll create an account for you using your email address. You'll receive login details after your booking is confirmed.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Complete Booking */}
      <div className="text-center">
        <Button size="lg" className="w-full md:w-auto px-12" onClick={handleCompleteBooking}>
          Complete Booking
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          By completing this booking, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
}