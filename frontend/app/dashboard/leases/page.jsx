"use client";

import SearchInput from "@/components/ui/searchInput";
import LeaseTable from "@/components/dashboard/lease/LeaseTable";
import Link from "next/link";
import Loading from "@/components/ui/Loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { getTenants } from "@/lib/api/tenantsApi";
import { useQuery } from "@tanstack/react-query";

const page = () => {
  const { data: tenants, isLoading: isLoadingTenants } = useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
  });

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div className="font-bold text-2xl mt-2">Leases</div>
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
                <BreadcrumbPage>Leases</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="flex-1">
        <div className="border border-dashed rounded-md h-full relative p-4 flex flex-col gap-4">
          {isLoadingTenants ? (
            <Loading />
          ) : (
            <>
              {" "}
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div>
                    <SearchInput />
                  </div>
                  <Button variant="ghost">
                    <span>
                      <Download />
                    </span>
                    <span className="font-semibold">Export</span>
                  </Button>
                </div>
              </div>
              <div>
                <LeaseTable />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
