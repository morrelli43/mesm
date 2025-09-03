import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ScooterManufacturerStepProps {
  formData: {
    manufacturer: string;
    customManufacturer?: string;
    customModel?: string;
  };
  updateFormData: (updates: Partial<{ manufacturer: string; model: string; customManufacturer?: string; customModel?: string }>) => void;
}

// Common scooter manufacturers - icons removed as per requirements
const manufacturers = [
  { name: "Xiaomi" },
  { name: "Segway" },
  { name: "Bird" },
  { name: "Lime" },
  { name: "Razor" },
  { name: "Kaabo" },
  { name: "Apollo" },
  { name: "Dualtron" },
  { name: "Zero" },
  { name: "Ninebot" },
  { name: "Unagi" },
  { name: "Pure" },
];

export function ScooterManufacturerStep({ formData, updateFormData }: ScooterManufacturerStepProps) {
  const handleManufacturerSelect = (manufacturer: string) => {
    updateFormData({ manufacturer, model: "", customManufacturer: "", customModel: "" }); // Reset model when changing manufacturer
  };

  const handleCustomInput = () => {
    updateFormData({ manufacturer: "custom", model: "", customManufacturer: "", customModel: "" });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg mb-6">Select your scooter manufacturer</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {manufacturers.map((manufacturer) => (
          <Button
            key={manufacturer.name}
            variant={formData.manufacturer === manufacturer.name ? "default" : "outline"}
            className="h-16 flex items-center justify-center text-sm font-medium"
            onClick={() => handleManufacturerSelect(manufacturer.name)}
          >
            {manufacturer.name}
          </Button>
        ))}
      </div>
      
      <div className="space-y-4">
        <Button
          variant={formData.manufacturer === "unknown" ? "default" : "outline"}
          className="w-full"
          onClick={() => handleManufacturerSelect("unknown")}
        >
          I don&apos;t know my scooter brand
        </Button>
        
        <Button
          variant={formData.manufacturer === "custom" ? "default" : "outline"}
          className="w-full"
          onClick={handleCustomInput}
        >
          My Scooter isn&apos;t listed
        </Button>
      </div>

      {formData.manufacturer === "custom" && (
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
          <div className="space-y-2">
            <Label htmlFor="custom-manufacturer">Manufacturer/Brand</Label>
            <Input
              id="custom-manufacturer"
              type="text"
              placeholder="Enter manufacturer name"
              value={formData.customManufacturer || ""}
              onChange={(e) => updateFormData({ customManufacturer: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom-model">Model</Label>
            <Input
              id="custom-model"
              type="text"
              placeholder="Enter model name"
              value={formData.customModel || ""}
              onChange={(e) => updateFormData({ customModel: e.target.value })}
            />
          </div>
        </div>
      )}
      
      {formData.manufacturer && (
        <div className="text-center text-sm text-muted-foreground">
          Selected: {
            formData.manufacturer === "unknown" ? "Unknown brand" : 
            formData.manufacturer === "custom" ? "Custom entry" :
            formData.manufacturer
          }
        </div>
      )}
    </div>
  );
}