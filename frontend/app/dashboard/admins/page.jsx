"use client";

import SearchInput from "@/components/ui/searchInput";
import AdminTable from "@/components/dashboard/admins/AdminTable";
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
        <div className="font-bold text-2xl mt-2">Admins</div>
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
                <BreadcrumbPage>Admins</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="flex-1">
        <div className="border border-dashed rounded-2xl h-full relative p-4 flex flex-col gap-4">
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
                <div>
                  <Link href="/dashboard/tenants/new">
                    <Button size="sm">
                      <span>
                        <Plus />
                      </span>
                      <span className="font-semibold">Add</span>
                    </Button>
                  </Link>
                </div>
              </div>
              <div>
                <AdminTable />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
