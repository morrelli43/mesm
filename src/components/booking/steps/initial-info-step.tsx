import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InitialInfoStepProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  updateFormData: (updates: Partial<{ name: string; email: string; phone: string }>) => void;
}

export function InitialInfoStep({ formData, updateFormData }: InitialInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          required
        />
      </div>
      
      <div className="text-sm text-muted-foreground">
        * Required fields
      </div>
    </div>
  );
}