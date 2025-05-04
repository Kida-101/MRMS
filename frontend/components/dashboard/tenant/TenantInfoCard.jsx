import CustomCardItem from "@/components/ui/CustomCardItem";
import {
  ArrowUpRight,
  BadgeCheck,
  ClockArrowDown,
  Globe,
  Mail,
  MailCheck,
  Map,
  MapPin,
  Phone,
  SquarePen,
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
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }); // e.g., Apr 9, 2025
};

const TenantInfoCard = ({ tenant }) => {
  const status = tenant?.status?.toLowerCase() || "default";
  const statusClass = statusStyles[status] || statusStyles.default;

  return (
    <>
      {/*Tenant Info */}
      <div className="border border-dashed rounded-2xl p-6 flex flex-col gap-8 lg:row-span-3 shadow-sm bg-sidebar-accent">
        <div className="flex justify-between items-center">
          <div className="text-base font-semibold">Tenant Info</div>
          <div className="flex items-center gap-1 cursor-pointer">
            <div className="text-sm hover:underline">Update</div>
            <ArrowUpRight size={16} />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <div className="w-[178px] h-[188px] bg-black rounded-2xl" />
          <div className="text-center text-xl font-bold">
            {tenant?.name || "N/A"}
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm w-full">
          <CustomCardItem
            icon={<Mail size={16} />}
            label="Email"
            value={tenant?.email || "N/A"}
          />
          <CustomCardItem
            icon={<Phone size={16} />}
            label="Phone"
            value={tenant?.phone || "N/A"}
          />
          <CustomCardItem
            icon={<MapPin size={16} />}
            label="Street"
            value={tenant?.address?.street || "N/A"}
          />
          <CustomCardItem
            icon={<Map size={16} />}
            label="City"
            value={tenant?.address?.city || "N/A"}
          />
          <CustomCardItem
            icon={<Globe size={16} />}
            label="Country"
            value={tenant?.address?.country || "N/A"}
          />
          <CustomCardItem
            icon={<MailCheck size={16} />}
            label="Postal Code"
            value={tenant?.address?.postalCode || "N/A"}
          />
          <CustomCardItem
            icon={<BadgeCheck size={16} />}
            label="Status"
            value={
              <>
                <span
                  className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium ${
                    statusStyles[tenant?.status]?.color ||
                    statusStyles.default.color
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      statusStyles[tenant?.status]?.dot ||
                      statusStyles.default.dot
                    }`}
                  />
                  {tenant?.status || "N/A"}
                </span>
              </>
            }
          />
          <CustomCardItem
            icon={<ClockArrowDown size={16} />}
            label="Created At"
            value={formatDate(tenant?.createdAt)}
          />
          <CustomCardItem
            icon={<SquarePen size={16} />}
            label="Updated At"
            value={formatDate(tenant?.updatedAt)}
          />
        </div>
      </div>
    </>
  );
};

export default TenantInfoCard;
