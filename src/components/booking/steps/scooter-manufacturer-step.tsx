import { Button } from "@/components/ui/button";

interface ScooterManufacturerStepProps {
  formData: {
    manufacturer: string;
  };
  updateFormData: (updates: Partial<{ manufacturer: string; model: string }>) => void;
}

// Common scooter manufacturers
const manufacturers = [
  { name: "Xiaomi", logo: "🛴" },
  { name: "Segway", logo: "🛴" },
  { name: "Bird", logo: "🐦" },
  { name: "Lime", logo: "🍋" },
  { name: "Razor", logo: "⚡" },
  { name: "Kaabo", logo: "🛴" },
  { name: "Apollo", logo: "🚀" },
  { name: "Dualtron", logo: "⚡" },
  { name: "Zero", logo: "0️⃣" },
  { name: "Ninebot", logo: "9️⃣" },
  { name: "Unagi", logo: "🍱" },
  { name: "Pure", logo: "💧" },
];

export function ScooterManufacturerStep({ formData, updateFormData }: ScooterManufacturerStepProps) {
  const handleManufacturerSelect = (manufacturer: string) => {
    updateFormData({ manufacturer, model: "" }); // Reset model when changing manufacturer
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
            className="h-24 flex flex-col items-center justify-center space-y-2 text-sm"
            onClick={() => handleManufacturerSelect(manufacturer.name)}
          >
            <span className="text-2xl">{manufacturer.logo}</span>
            <span>{manufacturer.name}</span>
          </Button>
        ))}
      </div>
      
      <div className="text-center">
        <Button
          variant={formData.manufacturer === "unknown" ? "default" : "outline"}
          className="w-full max-w-md"
          onClick={() => handleManufacturerSelect("unknown")}
        >
          I don&apos;t know my scooter brand
        </Button>
      </div>
      
      {formData.manufacturer && (
        <div className="text-center text-sm text-muted-foreground">
          Selected: {formData.manufacturer === "unknown" ? "Unknown brand" : formData.manufacturer}
        </div>
      )}
    </div>
  );
}