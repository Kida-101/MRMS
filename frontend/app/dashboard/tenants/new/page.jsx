import TenantRegistration from "@/components/dashboard/tenant/forms/TenantRegistration";
import MoveBack from "@/components/ui/MoveBack";

const page = () => {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="font-bold text-3xl mt-4">Register</div>

      <div className="flex flex-col gap-4">
        <div>
          <MoveBack text="Back" />
        </div>
        <TenantRegistration />
      </div>
    </div>
  );
};

export default page;
