"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import MoveBack from "@/components/ui/MoveBack";
import { useRouter } from "next/router";

const page = () => {
  // const router = useRouter();

  // console.log(router);

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
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/tenants">
                  Tenants
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
        <div className="border border-dashed rounded-md h-full relative p-4 flex flex-col gap-4">
          <div>Personal Info</div>
          <div>Business Info</div>
          <div>Emergency Contact Info</div>
          <div>Lease Info</div>
        </div>
      </div>
    </div>
  );
};

export default page;
