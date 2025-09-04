import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Smartphone, Apple, DollarSign } from "lucide-react";
import { useState } from "react";

interface PaymentStepProps {
  formData: {
    serviceType: "in-store" | "mobile";
    address?: string;
    issueType: string;
    firstName: string;
    lastName: string;
    preferredDate: string;
    preferredTime: string;
  };
  updateFormData: (updates: Partial<{ serviceType: "in-store" | "mobile"; address?: string }>) => void;
}

export function PaymentStep({ formData }: PaymentStepProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

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

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Service Type:</span>
            <span>{formData.serviceType === "in-store" ? "In-Store Service" : "Mobile Service"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Issue Type:</span>
            <span>{formData.issueType || "Not specified"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Customer:</span>
            <span>{formData.firstName} {formData.lastName}</span>
          </div>
          {formData.serviceType === "mobile" && formData.address && (
            <div className="flex justify-between">
              <span className="font-medium">Service Location:</span>
              <span className="text-sm text-right">{formData.address}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="font-medium">Date & Time:</span>
            <div className="text-right text-sm">
              <div>{formatDate(formData.preferredDate)}</div>
              <div>{formatTime(formData.preferredTime)}</div>
            </div>
          </div>
          <hr/>
          <div className="flex justify-between font-bold text-lg">
            <span>Booking Fee:</span>
            <span>${fee}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            This includes the {formData.serviceType === "in-store" ? "booking fee" : "callout charge"}. 
            Additional service costs will be quoted on-site.
          </p>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Card
              </TabsTrigger>
              <TabsTrigger value="google-pay" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Google Pay
              </TabsTrigger>
              <TabsTrigger value="apple-pay" className="flex items-center gap-2">
                <Apple className="h-4 w-4" />
                Apple Pay
              </TabsTrigger>
              <TabsTrigger value="afterpay" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                AfterPay
              </TabsTrigger>
              <TabsTrigger value="zippay" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                ZipPay
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="space-y-4 mt-6">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="cardholder-name">Cardholder Name</Label>
                <Input
                  id="cardholder-name"
                  type="text"
                  placeholder="John Doe"
                />
              </div>
            </TabsContent>

            <TabsContent value="google-pay" className="space-y-4 mt-6">
              <div className="text-center py-8">
                <Smartphone className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Pay with Google Pay</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use your saved payment methods from Google Pay
                </p>
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  Pay ${fee} with Google Pay
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="apple-pay" className="space-y-4 mt-6">
              <div className="text-center py-8">
                <Apple className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Pay with Apple Pay</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use Touch ID or Face ID to pay securely
                </p>
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  Pay ${fee} with Apple Pay
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="afterpay" className="space-y-4 mt-6">
              <div className="text-center py-8">
                <DollarSign className="h-16 w-16 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-medium mb-2">Pay with AfterPay</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pay in 4 interest-free installments of ${(fee / 4).toFixed(2)}
                </p>
                <div className="text-xs text-muted-foreground mb-4">
                  Today: ${(fee / 4).toFixed(2)} • In 2 weeks: ${(fee / 4).toFixed(2)} • In 4 weeks: ${(fee / 4).toFixed(2)} • In 6 weeks: ${(fee / 4).toFixed(2)}
                </div>
                <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                  Pay ${fee} with AfterPay
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="zippay" className="space-y-4 mt-6">
              <div className="text-center py-8">
                <DollarSign className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                <h3 className="text-lg font-medium mb-2">Pay with ZipPay</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Buy now, pay later with flexible payment options
                </p>
                <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                  Pay ${fee} with ZipPay
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-xs text-muted-foreground text-center mt-4">
            Your payment information is secure and encrypted
          </div>
        </CardContent>
      </Card>
    </div>
  );
}