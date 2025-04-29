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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const AdminTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="cursor-pointer">
          <TableCell>
            <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              {/* From the backend */}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">Nebiyu Daniel</span>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="space-y-1">
              <span className="block text-sm text-gray-700 dark:text-gray-200">
                samrudolf@gmail.com
              </span>
            </div>
          </TableCell>
          <TableCell className="p-4 text-left">
            <div className="space-y-1">
              <span className="block text-sm text-gray-700 dark:text-gray-200">
                0947811360
              </span>
            </div>
          </TableCell>
          <TableCell className="p-4 text-left">
            <div className="space-y-1">
            <span
              className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`}
            >
              <span
                className={`w-2 h-2 rounded-full bg-green-500`}
              />
              Admin
            </span>
              
            </div>
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

export default AdminTable;
