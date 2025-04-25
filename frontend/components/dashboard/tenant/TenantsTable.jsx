import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
        <TableRow className="cursor-pointer">
          <TableCell>
            <div className="flex items-center gap-4">
              <Building />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">Nebiyu Daniel</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  +25198768567
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  nebiyu@gmail.com
                </span>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="space-y-1">
              <span className="block text-sm text-gray-700 dark:text-gray-200">
                sdhfsdjkh
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">
                ashdashk
              </span>
            </div>
          </TableCell>
          <TableCell className="px-6 py-4 text-left">
            <div className="space-y-1">
              <span className="block text-sm text-gray-700 dark:text-gray-200">
                ajshdasjd
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">
                sdsjadha
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">
                ashjdajd
              </span>
            </div>
          </TableCell>
          <TableCell className="px-6 py-4 text-left">
            <div className="space-y-1">
              <span className="block text-sm text-gray-700 dark:text-gray-200">
                jwhedqd
              </span>
              <span className="block text-xs text-gray-600 dark:text-gray-400">
                jshdvjwq
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-500 truncate max-w-xs">
                akjhdawd
              </span>
            </div>
          </TableCell>
          <TableCell>asjhdga</TableCell>
          <TableCell>asjhdga</TableCell>
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
