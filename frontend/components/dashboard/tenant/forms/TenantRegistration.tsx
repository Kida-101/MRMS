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
import { Upload } from "lucide-react";
import InputError from "@/components/ui/InputError";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tenantSchemaDemo } from "@/lib/types"; // Assuming the tenant schema is typed with Zod
import MoveBack from "@/components/ui/MoveBack";
import Loading from "@/components/ui/Loading";
import toast from "react-hot-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";

// Infer the type from the Zod schema (assuming tenantSchemaDemo is a Zod schema)
type TenantFormData = z.infer<typeof tenantSchemaDemo>;

const steps = [
  {
    title: "Step 1",
    fields: [
      "name",
      "email",
      "phone",
      "password",
      "address.city",
      "address.street",
      "address.country",
      "address.postalCode",
    ],
  },
  {
    title: "Step 2",

    fields: [
      "businessInfo.businessName",
      "businessInfo.businessPhone",
      "businessInfo.businessType",
      "businessInfo.businessEmail",
    ],
  },
  {
    title: "Step 3",
    fields: [
      "emergencyContact.name",
      "emergencyContact.phone",
      "emergencyContact.relationship",
      "emergencyContact.address.city",
      "emergencyContact.address.street",
      "emergencyContact.address.country",
      "emergencyContact.address.postalCode",
    ],
  },
  {
    title: "Step 4",
    fields: [
      "lease.startDate",
      "lease.endDate",
      "lease.monthlyRent",
      "lease.securityDeposit",
      "lease.paymentSchedule",
      "lease.documents",
    ],
  },
];

const TenantRegistration = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchemaDemo),
  });

  const [currentStep, setCurrentStep] = useState(0);

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const onSubmit = async (data: TenantFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(data);
    toast.success(`${data.name?.split(" ").at(0)} successfully registered`);
    setCurrentStep(0);
    reset();
  };

  if (isSubmitting) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <MoveBack text="Back" />
      </div>
      <div className="border border-dashed rounded-md h-full mb-4 relative p-4 flex flex-col gap-8 ">
        <div className="w-full max-w-3xl mx-auto px-4">
          <div className="mt-4 text-center text-sm text-muted-foreground animate-fade-in">
            Step {currentStep + 1} of {steps.length}
          </div>

          <div className="flex items-center justify-between">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center",
                  index < steps.length - 1 && "w-full"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full text-sm font-medium flex justify-center items-center border-2 transition-all duration-300",
                    currentStep >= index
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border"
                  )}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <span
                    className={cn(
                      "flex-1 h-0.5 mx-2 transition-all duration-300",
                      currentStep > index ? "bg-primary" : "bg-muted"
                    )}
                  ></span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* Personal Information */}
            {currentStep === 0 && (
              <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                <div className="font-semibold text-lg mb-2 text-center">
                  Personal Information
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        className={errors.name ? "border-destructive" : ""}
                        id="name"
                        placeholder="Dawit Moges"
                        {...register("name")}
                      />
                      {errors.name && (
                        <InputError message={errors.name.message} />
                      )}
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
                      {errors.email && (
                        <InputError message={errors.email.message} />
                      )}
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
                      {errors.phone && (
                        <InputError message={errors.phone.message} />
                      )}
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
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        className={
                          errors.address?.street ? "border-destructive" : ""
                        }
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
                        className={
                          errors.address?.city ? "border-destructive" : ""
                        }
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
                        className={
                          errors.address?.country ? "border-destructive" : ""
                        }
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
                        <InputError
                          message={errors.address.postalCode.message}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
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
                      className="border-none shadow-none"
                      id="image-upload"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Business & Lease Information */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                <div className="font-semibold text-lg mb-2 text-center">
                  Business Information
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      className={
                        errors.businessInfo?.businessName
                          ? "border-destructive"
                          : ""
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
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
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
                            <SelectItem value="commercial">
                              Commercial
                            </SelectItem>
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
                        errors.businessInfo?.businessPhone
                          ? "border-destructive"
                          : ""
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
                        errors.businessInfo?.businessEmail
                          ? "border-destructive"
                          : ""
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
            )}

            {/* Emergency Contact Information */}
            {currentStep === 2 && (
              <>
                <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                  <div className="font-semibold text-lg mb-2 text-center">
                    Emergency Contact Information
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="emergencyName">Full Name</Label>
                      <Input
                        className={
                          errors.emergencyContact?.name
                            ? "border-destructive"
                            : ""
                        }
                        id="emergencyName"
                        placeholder="Moges Asefa"
                        {...register("emergencyContact.name")}
                      />
                      {errors.emergencyContact?.name && (
                        <InputError
                          message={errors.emergencyContact.name.message}
                        />
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="emergencyRelationship">
                        Relationship
                      </Label>
                      <Controller
                        name="emergencyContact.relationship"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
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
                              <SelectItem value="colleague">
                                Colleague
                              </SelectItem>
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
                          errors.emergencyContact?.phone
                            ? "border-destructive"
                            : ""
                        }
                        id="emergencyPhone"
                        type="tel"
                        placeholder="0912*****"
                        {...register("emergencyContact.phone")}
                      />
                      {errors.emergencyContact?.phone && (
                        <InputError
                          message={errors.emergencyContact.phone.message}
                        />
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
                          message={
                            errors.emergencyContact.address.street.message
                          }
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
                          message={
                            errors.emergencyContact.address.country.message
                          }
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
                          message={
                            errors.emergencyContact.address.postalCode.message
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                <div className="font-semibold text-lg mb-2 text-center">
                  Lease Information
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        className={
                          errors.lease?.startDate ? "border-destructive" : ""
                        }
                        id="startDate"
                        type="date"
                        {...register("lease.startDate")}
                      />
                      {errors.lease?.startDate && (
                        <InputError message={errors.lease.startDate.message} />
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        className={
                          errors.lease?.endDate ? "border-destructive" : ""
                        }
                        id="endDate"
                        type="date"
                        {...register("lease.endDate")}
                      />
                      {errors.lease?.endDate && (
                        <InputError message={errors.lease.endDate.message} />
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="monthlyRent">Monthly Rent</Label>
                      <Input
                        className={
                          errors.lease?.monthlyRent ? "border-destructive" : ""
                        }
                        id="monthlyRent"
                        placeholder="1000"
                        {...register("lease.monthlyRent")}
                      />
                      {errors.lease?.monthlyRent && (
                        <InputError
                          message={errors.lease.monthlyRent.message}
                        />
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="securityDeposit">Security Deposit</Label>
                      <Input
                        className={
                          errors.lease?.securityDeposit
                            ? "border-destructive"
                            : ""
                        }
                        id="securityDeposit"
                        placeholder="500"
                        {...register("lease.securityDeposit")}
                      />
                      {errors.lease?.securityDeposit && (
                        <InputError
                          message={errors.lease.securityDeposit.message}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="paymentSchedule">Payment Schedule</Label>
                      <Input
                        className={
                          errors.lease?.paymentSchedule
                            ? "border-destructive"
                            : ""
                        }
                        id="paymentSchedule"
                        placeholder="Monthly"
                        {...register("lease.paymentSchedule")}
                      />
                      {errors.lease?.paymentSchedule && (
                        <InputError
                          message={errors.lease.paymentSchedule.message}
                        />
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="documents">Lease Documents</Label>
                      <Input
                        className={
                          errors.lease?.documents ? "border-destructive" : ""
                        }
                        id="documents"
                        type="file"
                        accept="application/pdf,image/*"
                        {...register("lease.documents")}
                      />
                      {errors.lease?.documents && (
                        <InputError message={errors.lease.documents.message} />
                      )}
                    </div>
                    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                      <Button type="submit" size="sm" disabled={isSubmitting}>
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* {currentStep === 3 && (
              <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                <Button type="submit" size="sm" disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
            )} */}
          </form>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 items-center absolute right-0 -top-12">
          <Button
            onClick={prev}
            disabled={currentStep === 0}
            variant="outline"
            size="sm"
            type="button"
          >
            Prev
          </Button>

          <Button
            onClick={next}
            disabled={currentStep === steps.length - 1}
            variant="outline"
            size="sm"
            type="button"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenantRegistration;
