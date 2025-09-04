"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Save, X } from "lucide-react";
import { UserProfile } from "@/types/api";

export default function UserDetailsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<UserProfile>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValues({ [field]: currentValue });
  };

  const cancelEditing = () => {
    setEditingField(null);
    setEditValues({});
  };

  const saveField = async () => {
    if (!profile || !editingField) return;

    // In a real app, this would make an API call to update the field
    setProfile({
      ...profile,
      ...editValues
    });
    
    setEditingField(null);
    setEditValues({});
  };

  const renderField = (field: keyof UserProfile, label: string, value: string) => {
    const isEditing = editingField === field;
    
    return (
      <div key={field} className="flex items-center space-x-2 p-4 border rounded-lg">
        <div className="flex-1">
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor={field}>{label}</Label>
            <Input
              id={field}
              value={editValues[field] || ''}
              onChange={(e) => setEditValues({ ...editValues, [field]: e.target.value })}
              className="mt-1"
            />
          </div>
          ) : (
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor={field}>{label}</Label>
            <Input
              id={field}
              value={value || ''}
              disabled
              className="mt-1 bg-gray-50"
            />
          </div>
          )
        </div>
        
        {isEditing ? (
          <div className="flex space-x-1">
            <Button size="sm" onClick={saveField} className="h-8 w-8 p-0">
              <Save className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={cancelEditing} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => startEditing(field, value)}
            className="h-8 w-8 p-0"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Your Details</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Your Details</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <p>Failed to load profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Your Details</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderField('name', 'Full Name', profile.name)}
          {renderField('email', 'Email Address', profile.email)}
          {renderField('phone', 'Phone Number', profile.phone)}
          {renderField('address', 'Address', profile.address)}
          {profile.dateOfBirth && renderField('dateOfBirth', 'Date of Birth', profile.dateOfBirth)}
        </CardContent>
      </Card>
    </div>
  );
}