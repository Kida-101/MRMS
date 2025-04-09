import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-full">
      <Link href="/dashboard/tenants/new">
        <Button>Add Tenant</Button>
      </Link>
    </div>
  );
};

export default page;
