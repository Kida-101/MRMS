"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Upload } from "lucide-react";

const RegistrationForm = () => {
  return (
    <div className="border border-dashed rounded-md h-full mb-4 relative">
      <form className="grid lg:grid-cols-[2fr_auto_1fr_auto_2fr] gap-y-12 gap-6 p-4">
        {/* Personal Information */}
        <div className="flex flex-col gap-6">
          <div className="font-semibold text-lg mb-2 text-center">
            Personal Information
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+123456789" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="******" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="street">Street Address</Label>
              <Input id="street" placeholder="123 Main St" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="New York" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="USA" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input id="postalCode" placeholder="10001" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Profile Image URL</Label>
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-full h-24 border-2 border-dashed border-input/50 rounded-lg cursor-pointer hover:border-input transition-colors"
              >
                <Upload className="text-border" />
              </label>
              <Input
                type="file"
                accept="image/*"
                className="border-none"
                id="image-upload"
              />
            </div>
          </div>
        </div>

        <Separator orientation="vertical" />

        {/* Business & Lease Information */}
        <div className="flex flex-col gap-6">
          <div className="font-semibold text-lg mb-2 text-center">
            Business Information
          </div>

          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" placeholder="ABC Corp" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="businessPhone">Business Phone</Label>
              <Input id="businessPhone" type="tel" placeholder="+123456789" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input
                id="businessEmail"
                type="email"
                placeholder="business@example.com"
              />
            </div>
          </div>
        </div>

        <Separator orientation="vertical" />

        {/* Emergency Contact Information */}
        <div className="flex flex-col gap-6">
          <div className="font-semibold text-lg mb-2 text-center">
            Emergency Contact Information
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="emergencyName">Full Name</Label>
              <Input id="emergencyName" placeholder="Jane Doe" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyRelationship">Relationship</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select relation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="colleague">Colleague</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyPhone">Phone</Label>
              <Input id="emergencyPhone" type="tel" placeholder="+123456789" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyStreet">Street Address</Label>
              <Input id="emergencyStreet" placeholder="123 Main St" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyCity">City</Label>
              <Input id="emergencyCity" placeholder="New York" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyCountry">Country</Label>
              <Input id="emergencyCountry" placeholder="USA" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyPostalCode">Postal Code</Label>
              <Input id="emergencyPostalCode" placeholder="10001" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="md:absolute right-0 -top-12" size="sm">
          Save
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
