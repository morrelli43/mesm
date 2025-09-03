import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ScooterModelStepProps {
  formData: {
    manufacturer: string;
    model: string;
    customManufacturer?: string;
    customModel?: string;
  };
  updateFormData: (updates: Partial<{ model: string }>) => void;
}

// Common models for different manufacturers
const modelsByManufacturer: Record<string, string[]> = {
  "Xiaomi": ["Mi Electric Scooter", "Mi Pro 2", "Mi 3", "Mi 1S", "Mi Essential"],
  "Segway": ["Ninebot MAX", "Ninebot ES2", "Ninebot ES4", "Ninebot F30", "Ninebot G30"],
  "Bird": ["Bird One", "Bird Air", "Bird Two"],
  "Lime": ["Lime-S Gen 3", "Lime-S Gen 4"],
  "Razor": ["E Prime III", "E300", "E200", "E100"],
  "Kaabo": ["Mantis", "Wolf Warrior", "Skywalker"],
  "Apollo": ["City", "Explore", "Phantom", "Ghost"],
  "Dualtron": ["Thunder", "Ultra", "Spider", "Mini"],
  "Zero": ["8", "9", "10X", "11X"],
  "Ninebot": ["MAX G30", "ES2", "ES4", "F20"],
  "Unagi": ["Model One", "Model Eleven"],
  "Pure": ["Air", "Advance"],
};

export function ScooterModelStep({ formData, updateFormData }: ScooterModelStepProps) {
  // Skip this step if manufacturer is unknown or custom
  if (formData.manufacturer === "unknown") {
    return (
      <div className="text-center space-y-4">
        <p className="text-lg">Since you don&apos;t know your scooter brand, we&apos;ll skip the model selection.</p>
        <p className="text-muted-foreground">Our technicians will help identify your scooter during the service.</p>
      </div>
    );
  }

  if (formData.manufacturer === "custom") {
    return (
      <div className="text-center space-y-4">
        <p className="text-lg">You&apos;ve provided custom scooter details.</p>
        <p className="text-muted-foreground">
          Manufacturer: {formData.customManufacturer || "Not specified"}<br/>
          Model: {formData.customModel || "Not specified"}
        </p>
        <p className="text-muted-foreground">Our technicians will confirm these details during the service.</p>
      </div>
    );
  }

  const availableModels = modelsByManufacturer[formData.manufacturer] || [];

  const handleModelSelect = (model: string) => {
    updateFormData({ model });
  };

  const handleCustomModel = (model: string) => {
    updateFormData({ model });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg mb-2">Select your {formData.manufacturer} model</p>
        <p className="text-muted-foreground">Choose from common models or enter your own</p>
      </div>
      
      {availableModels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableModels.map((model) => (
            <Button
              key={model}
              variant={formData.model === model ? "default" : "outline"}
              className="h-12 text-left justify-start"
              onClick={() => handleModelSelect(model)}
            >
              {model}
            </Button>
          ))}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="custom-model">Or enter your model manually</Label>
        <Input
          id="custom-model"
          type="text"
          placeholder="Enter your scooter model"
          value={formData.model}
          onChange={(e) => handleCustomModel(e.target.value)}
        />
      </div>
      
      {formData.model && (
        <div className="text-center text-sm text-muted-foreground">
          Selected: {formData.manufacturer} {formData.model}
        </div>
      )}
    </div>
  );
}