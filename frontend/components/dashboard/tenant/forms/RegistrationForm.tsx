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
import InputError from "@/components/ui/InputError";
import { Controller, type FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tenantSchema } from "@/lib/types";

const RegistrationForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(tenantSchema) });

  const onSubmit = async (data: FieldValues) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(data);

    reset();
  };

  if (isSubmitting) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Submitting...
      </div>
    );
  }

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
                className={errors.name ? "border-destructive" : ""}
                id="name"
                placeholder="Dawit Moges"
                {...register("name")}
              />
              {errors.name && <InputError message={errors.name.message} />}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                className={errors.email ? "border-destructive" : ""}
                id="email"
                type="email"
                placeholder="test@gmail.com"
                {...register("email")}
              />
              {errors.email && <InputError message={errors.email.message} />}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                className={errors.phone ? "border-destructive" : ""}
                id="phone"
                type="tel"
                placeholder="0912*****"
                {...register("phone")}
              />
              {errors.phone && <InputError message={errors.phone.message} />}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className={errors.password ? "border-destructive" : ""}
                id="password"
                type="password"
                placeholder="******"
                {...register("password")}
              />
              {errors.password && (
                <InputError message={errors.password.message} />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                className={errors.address?.street ? "border-destructive" : ""}
                id="street"
                placeholder="Welo Sefer"
                {...register("address.street")}
              />
              {errors.address?.street && (
                <InputError message={errors.address.street.message} />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input
                className={errors.address?.city ? "border-destructive" : ""}
                id="city"
                placeholder="Addis Ababa"
                {...register("address.city")}
              />
              {errors.address?.city && (
                <InputError message={errors.address.city.message} />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                className={errors.address?.country ? "border-destructive" : ""}
                id="country"
                placeholder="Ethiopia"
                {...register("address.country")}
              />
              {errors.address?.country && (
                <InputError message={errors.address.country.message} />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                className={
                  errors.address?.postalCode ? "border-destructive" : ""
                }
                id="postalCode"
                placeholder="10001"
                {...register("address.postalCode")}
              />
              {errors.address?.postalCode && (
                <InputError message={errors.address.postalCode.message} />
              )}
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
                className={
                  errors.businessInfo?.businessName ? "border-destructive" : ""
                }
                id="businessName"
                placeholder="ABC Corp"
                {...register("businessInfo.businessName")}
              />
              {errors.businessInfo?.businessName && (
                <InputError
                  message={errors.businessInfo.businessName.message}
                />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Controller
                name="businessInfo.businessType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={`${
                        errors.businessInfo?.businessType
                          ? "border-destructive"
                          : ""
                      } w-full`}
                    >
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
              {errors.businessInfo?.businessType && (
                <InputError
                  message={errors.businessInfo.businessType.message}
                />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="businessPhone">Business Phone</Label>
              <Input
                className={
                  errors.businessInfo?.businessPhone ? "border-destructive" : ""
                }
                id="businessPhone"
                type="tel"
                placeholder="0912*****"
                {...register("businessInfo.businessPhone")}
              />
              {errors.businessInfo?.businessPhone && (
                <InputError
                  message={errors.businessInfo.businessPhone.message}
                />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input
                className={
                  errors.businessInfo?.businessEmail ? "border-destructive" : ""
                }
                id="businessEmail"
                type="email"
                placeholder="business@example.com"
                {...register("businessInfo.businessEmail")}
              />
              {errors.businessInfo?.businessEmail && (
                <InputError
                  message={errors.businessInfo.businessEmail.message}
                />
              )}
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
                className={
                  errors.emergencyContact?.name ? "border-destructive" : ""
                }
                id="emergencyName"
                placeholder="Moges Asefa"
                {...register("emergencyContact.name")}
              />
              {errors.emergencyContact?.name && (
                <InputError message={errors.emergencyContact.name.message} />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyRelationship">Relationship</Label>
              <Controller
                name="emergencyContact.relationship"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={`${
                        errors.emergencyContact?.relationship
                          ? "border-destructive"
                          : ""
                      } w-full`}
                    >
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
              {errors.emergencyContact?.relationship && (
                <InputError
                  message={errors.emergencyContact.relationship.message}
                />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyPhone">Phone</Label>
              <Input
                className={
                  errors.emergencyContact?.phone ? "border-destructive" : ""
                }
                id="emergencyPhone"
                type="tel"
                placeholder="0912*****"
                {...register("emergencyContact.phone")}
              />
              {errors.emergencyContact?.phone && (
                <InputError message={errors.emergencyContact.phone.message} />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyStreet">Street Address</Label>
              <Input
                className={
                  errors.emergencyContact?.address?.street
                    ? "border-destructive"
                    : ""
                }
                id="emergencyStreet"
                placeholder="Ayat Adebabay"
                {...register("emergencyContact.address.street")}
              />
              {errors.emergencyContact?.address?.street && (
                <InputError
                  message={errors.emergencyContact.address.street.message}
                />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyCity">City</Label>
              <Input
                className={
                  errors.emergencyContact?.address?.city
                    ? "border-destructive"
                    : ""
                }
                id="emergencyCity"
                placeholder="Addis Ababa"
                {...register("emergencyContact.address.city")}
              />
              {errors.emergencyContact?.address?.city && (
                <InputError
                  message={errors.emergencyContact.address.city.message}
                />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyCountry">Country</Label>
              <Input
                className={
                  errors.emergencyContact?.address?.country
                    ? "border-destructive"
                    : ""
                }
                id="emergencyCountry"
                placeholder="Ethiopia"
                {...register("emergencyContact.address.country")}
              />
              {errors.emergencyContact?.address?.country && (
                <InputError
                  message={errors.emergencyContact.address.country.message}
                />
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="emergencyPostalCode">Postal Code</Label>
              <Input
                className={
                  errors.emergencyContact?.address?.postalCode
                    ? "border-destructive"
                    : ""
                }
                id="emergencyPostalCode"
                placeholder="10001"
                {...register("emergencyContact.address.postalCode")}
              />
              {errors.emergencyContact?.address?.postalCode && (
                <InputError
                  message={errors.emergencyContact.address.postalCode.message}
                />
              )}
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
