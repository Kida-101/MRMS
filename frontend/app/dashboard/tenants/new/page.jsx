import RegistrationForm from "@/components/dashboard/tenant/forms/RegistrationForm";
import MoveBack from "@/components/ui/MoveBack";

const page = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <MoveBack text="Back" />
      </div>
      <RegistrationForm />
    </div>
  );
};

export default page;
