import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wrench, Zap, Disc, HelpCircle, Circle } from "lucide-react";
import { useState } from "react";

interface ServiceRequirementsStepProps {
  formData: {
    issueType: string;
    customDescription: string;
    serviceType: "in-store" | "mobile";
    address?: string;
    preferredDate: string;
    preferredTime: string;
  };
  updateFormData: (updates: Partial<{
    issueType: string;
    customDescription: string;
    serviceType: "in-store" | "mobile";
    address?: string;
    preferredDate: string;
    preferredTime: string;
  }>) => void;
}

const commonIssues = [
  { id: "flat-tyre", label: "Flat Tyre", icon: Circle },
  { id: "general-service", label: "General Service", icon: Wrench },
  { id: "brake-tune-up", label: "Brake Tune-up", icon: Disc },
  { id: "not-turning-on", label: "Not Turning On", icon: Zap },
  { id: "something-else", label: "It's Something Else", icon: HelpCircle },
];

const tyreOptions = [
  { id: "on-road-standard", label: "On-road Standard", premium: false },
  { id: "off-road-standard", label: "Off-road Standard", premium: false },
  { id: "on-road-run-flat", label: "On-road Run-Flat", premium: true },
  { id: "off-road-run-flat", label: "Off-road Run-Flat", premium: true },
];

export function ServiceRequirementsStep({ formData, updateFormData }: ServiceRequirementsStepProps) {
  const [selectedTyreOption, setSelectedTyreOption] = useState<string>("");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customMake, setCustomMake] = useState("");
  const [customModel, setCustomModel] = useState("");

  const handleIssueSelect = (issueId: string) => {
    const issue = commonIssues.find(i => i.id === issueId);
    updateFormData({ issueType: issue?.label || issueId });
    
    // Show custom form for "something else"
    if (issueId === "something-else") {
      setShowCustomForm(true);
    } else {
      setShowCustomForm(false);
      setCustomMake("");
      setCustomModel("");
    }
    
    // Reset tyre option when changing issue
    if (issueId !== "flat-tyre") {
      setSelectedTyreOption("");
    }
  };

  const handleServiceTypeChange = (serviceType: "in-store" | "mobile") => {
    updateFormData({ serviceType, address: serviceType === "mobile" ? formData.address : "" });
  };

  return (
    <div className="space-y-8">
      {/* Issue Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium">How can we help?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {commonIssues.map((issue) => {
            const IconComponent = issue.icon;
            return (
              <Button
                key={issue.id}
                variant={formData.issueType === issue.label ? "default" : "outline"}
                className="h-20 flex flex-col items-center justify-center space-y-2 text-sm"
                onClick={() => handleIssueSelect(issue.id)}
              >
                <IconComponent className="h-6 w-6" />
                <span>{issue.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Flat Tyre Options */}
      {formData.issueType === "Flat Tyre" && (
        <div className="space-y-4">
          <h5 className="text-md font-medium">Select tyre type:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tyreOptions.map((option) => (
              <Button
                key={option.id}
                variant={selectedTyreOption === option.id ? "default" : "outline"}
                className={`h-16 flex items-center justify-between p-4 ${
                  option.premium ? "border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100" : ""
                }`}
                onClick={() => setSelectedTyreOption(option.id)}
              >
                <span className="font-medium">{option.label}</span>
                {option.premium && (
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full border border-amber-300">
                    Premium
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Issue Form */}
      {showCustomForm && (
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
          <h5 className="font-medium">Tell us more about your issue</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="custom-make">Make (Optional)</Label>
              <Input
                id="custom-make"
                type="text"
                placeholder="Enter make/brand"
                value={customMake}
                onChange={(e) => setCustomMake(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-model">Model (Optional)</Label>
              <Input
                id="custom-model"
                type="text"
                placeholder="Enter model"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

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
          <Card className={`cursor-pointer border-2 transition-colors ${formData.serviceType === "in-store" ? "border-primary" : "border-border"}`}>
            <CardContent className="p-4" onClick={() => handleServiceTypeChange("in-store")}>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h5 className="font-medium">In-Store Service</h5>
                <p className="text-sm text-muted-foreground">Bring your scooter to our shop</p>
                <p className="text-sm font-medium">Booking fee: $35</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Our workshop is in Heidelberg, click here for more info
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer border-2 transition-colors ${formData.serviceType === "mobile" ? "border-primary" : "border-border"}`}>
            <CardContent className="p-4" onClick={() => handleServiceTypeChange("mobile")}>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h5 className="font-medium">Mobile Service</h5>
                <p className="text-sm text-muted-foreground">We come to your location</p>
                <p className="text-sm font-medium">Minimum callout charge: $50</p>
                <p className="text-xs text-muted-foreground mt-2">
                  View suburb pricing for accurate quote
                </p>
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
        <div className="text-sm text-muted-foreground">
          Available: Monday, Tuesday, Thursday, Friday, Saturday<br/>
          Hours: 9am-4pm (Mon-Fri), 10am-3pm (Saturday)
        </div>
      </div>
    </div>
  );
}