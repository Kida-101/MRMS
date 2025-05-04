"use client";

import MoveBack from "@/components/ui/MoveBack";
import RoomCard from "@/components/dashboard/tenant/RoomCard";
import BusinessCard from "@/components/dashboard/tenant/BusinessCard";
import LeaseCard from "@/components/dashboard/tenant/LeaseCard";
import EmergencyContactCard from "@/components/dashboard/tenant/EmergencyContactCard";
import TenantInfoCard from "@/components/dashboard/tenant/TenantInfoCard";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";
import { getTenant } from "@/lib/api/tenantsApi";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/ui/Loading";

const page = () => {
  const { id } = useParams();

  const {
    data: tenant,
    isLoading: isLoadingTenant,
    isError,
  } = useQuery({
    queryKey: ["tenant", id],
    queryFn: () => getTenant(id),
    enabled: !!id,
  });

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div>
          <MoveBack text="Back" />
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard/tenants">Tenants</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Detail</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="flex-1">
        <div className="border h-full border-dashed rounded-2xl relative p-4 gap-4 grid lg:grid-cols-3 md:grid-cols-2">
          {isLoadingTenant ? (
            <Loading />
          ) : (
            <>
              <TenantInfoCard tenant={tenant} />
              <EmergencyContactCard
                emergencyContact={tenant.emergencyContact}
              />
              <BusinessCard businessInfo={tenant.businessInfo} />
              <LeaseCard lease={tenant.leaseId} />
              <RoomCard room={tenant.roomId} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
