import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InitialInfoStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  updateFormData: (updates: Partial<{ firstName: string; lastName: string; email: string; phone: string }>) => void;
}

export function InitialInfoStep({ formData, updateFormData }: InitialInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            required
          />
        </div>
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