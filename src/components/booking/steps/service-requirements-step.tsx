import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceRequirementsStepProps {
  formData: {
    issueType: string;
    customDescription: string;
    serviceType: "in-store" | "mobile";
    address?: string;
    preferredDate: string;
    preferredTime: string;
  };
  updateFormData: (updates: any) => void;
}

const commonIssues = [
  { id: "flat-tyre", label: "Flat Tyre", icon: "🛞" },
  { id: "general-service", label: "General Service", icon: "🔧" },
  { id: "not-turning-on", label: "Not Turning On", icon: "⚡" },
  { id: "bad-brakes", label: "Brakes are Bad", icon: "🛑" },
  { id: "diagnose", label: "Diagnose My Issue", icon: "🔍" },
];

export function ServiceRequirementsStep({ formData, updateFormData }: ServiceRequirementsStepProps) {
  const handleIssueSelect = (issueId: string) => {
    const issue = commonIssues.find(i => i.id === issueId);
    updateFormData({ issueType: issue?.label || issueId });
  };

  const handleServiceTypeChange = (serviceType: "in-store" | "mobile") => {
    updateFormData({ serviceType, address: serviceType === "mobile" ? formData.address : "" });
  };

  return (
    <div className="space-y-8">
      {/* Issue Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium">What issue are you experiencing?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {commonIssues.map((issue) => (
            <Button
              key={issue.id}
              variant={formData.issueType === issue.label ? "default" : "outline"}
              className="h-16 flex flex-col items-center justify-center space-y-1"
              onClick={() => handleIssueSelect(issue.id)}
            >
              <span className="text-xl">{issue.icon}</span>
              <span className="text-sm">{issue.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Custom Description */}
      <div className="space-y-2">
        <Label htmlFor="custom-description">Describe your issue in detail</Label>
        <Textarea
          id="custom-description"
          placeholder="Please provide more details about the problem you're experiencing..."
          value={formData.customDescription}
          onChange={(e) => updateFormData({ customDescription: e.target.value })}
          rows={4}
        />
      </div>

      {/* Service Type Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium">How would you like to receive service?</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className={`cursor-pointer border-2 ${formData.serviceType === "in-store" ? "border-primary" : "border-border"}`}>
            <CardContent className="p-4" onClick={() => handleServiceTypeChange("in-store")}>
              <div className="text-center space-y-2">
                <div className="text-2xl">🏪</div>
                <h5 className="font-medium">In-Store Service</h5>
                <p className="text-sm text-muted-foreground">Bring your scooter to our shop</p>
                <p className="text-sm font-medium">Booking fee: $35</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer border-2 ${formData.serviceType === "mobile" ? "border-primary" : "border-border"}`}>
            <CardContent className="p-4" onClick={() => handleServiceTypeChange("mobile")}>
              <div className="text-center space-y-2">
                <div className="text-2xl">🚐</div>
                <h5 className="font-medium">Mobile Service</h5>
                <p className="text-sm text-muted-foreground">We come to your location</p>
                <p className="text-sm font-medium">Callout charge varies by location</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Address for Mobile Service */}
      {formData.serviceType === "mobile" && (
        <div className="space-y-2">
          <Label htmlFor="address">Service Address *</Label>
          <Input
            id="address"
            type="text"
            placeholder="Enter your address for mobile service"
            value={formData.address || ""}
            onChange={(e) => updateFormData({ address: e.target.value })}
            required
          />
        </div>
      )}

      {/* Scheduling */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium">When would you like the service?</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="preferred-date">Preferred Date</Label>
            <Input
              id="preferred-date"
              type="date"
              value={formData.preferredDate}
              onChange={(e) => updateFormData({ preferredDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferred-time">Preferred Time</Label>
            <Input
              id="preferred-time"
              type="time"
              value={formData.preferredTime}
              onChange={(e) => updateFormData({ preferredTime: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}