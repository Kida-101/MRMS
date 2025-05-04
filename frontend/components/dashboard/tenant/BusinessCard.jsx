import CustomCardItem from "@/components/ui/CustomCardItem";
import { BriefcaseBusiness, Mail, Phone, Type } from "lucide-react";

const BusinessCard = ({ businessInfo }) => {
  return (
    <div className="border border-dashed rounded-2xl p-4 flex flex-col gap-5 shadow-sm">
      <div className="text-base font-semibold">Business Info</div>

      <div className="flex flex-col gap-3 text-sm">
        <CustomCardItem
          icon={<BriefcaseBusiness size={16} />}
          label="Business Name"
          value={businessInfo?.businessName || "N/A"}
        />
        <CustomCardItem
          icon={<Type size={16} />}
          label="Business Type"
          value={businessInfo?.businessType || "N/A"}
        />
        <CustomCardItem
          icon={<Phone size={16} />}
          label="Business Phone"
          value={businessInfo?.businessPhone || "N/A"}
        />
        <CustomCardItem
          icon={<Mail size={16} />}
          label="Business Email"
          value={businessInfo?.businessEmail || "N/A"}
        />
      </div>
    </div>
  );
};

export default BusinessCard;
