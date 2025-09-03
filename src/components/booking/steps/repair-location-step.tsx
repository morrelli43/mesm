import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wrench, Zap, MapPin, DollarSign } from "lucide-react";

interface RepairLocationStepProps {
  formData: {
    serviceType: "in-store" | "mobile";
    address?: string;
    preferredDate: string;
    preferredTime: string;
  };
  updateFormData: (updates: Partial<{
    serviceType: "in-store" | "mobile";
    address?: string;
    preferredDate: string;
    preferredTime: string;
  }>) => void;
}

export function RepairLocationStep({ formData, updateFormData }: RepairLocationStepProps) {
  const handleServiceTypeChange = (serviceType: "in-store" | "mobile") => {
    updateFormData({ serviceType, address: serviceType === "mobile" ? formData.address : "" });
  };

  // Get the minimum date (today)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  // Filter available days (Monday=1, Tuesday=2, Thursday=4, Friday=5, Saturday=6)
  const isValidDay = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
    return [1, 2, 4, 5, 6].includes(day); // Mon, Tue, Thu, Fri, Sat
  };

  const handleDateChange = (dateString: string) => {
    if (isValidDay(dateString)) {
      updateFormData({ preferredDate: dateString });
    }
  };

  // Generate time options based on day
  const getTimeOptions = () => {
    if (!formData.preferredDate) return [];
    
    const date = new Date(formData.preferredDate);
    const day = date.getDay();
    const isSaturday = day === 6;
    
    const startHour = isSaturday ? 10 : 9;
    const endHour = isSaturday ? 15 : 16; // 3pm for Saturday, 4pm for others
    
    const options = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === endHour && minute > 0) break; // Don't go past the end hour
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    return options;
  };

  return (
    <div className="space-y-8">
      {/* Service Type Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium">How would you like to receive service?</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${formData.serviceType === "in-store" ? "border-primary shadow-md" : "border-border hover:border-primary/50"}`}>
            <CardContent className="p-4" onClick={() => handleServiceTypeChange("in-store")}>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h5 className="font-medium">Bring it to us</h5>
                <p className="text-sm text-muted-foreground">Drop off your scooter at our workshop</p>
                <p className="text-sm font-medium">Booking fee: $35</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-xs text-primary underline mt-2 hover:text-primary/80 transition-colors">
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
                        <p className="font-medium">Hours:</p>
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
          
          <Card className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${formData.serviceType === "mobile" ? "border-primary shadow-md" : "border-border hover:border-primary/50"}`}>
            <CardContent className="p-4" onClick={() => handleServiceTypeChange("mobile")}>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h5 className="font-medium">Mobile Mechanic</h5>
                <p className="text-sm text-muted-foreground">We come to your location</p>
                <p className="text-sm font-medium">Minimum callout charge: $50</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-xs text-primary underline mt-2 hover:text-primary/80 transition-colors">
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
        <div className="space-y-2 animate-in slide-in-from-top-4 duration-300">
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
            <Label htmlFor="preferred-date">Preferred Date *</Label>
            <Input
              id="preferred-date"
              type="date"
              value={formData.preferredDate}
              onChange={(e) => handleDateChange(e.target.value)}
              min={minDate}
            />
            <p className="text-xs text-muted-foreground">
              Available: Monday, Tuesday, Thursday, Friday, Saturday only
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preferred-time">Preferred Time *</Label>
            <select
              id="preferred-time"
              value={formData.preferredTime}
              onChange={(e) => updateFormData({ preferredTime: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select a time</option>
              {getTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              Hours: 9am-4pm (Mon-Fri), 10am-3pm (Saturday). 30-minute slots only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}