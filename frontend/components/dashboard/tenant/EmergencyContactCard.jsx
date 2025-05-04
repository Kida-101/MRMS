import CustomCardItem from "@/components/ui/CustomCardItem";
import { Separator } from "@/components/ui/separator";
import {
  Globe,
  Mail,
  MailCheck,
  Map,
  MapPin,
  Phone,
  UserRound,
  UsersRound,
} from "lucide-react";

const EmergencyContactCard = ({ emergencyContact }) => {
  return (
    <>
      {/*Emergency Contact Info */}
      <div className="border border-dashed rounded-2xl p-4 flex flex-col gap-5 lg:col-span-2 shadow-sm">
        <div className="text-base font-semibold">Emergency Contact Info</div>
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-8">
          <div className="flex flex-col gap-3 text-sm w-full">
            <CustomCardItem
              icon={<UserRound size={16} />}
              label="Name"
              value={emergencyContact?.name || "N/A"}
            />
            <CustomCardItem
              icon={<Mail size={16} />}
              label="Email"
              value={emergencyContact?.email || "N/A"}
            />
            <CustomCardItem
              icon={<Phone size={16} />}
              label="Phone"
              value={emergencyContact?.phone || "N/A"}
            />
            <CustomCardItem
              icon={<UsersRound size={16} />}
              label="Relationship"
              value={emergencyContact?.relationship || "N/A"}
            />
          </div>

          <Separator orientation="vertical" className="lg:block hidden" />

          <div className="flex flex-col gap-3 text-sm w-full">
            <CustomCardItem
              icon={<MapPin size={16} />}
              label="Street"
              value={emergencyContact?.address?.street || "N/A"}
            />
            <CustomCardItem
              icon={<Map size={16} />}
              label="City"
              value={emergencyContact?.address?.city || "N/A"}
            />
            <CustomCardItem
              icon={<Globe size={16} />}
              label="Country"
              value={emergencyContact?.address?.country || "N/A"}
            />
            <CustomCardItem
              icon={<MailCheck size={16} />}
              label="Postal Code"
              value={emergencyContact?.address?.postalCode || "N/A"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmergencyContactCard;
