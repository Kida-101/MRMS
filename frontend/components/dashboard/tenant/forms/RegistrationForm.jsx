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
import { Controller, useForm } from "react-hook-form";

const RegistrationForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  return (
    <div className="border border-dashed rounded-md h-full mb-4 relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid lg:grid-cols-[2fr_auto_1fr_auto_2fr] gap-y-12 gap-6 p-4"
      >
        {/* Personal Information */}
        <div className="flex flex-col gap-6">
          <div className="font-semibold text-lg mb-2 text-center">
            Personal Information
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Dawit Moges"
                {...register("name")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="test@gmail.com"
                {...register("email")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0912*****"
                {...register("phone")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                {...register("password")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                placeholder="Welo Sefer"
                {...register("street")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Addis Ababa"
                {...register("city")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Ethiopia"
                {...register("country")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                placeholder="10001"
                {...register("postalCode")}
              />
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
              <Input
                id="businessName"
                placeholder="ABC Corp"
                {...register("businessName")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Controller
                name="businessType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    value={field.value} // Pass the value from React Hook Form
                    onValueChange={field.onChange} // Pass the onChange function to update React Hook Form
                  >
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
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="businessPhone">Business Phone</Label>
              <Input
                id="businessPhone"
                type="tel"
                placeholder="0912*****"
                {...register("businessPhone")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input
                id="businessEmail"
                type="email"
                placeholder="business@example.com"
                {...register("businessEmail")}
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
              <Input
                id="emergencyName"
                placeholder="Moges Asefa"
                {...register("emergencyName")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyRelationship">Relationship</Label>
              <Controller
                name="emergencyRelationship"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select relationship" />
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
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyPhone">Phone</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                placeholder="0912*****"
                {...register("emergencyPhone")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyStreet">Street Address</Label>
              <Input
                id="emergencyStreet"
                placeholder="Ayat Adebabay"
                {...register("emergencyStreet")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyCity">City</Label>
              <Input
                id="emergencyCity"
                placeholder="Addis Ababa"
                {...register("emergencyCity")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyCountry">Country</Label>
              <Input
                id="emergencyCountry"
                placeholder="Ethiopia"
                {...register("emergencyCountry")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyPostalCode">Postal Code</Label>
              <Input
                id="emergencyPostalCode"
                placeholder="10001"
                {...register("emergencyPostalCode")}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="md:absolute right-0 -top-12 cursor-pointer"
          size="sm"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
