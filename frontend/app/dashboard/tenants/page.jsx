import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/searchInput";
import TenantsTable from "@/components/dashboard/tenant/TenantsTable";
import { Download, Plus } from "lucide-react";
import Link from "next/link";
import Loading from "@/components/ui/Loading";

const page = () => {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div className="font-bold text-2xl mt-2">Tenants</div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Tenants</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="flex-1">
        <div className="border border-dashed rounded-md h-full relative p-4 flex flex-col gap-4">
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
            <TenantsTable />
            {/* <Loading /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
