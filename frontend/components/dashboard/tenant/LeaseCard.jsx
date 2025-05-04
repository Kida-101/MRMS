import CustomCardItem from "@/components/ui/CustomCardItem";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Repeat,
  Wallet,
} from "lucide-react";

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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const LeaseCard = ({ lease }) => {
  const startDate = formatDate(lease?.startDate) || "N/A";
  const endDate = formatDate(lease?.endDate) || "N/A";

  return (
    <>
      {/*Lease Info */}
      <div className="border border-dashed rounded-2xl p-4 flex flex-col gap-5 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="text-base font-semibold">Lease Info</div>
          <div className="flex items-center gap-1 cursor-pointer">
            <div className="text-sm hover:underline">Detail</div>
            <ArrowUpRight size={16} />
          </div>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <CustomCardItem
            icon={<CalendarCheck size={16} />}
            label="Period"
            value={`${startDate} - ${endDate}`}
          />
          <CustomCardItem
            icon={<Wallet size={16} />}
            label="Security Deposit"
            value={`${lease?.securityDeposit} ETB` || "N/A"}
          />
          <CustomCardItem
            icon={<Repeat size={16} />}
            label="Payment Schedule"
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
    </>
  );
};

export default LeaseCard;
