import { Button } from "@/components/ui/button";
import { Banknote, Calendar, ScrollText, Calendar1, CalendarX } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building, EllipsisVertical } from "lucide-react";

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

const TenantsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lease Info</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Security Deposit</TableHead>
          <TableHead>Payment Schedule</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="cursor-pointer">
          <TableCell>
            <div className="flex items-center gap-4">
              <ScrollText />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">Nebiyu Daniel</span>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="space-y-1">
              <span className="flex gap-2 text-sm text-gray-700 dark:text-gray-200">
              <Calendar1 className="size-4"/>1/12/23{/* Component from shadcn */}
              </span>
            </div>
          </TableCell>
          <TableCell className="p-4 text-left">
            <div className="space-y-1">
            <span className="flex gap-2 text-sm text-gray-700 dark:text-gray-200">
              <CalendarX className="size-4"/>1/12/23{/* Component from shadcn */}
              </span>
            </div>
          </TableCell>
          <TableCell className="px-6 py-4 text-left">
            <div className="space-y-1">
              <span className="flex gap-2 text-sm text-gray-700 dark:text-gray-200">
                <Banknote className="size-4"/>400000
              </span>
            </div>
          </TableCell>
          <TableCell>
          <div className="space-y-1">
              <span className="flex gap-2 text-sm text-gray-700 dark:text-gray-200">
              <Calendar className="size-4"/>Annually 
              </span>
            </div>
          </TableCell>
          <TableCell>
            <span
              className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium ${
                statusStyles["active"]?.color || statusStyles.default.color
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  statusStyles["active"]?.dot || statusStyles.default.dot
                }`}
              />
              active
            </span>
          </TableCell>
          <TableCell>
            <Button variant="ghost">
              <EllipsisVertical />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TenantsTable;
