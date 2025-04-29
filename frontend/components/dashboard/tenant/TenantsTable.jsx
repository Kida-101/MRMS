import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import TenantProfileDetail from "./TenantProfileDetail";
import { useRouter } from "next/navigation";

const statusStyles = {
  active: {
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    dot: "bg-green-500",
  },
  pending: {
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    dot: "bg-yellow-500",
  },
  inactive: {
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    dot: "bg-red-500",
  },
  default: {
    color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    dot: "bg-gray-500",
  },
};

const TenantsTable = ({ tenants }) => {
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const handleBlabla = (e) => {
    e.stopPropagation();
    console.log("Button Clicked");
  };

  const handleOpen = (tenant) => {
    setOpenDialog(true);
    setSelectedTenant(tenant);
  };

  return (
    <>
      {/* {openDialog && (
        <TenantProfileDetail
          open={openDialog}
          onOpenChange={setOpenDialog}
          tenant={selectedTenant}
        />
      )} */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tenant Info</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Business Details</TableHead>
            <TableHead>Emergency Contact</TableHead>
            <TableHead>Lease Info</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants.map((tenant) => (
            <TableRow
              className="cursor-pointer"
              key={tenant._id}
              // onClick={() => handleOpen(tenant)}
              onClick={() => router.push(`/dashboard/tenants/${tenant._id}`)}
            >
              {/* TENANT INFO */}
              <TableCell>
                <div className="flex items-center gap-4">
                  <Building />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">
                      {tenant.name || "N/A"}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {tenant.phone || "No phone"}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {tenant.email || "No email"}
                    </span>
                  </div>
                </div>
              </TableCell>

              {/* ADDRESS */}
              <TableCell>
                <div className="space-y-1">
                  <span className="block text-sm text-gray-700 dark:text-gray-200">
                    {tenant.address?.street || "N/A"}
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {tenant.address?.city && tenant.address?.country
                      ? `${tenant.address.city}, ${tenant.address.country}`
                      : "No city/country"}
                  </span>
                </div>
              </TableCell>

              {/* BUSINESS INFO */}
              <TableCell className="px-6 py-4 text-left">
                <div className="space-y-1">
                  <span className="block text-sm text-gray-700 dark:text-gray-200">
                    {tenant.businessInfo?.businessName || "N/A"}
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {tenant.businessInfo?.businessPhone || "No phone"}
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {tenant.businessInfo?.businessEmail || "No Email"}
                  </span>
                </div>
              </TableCell>

              {/* EMERGENCY CONSTACT INFO*/}
              <TableCell>
                <div className="space-y-1">
                  <span className="block text-sm text-gray-700 dark:text-gray-200">
                    {tenant.emergencyContact?.name || "N/A"}
                  </span>
                  <span className="block text-xs text-gray-600 dark:text-gray-400">
                    {tenant.emergencyContact?.phone || "No phone"}
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-500 truncate max-w-xs">
                    {tenant.emergencyContact?.relationship || "No relation"}
                  </span>
                </div>
              </TableCell>
              <TableCell>asjhdga</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium ${
                    statusStyles[tenant.status?.toLowerCase()]?.color ||
                    statusStyles.default.color
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      statusStyles[tenant.status?.toLowerCase()]?.dot ||
                      statusStyles.default.dot
                    }`}
                  />
                  {tenant.status || "Unknown"}
                </span>
              </TableCell>
              <TableCell>
                <Button variant="ghost" onClick={handleBlabla} className="">
                  <EllipsisVertical />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TenantsTable;
