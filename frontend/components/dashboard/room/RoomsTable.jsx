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

const RoomsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Room Number</TableHead>
          <TableHead>Floor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
  <TableRow>
    <TableCell>101</TableCell>
    <TableCell>1st</TableCell>
    <TableCell>
      <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        Active
      </span>
    </TableCell>
    <TableCell>Vacant</TableCell>
    <TableCell>
      <Button variant="ghost" size="icon">
        <EllipsisVertical className="w-4 h-4" />
      </Button>
    </TableCell>
  </TableRow>

  <TableRow>
    <TableCell>202</TableCell>
    <TableCell>2nd</TableCell>
    <TableCell>
      <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <span className="w-2 h-2 rounded-full bg-yellow-500" />
        Pending
      </span>
    </TableCell>
    <TableCell>Occupied</TableCell>
    <TableCell>
      <Button variant="ghost" size="icon">
        <EllipsisVertical className="w-4 h-4" />
      </Button>
    </TableCell>
  </TableRow>
</TableBody>

    </Table>
  );
};

export default RoomsTable;
