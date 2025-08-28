import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentStepProps {
  formData: {
    serviceType: "in-store" | "mobile";
    address?: string;
  };
  updateFormData: (updates: any) => void;
}

export function PaymentStep({ formData }: PaymentStepProps) {
  const getBookingFee = () => {
    if (formData.serviceType === "in-store") {
      return 35;
    } else {
      // For mobile service, calculate based on location (simplified)
      // In a real app, this would be calculated based on actual distance
      return 65; // Base callout charge
    }
  };

  const fee = getBookingFee();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Service Type:</span>
            <span className="font-medium">
              {formData.serviceType === "in-store" ? "In-Store Service" : "Mobile Service"}
            </span>
          </div>
          
          {formData.serviceType === "mobile" && formData.address && (
            <div className="flex justify-between items-center">
              <span>Service Location:</span>
              <span className="font-medium text-right max-w-[200px] truncate">
                {formData.address}
              </span>
            </div>
          )}
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Booking Fee:</span>
              <span>${fee}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {formData.serviceType === "in-store" 
                ? "This booking fee secures your appointment and will be deducted from your final service cost."
                : "This includes the callout charge. Additional service costs will be quoted on-site."
              }
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="text"
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardholder-name">Cardholder Name</Label>
            <Input
              id="cardholder-name"
              type="text"
              placeholder="John Doe"
            />
          </div>
          
          <div className="pt-4">
            <Button className="w-full" size="lg">
              Pay ${fee} - Secure Booking
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            🔒 Your payment information is secure and encrypted
          </div>
        </CardContent>
      </Card>
    </div>
  );
}