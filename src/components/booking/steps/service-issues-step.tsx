import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wrench, Zap, Disc, HelpCircle, Circle } from "lucide-react";
import { useState } from "react";

interface ServiceIssuesStepProps {
  formData: {
    issueType: string;
    customDescription: string;
    selectedTyreOption?: string;
    selectedBrakeOption?: string;
  };
  updateFormData: (updates: Partial<{
    issueType: string;
    customDescription: string;
    selectedTyreOption?: string;
    selectedBrakeOption?: string;
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

const brakeOptions = [
  { id: "brake-bleed-bottom", label: "Brake Bleed Bottom up (Hydraulics)" },
  { id: "full-bleed", label: "Full Bleed (Hydraulics)" },
  { id: "basic-adjustment", label: "Basic Adjustment" },
  { id: "replace-pads", label: "Replace Pads" },
];

export function ServiceIssuesStep({ formData, updateFormData }: ServiceIssuesStepProps) {
  const [showCustomForm, setShowCustomForm] = useState(formData.issueType === "It's Something Else");

  const handleIssueSelect = (issueId: string) => {
    const issue = commonIssues.find(i => i.id === issueId);
    updateFormData({ 
      issueType: issue?.label || issueId,
      selectedTyreOption: issueId !== "flat-tyre" ? undefined : formData.selectedTyreOption,
      selectedBrakeOption: issueId !== "brake-tune-up" ? undefined : formData.selectedBrakeOption
    });
    
    // Show custom form for "something else"
    if (issueId === "something-else") {
      setShowCustomForm(true);
    } else {
      setShowCustomForm(false);
    }
  };

  const handleTyreOptionSelect = (optionId: string) => {
    updateFormData({ selectedTyreOption: optionId });
  };

  const handleBrakeOptionSelect = (optionId: string) => {
    updateFormData({ selectedBrakeOption: optionId });
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
                className="h-20 flex flex-col items-center justify-center space-y-2 text-sm transition-all duration-200 hover:scale-105"
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
        <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
          <h5 className="text-md font-medium">Select tyre type:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tyreOptions.map((option) => (
              <Button
                key={option.id}
                variant={formData.selectedTyreOption === option.id ? "default" : "outline"}
                className={`h-16 flex items-center justify-between p-4 transition-all duration-200 ${
                  option.premium 
                    ? "border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 shadow-md hover:shadow-lg" 
                    : "hover:scale-102"
                }`}
                onClick={() => handleTyreOptionSelect(option.id)}
              >
                <span className="font-medium">{option.label}</span>
                {option.premium && (
                  <span className="text-xs bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300 font-semibold shadow-sm">
                    Premium
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Brake Tune-up Options */}
      {formData.issueType === "Brake Tune-up" && (
        <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
          <h5 className="text-md font-medium">Select brake service type:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {brakeOptions.map((option) => (
              <Button
                key={option.id}
                variant={formData.selectedBrakeOption === option.id ? "default" : "outline"}
                className="h-16 flex items-center justify-center p-4 text-sm transition-all duration-200 hover:scale-102"
                onClick={() => handleBrakeOptionSelect(option.id)}
              >
                <span className="font-medium text-center">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Issue Form */}
      {showCustomForm && (
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50 animate-in slide-in-from-top-4 duration-300">
          <h5 className="font-medium">Tell us more about your issue</h5>
          <div className="space-y-2">
            <Label htmlFor="custom-description">Describe your issue in detail *</Label>
            <Textarea
              id="custom-description"
              placeholder="Please provide more details about the problem you're experiencing..."
              value={formData.customDescription}
              onChange={(e) => updateFormData({ customDescription: e.target.value })}
              rows={4}
            />
          </div>
        </div>
      )}

      {/* Custom Description for selected issues */}
      {formData.issueType && formData.issueType !== "It's Something Else" && (
        <div className="space-y-2">
          <Label htmlFor="additional-details">Additional details (optional)</Label>
          <Textarea
            id="additional-details"
            placeholder="Any additional information about your issue..."
            value={formData.customDescription}
            onChange={(e) => updateFormData({ customDescription: e.target.value })}
            rows={3}
          />
        </div>
      )}
    </div>
  );
}