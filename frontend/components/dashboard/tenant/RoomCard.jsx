import CustomCardItem from "@/components/ui/CustomCardItem";
import { ArrowUpRight, Hash, Ruler, Tag, Type } from "lucide-react";

const RoomCard = ({ room }) => {
  console.log(room);
  return (
    <>
      {/*Room Info */}
      <div className="border border-dashed rounded-2xl p-4 flex flex-col gap-5 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="text-base font-semibold">Room Info</div>
          <div className="flex items-center gap-1 cursor-pointer">
            <div className="text-sm hover:underline">Detail</div>
            <ArrowUpRight size={16} />
          </div>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <CustomCardItem
            icon={<Hash size={16} />}
            label="Room Number"
            value={room?.roomNumber || "N/A"}
          />
          <CustomCardItem
            icon={<Type size={16} />}
            label="Room Type"
            value={room?.type || "N/A"}
          />
          <CustomCardItem
            icon={<Ruler size={16} />}
            label="Room Size"
            value={`${room?.size} sq m` || "N/A"}
          />
          <CustomCardItem
            icon={<Tag size={16} />}
            label="Room Price"
            value={`${room?.price} ETB` || "N/A"}
          />
        </div>
      </div>
    </>
  );
};

export default RoomCard;
