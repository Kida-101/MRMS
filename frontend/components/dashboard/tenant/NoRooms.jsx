import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import Link from "next/link";

const NoRooms = () => {
  return (
    <div className="border border-dashed rounded-md px-6 py-12 flex flex-col gap-6 items-center text-cent">
      <SquarePlus className="text-primary/50 size-8" />
      <div className="text-center flex flex-col gap-1">
        <div className="font-bold text-2xl">No Vacant Rooms Available</div>
        <p className="md:w-xl">
          Please add a vacant room first before proceeding with tenant
          registration.
        </p>
      </div>
      <Link href="/dashboard/rooms">
        <Button>Add Room</Button>
      </Link>
    </div>
  );
};

export default NoRooms;
