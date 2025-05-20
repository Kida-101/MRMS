import { Button } from "@/components/ui/button";
import CustomCardItem from "@/components/ui/CustomCardItem";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BadgeCheck,
  CalendarArrowDown,
  CalendarCheck,
  CalendarX2,
  Repeat,
  Wallet,
} from "lucide-react";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const colorContainer = {
  blue: "bg-sky-50 text-sky-300 dark:bg-sky-900/30 px-2 py-1 rounded-[8px]",
  red: "bg-red-50 text-red-300 dark:bg-red-900/30 px-2 py-1 rounded-[8px]",
};

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

const LeaseDetail = ({ openSheet, lease, setOpenSheet }) => {
  console.log(lease);
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent>
        <SheetHeader>
          <div className="flex flex-col gap-6">
            <SheetTitle>Lease Details</SheetTitle>
            <div className="flex flex-col gap-3 text-sm">
              <CustomCardItem
                icon={<CalendarArrowDown size={16} />}
                label="Start Date"
                valueColor={colorContainer.blue}
                value={formatDate(lease?.startDate) || "N/A "}
              />
              <CustomCardItem
                icon={<CalendarX2 size={16} />}
                label="End Date"
                valueColor={colorContainer.red}
                value={formatDate(lease?.endDate) || "N/A "}
              />
              <CustomCardItem
                icon={<Wallet size={16} />}
                label="Security Deposit"
                valueColor={colorContainer.blue}
                value={`${lease?.securityDeposit} ETB` || "N/A"}
              />
              <CustomCardItem
                icon={<Repeat size={16} />}
                label="Payment Schedule"
                valueColor={colorContainer.blue}
                value={lease?.paymentSchedule || "N/A"}
              />
              <CustomCardItem
                icon={<BadgeCheck size={16} />}
                label="Status"
                value={
                  <>
                    <span
                      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium ${
                        statusStyles[lease?.status]?.color ||
                        statusStyles.default.color
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          statusStyles[lease?.status]?.dot ||
                          statusStyles.default.dot
                        }`}
                      />
                      {lease?.status || "N/A"}
                    </span>
                  </>
                }
              />
            </div>
          </div>
        </SheetHeader>

        <SheetFooter>
          <Button size="sm">Update</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default LeaseDetail;
