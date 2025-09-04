"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { InitialInfoStep } from "./steps/initial-info-step";
import { ScooterManufacturerStep } from "./steps/scooter-manufacturer-step";
import { ScooterModelStep } from "./steps/scooter-model-step";
import { ServiceIssuesStep } from "./steps/service-issues-step";
import { RepairLocationStep } from "./steps/repair-location-step";
import { PaymentStep } from "./steps/payment-step";
import { ConfirmationStep } from "./steps/confirmation-step";
import { SuccessStep } from "./steps/success-step";

// Form data interface
interface BookingFormData {
  // Step 1: Initial Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Step 2: Scooter Information
  manufacturer: string;
  model: string;
  customManufacturer?: string;
  customModel?: string;
  
  // Step 4: Service Issues
  issueType: string;
  customDescription: string;
  selectedTyreOption?: string;
  selectedBrakeOption?: string;
  
  // Step 5: Repair Location
  serviceType: "in-store" | "mobile";
  address?: string;
  preferredDate: string;
  preferredTime: string;
  
  // Step 8: Account Creation
  createAccount: boolean;
}

const initialFormData: BookingFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  manufacturer: "",
  model: "",
  customManufacturer: "",
  customModel: "",
  issueType: "",
  customDescription: "",
  selectedTyreOption: "",
  selectedBrakeOption: "",
  serviceType: "in-store",
  address: "",
  preferredDate: "",
  preferredTime: "",
  createAccount: false,
};

interface BookingFormProps {
  initialStep?: number;
}

export function BookingForm({ initialStep = 1 }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  
  const totalSteps = 8; // Updated: 1. Info, 2. Manufacturer, 3. Model, 4. Issues, 5. Location, 6. Payment, 7. Confirmation, 8. Success
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (updates: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const goToNextStep = () => {
    // Skip model step if manufacturer is unknown
    if (currentStep === 2 && formData.manufacturer === "unknown") {
      setCurrentStep(4); // Jump to service issues
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    // Handle reverse navigation for skipped steps
    if (currentStep === 4 && formData.manufacturer === "unknown") {
      setCurrentStep(2); // Jump back to manufacturer selection
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Your Information";
      case 2: return "Your Scooter - Brand";
      case 3: return "Your Scooter - Model";
      case 4: return "How Can We Help?";
      case 5: return "Repair Location";
      case 6: return "Payment";
      case 7: return "Confirmation";
      case 8: return "Success";
      default: return "";
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.phone;
      case 2:
        return formData.manufacturer && (
          formData.manufacturer === "unknown" || 
          formData.manufacturer === "custom" && formData.customManufacturer ||
          formData.manufacturer !== "custom"
        );
      case 3:
        return formData.manufacturer === "unknown" || formData.model || 
               (formData.manufacturer === "custom" && formData.customModel);
      case 4:
        return formData.issueType && (
          formData.issueType !== "It's Something Else" || formData.customDescription
        );
      case 5:
        return formData.preferredDate && formData.preferredTime &&
               (formData.serviceType === "in-store" || formData.address);
      case 6:
        return true; // Payment step
      case 7:
        return true; // Confirmation step
      case 8:
        return true; // Success step
      default:
        return false;
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Book a Service - {getStepTitle()}</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        <CardContent className="transition-all duration-300">
          {currentStep === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-semibold mb-4">Please provide your contact information</h3>
              <InitialInfoStep formData={formData} updateFormData={updateFormData} />
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <ScooterManufacturerStep formData={formData} updateFormData={updateFormData} />
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <ScooterModelStep formData={formData} updateFormData={updateFormData} />
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <ServiceIssuesStep formData={formData} updateFormData={updateFormData} />
            </div>
          )}
          
          {currentStep === 5 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <RepairLocationStep formData={formData} updateFormData={updateFormData} />
            </div>
          )}
          
          {currentStep === 6 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
              <PaymentStep formData={formData} updateFormData={updateFormData} />
            </div>
          )}
          
          {currentStep === 7 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <ConfirmationStep 
                formData={formData} 
                updateFormData={updateFormData} 
                onEdit={goToStep}
                onComplete={() => setCurrentStep(8)}
              />
            </div>
          )}
          
          {currentStep === 8 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <SuccessStep formData={formData} updateFormData={updateFormData} />
            </div>
          )}
          
          {currentStep < 8 && (
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
                className="transition-all duration-200 hover:scale-105"
              >
                Previous
              </Button>
              <Button 
                onClick={goToNextStep}
                disabled={!canProceed()}
                className="transition-all duration-200 hover:scale-105"
              >
                {currentStep === 6 ? "Review Booking" : currentStep === 7 ? "Complete Booking" : "Next"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}