"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Edit2, Calendar, AlertTriangle, CheckCircle } from "lucide-react";
import { UserScooter } from "@/types/api";
import { BookingForm } from "@/components/booking/booking-form";

// Common scooter manufacturers from booking form
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

interface EditScooterModalProps {
  scooter: UserScooter;
  onSave: (scooter: UserScooter) => void;
  onClose: () => void;
}

function EditScooterModal({ scooter, onSave, onClose }: EditScooterModalProps) {
  const [formData, setFormData] = useState({
    make: scooter.make === 'unknown' ? 'unknown' : scooter.make,
    model: scooter.model,
    serialNumber: scooter.serialNumber || '',
    customMake: scooter.customMake || '',
    customModel: scooter.customModel || ''
  });

  const handleSave = () => {
    const updatedScooter: UserScooter = {
      ...scooter,
      make: formData.make,
      model: formData.model,
      serialNumber: formData.serialNumber,
      customMake: formData.customMake,
      customModel: formData.customModel
    };
    onSave(updatedScooter);
    onClose();
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Edit Scooter Details</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="make">Make</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {manufacturers.map((manufacturer) => (
              <Button
                key={manufacturer.name}
                variant={formData.make === manufacturer.name ? "default" : "outline"}
                size="sm"
                className="h-12 flex items-center justify-center text-xs"
                onClick={() => setFormData({ ...formData, make: manufacturer.name })}
              >
                <span>{manufacturer.name}</span>
              </Button>
            ))}
          </div>
          <Button
            variant={formData.make === "unknown" ? "default" : "outline"}
            size="sm"
            className="w-full mt-2"
            onClick={() => setFormData({ ...formData, make: "unknown" })}
          >
            Unknown / Other
          </Button>
        </div>

        {formData.make === 'unknown' && (
          <>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="customMake">Custom Make</Label>
              <Input
                id="customMake"
                value={formData.customMake}
                onChange={(e) => setFormData({ ...formData, customMake: e.target.value })}
                placeholder="Enter custom make"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="customModel">Custom Model</Label>
              <Input
                id="customModel"
                value={formData.customModel}
                onChange={(e) => setFormData({ ...formData, customModel: e.target.value })}
                placeholder="Enter custom model"
              />
            </div>
          </>
        )}

        {formData.make !== 'unknown' && (
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              placeholder="Enter model"
            />
          </div>
        )}

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="serialNumber">Serial Number (Optional)</Label>
          <Input
            id="serialNumber"
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
            placeholder="Enter serial number"
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogFooter>
    </DialogContent>
  );
}

interface ReBookModalProps {
  scooter: UserScooter;
  onClose: () => void;
}

function ReBookModal({ scooter, onClose }: ReBookModalProps) {
  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Book Service for {scooter.make === 'unknown' ? scooter.customMake : scooter.make} {scooter.make === 'unknown' ? scooter.customModel : scooter.model}</DialogTitle>
      </DialogHeader>
      
      <div className="py-4">
        <BookingForm />
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default function UserScootersPage() {
  const [scooters, setScooters] = useState<UserScooter[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingScooter, setEditingScooter] = useState<UserScooter | null>(null);
  const [reBookingScooter, setReBookingScooter] = useState<UserScooter | null>(null);

  useEffect(() => {
    fetchScooters();
  }, []);

  const fetchScooters = async () => {
    try {
      const response = await fetch('/api/user/scooters');
      const data = await response.json();
      setScooters(data);
    } catch (error) {
      console.error('Error fetching scooters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveScooter = (updatedScooter: UserScooter) => {
    setScooters(scooters.map(s => s.id === updatedScooter.id ? updatedScooter : s));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getServiceStatus = (scooter: UserScooter) => {
    if (scooter.isServiceDue) {
      return {
        text: "Service Due",
        icon: <AlertTriangle className="h-4 w-4 text-orange-500" />,
        bgColor: "bg-orange-50 border-orange-200"
      };
    } else {
      return {
        text: "Service Up to Date",
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
        bgColor: "bg-green-50 border-green-200"
      };
    }
  };

  if (loading) {
    return (
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Your eScooters</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Your eScooters</h2>
      </div>
      
      {scooters.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-gray-500">No scooters found. Add your first scooter by booking a service!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scooters.map((scooter) => {
            const serviceStatus = getServiceStatus(scooter);
            
            return (
              <Card key={scooter.id} className="relative">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      {scooter.make === 'unknown' 
                        ? `${scooter.customMake} ${scooter.customModel}`
                        : `${scooter.make} ${scooter.model}`
                      }
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scooter.serialNumber && (
                    <div className="text-sm text-gray-600">
                      <strong>Serial Number:</strong> {scooter.serialNumber}
                    </div>
                  )}
                  
                  {scooter.lastRepairDate && (
                    <div className="text-sm text-gray-600">
                      <strong>Last Repair:</strong> {formatDate(scooter.lastRepairDate)}
                    </div>
                  )}
                  
                  {scooter.lastServiceDate && (
                    <div className="text-sm text-gray-600">
                      <strong>Last Service:</strong> {formatDate(scooter.lastServiceDate)}
                    </div>
                  )}
                  
                  <div className={`p-3 rounded-lg border ${serviceStatus.bgColor}`}>
                    <div className="flex items-center space-x-2">
                      {serviceStatus.icon}
                      <span className="text-sm font-medium">{serviceStatus.text}</span>
                    </div>
                    {scooter.isServiceDue && (
                      <p className="text-xs text-gray-600 mt-1">
                        We recommend getting a general service every 6 months
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => setEditingScooter(scooter)}
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      {editingScooter?.id === scooter.id && (
                        <EditScooterModal
                          scooter={editingScooter}
                          onSave={handleSaveScooter}
                          onClose={() => setEditingScooter(null)}
                        />
                      )}
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => setReBookingScooter(scooter)}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Re-Book
                        </Button>
                      </DialogTrigger>
                      {reBookingScooter?.id === scooter.id && (
                        <ReBookModal
                          scooter={reBookingScooter}
                          onClose={() => setReBookingScooter(null)}
                        />
                      )}
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}