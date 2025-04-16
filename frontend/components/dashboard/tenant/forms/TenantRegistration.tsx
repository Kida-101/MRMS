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
import { Upload, ChevronRight, ChevronLeft } from "lucide-react";
import InputError from "@/components/ui/InputError";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tenantSchema } from "@/lib/types"; // Assuming the tenant schema is typed with Zod
import MoveBack from "@/components/ui/MoveBack";
import Loading from "@/components/ui/Loading";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { getRooms } from "../../../../lib/api/roomsApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Infer the type from the Zod schema (assuming tenantSchema is a Zod schema)
type TenantFormData = z.infer<typeof tenantSchema>;

const steps = [
  {
    title: "Step 1",
    fields: [
      "personalInfo.name",
      "personalInfo.email",
      "personalInfo.phone",
      "personalInfo.password",
      "personalInfo.address.city",
      "personalInfo.address.street",
      "personalInfo.address.country",
      "personalInfo.address.postalCode",
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
      "leaseInfo.startDate",
      "leaseInfo.endDate",
      "leaseInfo.monthlyRent",
      "leaseInfo.securityDeposit",
      "leaseInfo.paymentSchedule",
      "leaseInfo.documents",
      "leaseInfo.roomId",
    ],
  },
];

// const rooms = [
//   {
//     _id: "67fca54d155dccdd39b6249c", // roomId
//     roomNumber: "A101",
//     type: "retail",
//     price: 12000,
//     status: "available",
//   },
//   {
//     _id: "a12bc34d567ef890gh12ij34", // roomId
//     roomNumber: "B202",
//     type: "office",
//     price: 8000,
//     status: "occupied",
//   },
//   {
//     _id: "bc45d678ef90123ij45kl67", // roomId
//     roomNumber: "C303",
//     type: "retail",
//     price: 15000,
//     status: "available",
//   },
//   {
//     _id: "d56ef789gh01234kl56mn78", // roomId
//     roomNumber: "D404",
//     type: "food",
//     price: 10000,
//     status: "available",
//   },
//   {
//     _id: "ef67gh890hi12345mn67op89", // roomId
//     roomNumber: "E505",
//     type: "services",
//     price: 13000,
//     status: "occupied",
//   },
// ];

const TenantRegistration = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
  });

  const [currentStep, setCurrentStep] = useState(0);

  const {
    data: rooms,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

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
    toast.success(
      `${data.personalInfo.name?.split(" ").at(0)} successfully registered`
    );
    setCurrentStep(0);
    reset();
  };

  if (isSubmitting || isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 h-auto">
      <div>
        <MoveBack text="Back" />
      </div>
      <div className="border border-dashed rounded-md h-full mb-4 relative px-4 py-6 flex flex-col gap-8 ">
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
                        className={
                          errors.personalInfo?.name ? "border-destructive" : ""
                        }
                        id="name"
                        placeholder="Dawit Moges"
                        {...register("personalInfo.name")}
                      />
                      {errors.personalInfo?.name && (
                        <InputError
                          message={errors.personalInfo?.name.message}
                        />
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        className={
                          errors.personalInfo?.email ? "border-destructive" : ""
                        }
                        id="email"
                        type="email"
                        placeholder="test@gmail.com"
                        {...register("personalInfo.email")}
                      />
                      {errors.personalInfo?.email && (
                        <InputError
                          message={errors.personalInfo?.email.message}
                        />
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        className={
                          errors.personalInfo?.phone ? "border-destructive" : ""
                        }
                        id="phone"
                        type="tel"
                        placeholder="0912*****"
                        {...register("personalInfo.phone")}
                      />
                      {errors.personalInfo?.phone && (
                        <InputError
                          message={errors.personalInfo?.phone.message}
                        />
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        className={
                          errors.personalInfo?.password
                            ? "border-destructive"
                            : ""
                        }
                        id="password"
                        type="password"
                        placeholder="******"
                        {...register("personalInfo.password")}
                      />
                      {errors.personalInfo?.password && (
                        <InputError
                          message={errors.personalInfo?.password.message}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        className={
                          errors.personalInfo?.address?.street
                            ? "border-destructive"
                            : ""
                        }
                        id="street"
                        placeholder="Welo Sefer"
                        {...register("personalInfo.address.street")}
                      />
                      {errors.personalInfo?.address?.street && (
                        <InputError
                          message={errors.personalInfo?.address?.street.message}
                        />
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        className={
                          errors.personalInfo?.address?.city
                            ? "border-destructive"
                            : ""
                        }
                        id="city"
                        placeholder="Addis Ababa"
                        {...register("personalInfo.address.city")}
                      />
                      {errors.personalInfo?.address?.city && (
                        <InputError
                          message={errors.personalInfo?.address?.city.message}
                        />
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        className={
                          errors.personalInfo?.address?.country
                            ? "border-destructive"
                            : ""
                        }
                        id="country"
                        placeholder="Ethiopia"
                        {...register("personalInfo.address.country")}
                      />
                      {errors.personalInfo?.address?.country && (
                        <InputError
                          message={
                            errors.personalInfo?.address?.country?.message
                          }
                        />
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        className={
                          errors.personalInfo?.address?.postalCode
                            ? "border-destructive"
                            : ""
                        }
                        id="postalCode"
                        placeholder="10001"
                        {...register("personalInfo.address.postalCode")}
                      />
                      {errors.personalInfo?.address?.postalCode && (
                        <InputError
                          message={
                            errors.personalInfo?.address?.postalCode?.message
                          }
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

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        className={`w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.leaseInfo?.startDate
                            ? "border-destructive ring-destructive"
                            : ""
                        }`}
                        {...register("leaseInfo.startDate")}
                      />
                      {errors.leaseInfo?.startDate && (
                        <InputError
                          message={errors.leaseInfo.startDate.message}
                        />
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        className={`w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.leaseInfo?.endDate
                            ? "border-destructive ring-destructive"
                            : ""
                        }`}
                        id="endDate"
                        type="date"
                        {...register("leaseInfo.endDate")}
                      />
                      {errors.leaseInfo?.endDate && (
                        <InputError
                          message={errors.leaseInfo.endDate.message}
                        />
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="monthlyRent">Monthly Rent</Label>
                      <Input
                        className={
                          errors.leaseInfo?.monthlyRent
                            ? "border-destructive"
                            : ""
                        }
                        id="monthlyRent"
                        placeholder="1000"
                        {...register("leaseInfo.monthlyRent")}
                      />
                      {errors.leaseInfo?.monthlyRent && (
                        <InputError
                          message={errors.leaseInfo.monthlyRent.message}
                        />
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="securityDeposit">Security Deposit</Label>
                      <Input
                        className={
                          errors.leaseInfo?.securityDeposit
                            ? "border-destructive"
                            : ""
                        }
                        id="securityDeposit"
                        placeholder="500"
                        {...register("leaseInfo.securityDeposit")}
                      />
                      {errors.leaseInfo?.securityDeposit && (
                        <InputError
                          message={errors.leaseInfo.securityDeposit.message}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="paymentSchedule">Payment Schedule</Label>
                      <Controller
                        name="leaseInfo.paymentSchedule"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                errors.leaseInfo?.paymentSchedule
                                  ? "border-destructive ring-destructive"
                                  : ""
                              }`}
                            >
                              <SelectValue placeholder="Select payment schedule" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">
                                Quarterly
                              </SelectItem>
                              <SelectItem value="annually">Annually</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />

                      {errors.leaseInfo?.paymentSchedule && (
                        <InputError
                          message={errors.leaseInfo.paymentSchedule.message}
                        />
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="roomId">Room</Label>
                      <Controller
                        name="leaseInfo.roomId"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                errors.leaseInfo?.roomId
                                  ? "border-destructive ring-destructive"
                                  : ""
                              }`}
                            >
                              <SelectValue placeholder="Select a room" />
                            </SelectTrigger>
                            <SelectContent>
                              {rooms?.map((room) => (
                                <SelectItem key={room._id} value={room._id}>
                                  {room.roomNumber} -
                                  {room.type.charAt(0).toUpperCase() +
                                    room.type.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />

                      {errors.leaseInfo?.paymentSchedule && (
                        <InputError
                          message={errors.leaseInfo.paymentSchedule.message}
                        />
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="documents">Lease Documents</Label>
                      <Input
                        id="documents"
                        type="file"
                        accept="application/pdf,image/*"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 w-full mx-auto col-span-2 mt-4">
                    <Button type="submit" size="sm" disabled={isSubmitting}>
                      Submit
                    </Button>
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
            <span>
              <ChevronLeft />
            </span>
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
            <span>
              <ChevronRight />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenantRegistration;
