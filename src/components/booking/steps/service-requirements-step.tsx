import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wrench, Zap, Disc, HelpCircle, Circle, MapPin, DollarSign } from "lucide-react";
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
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-xs text-primary underline mt-2 hover:text-primary/80">
                      Our workshop is in Heidelberg, click here for more info
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Workshop Information</DialogTitle>
                      <DialogDescription>
                        Visit our workshop in Heidelberg for in-store service
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-primary mt-1" />
                        <div>
                          <p className="font-medium">Melbourne eScooter Mechanic</p>
                          <p className="text-sm text-muted-foreground">
                            Shop 3, 101 Burgundy Street<br/>
                            Heidelberg, 3084, Victoria
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">Opening Hours:</p>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Mon, Tues, Thurs, Fri: 9am-5pm</p>
                          <p>Saturday: 10am-4pm</p>
                          <p>Wednesday & Sunday: Closed</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <DollarSign className="h-4 w-4 text-amber-600" />
                        <p className="text-sm text-amber-800">
                          <strong>Booking fee of $35 is required</strong>
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-xs text-primary underline mt-2 hover:text-primary/80">
                      View suburb pricing for accurate quote
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Greater Melbourne Suburbs - Mobile Service Pricing</DialogTitle>
                      <DialogDescription>
                        Pricing varies by distance from our Heidelberg workshop
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 text-green-700">Zone 1 - $50</h4>
                          <div className="text-sm space-y-1 text-muted-foreground">
                            <p>Heidelberg, Ivanhoe, Fairfield</p>
                            <p>Northcote, Thornbury, Preston</p>
                            <p>Brunswick, Coburg, Pascoe Vale</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-blue-700">Zone 2 - $70</h4>
                          <div className="text-sm space-y-1 text-muted-foreground">
                            <p>Carlton, Fitzroy, Collingwood</p>
                            <p>Richmond, South Yarra, Prahran</p>
                            <p>Essendon, Moonee Ponds</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-orange-700">Zone 3 - $90</h4>
                          <div className="text-sm space-y-1 text-muted-foreground">
                            <p>Melbourne CBD, Docklands</p>
                            <p>St Kilda, Brighton, Caulfield</p>
                            <p>Footscray, Williamstown</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-red-700">Zone 4 - $120</h4>
                          <div className="text-sm space-y-1 text-muted-foreground">
                            <p>Frankston, Dandenong</p>
                            <p>Box Hill, Ringwood</p>
                            <p>Sunbury, Melton</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> Final pricing may vary based on exact location and accessibility. 
                          Our technician will confirm the final price before commencing work.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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