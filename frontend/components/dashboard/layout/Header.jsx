// "use client";
import Link from "next/link"
import {Settings, Bell, CircleUserRound } from 'lucide-react'
import { SidebarTrigger } from "@/components/ui/sidebar";
import  SearchInput from "@/components/ui/searchInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const maintainanceReqs = [{
  image: "https://github.com/shadcn.png",
  name: "Nebiyu",
  requestDescription:"Requested Maintenance",
  time:"1min ago"
},
{ image: "https://github.com/shadcn.png",
  name: "Nati",
  requestDescription:"Requested Maintenance",
  time:"1min ago"
},
{ image: "https://github.com/shadcn.png",
  name: "Melat",
  requestDescription:"Requested Maintenance",
  time:"1min ago"
}
]


// import { usePathname } from "next/navigation";

const Header = () => {
  // const pathname = usePathname();

  // const currentPage = pathname.split("/").at(-1);
  // const currentPageCapitalize =
  //   currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div className="sticky top-0 z-50 flex justify-between w-full px-4 py-2 border-b border-dashed items-center backdrop-blur-md bg-background/60">
      <div className="flex gap-2 items-center">
        <SidebarTrigger className="size-9 shadow-none" />
        <div><SearchInput /></div>
      </div>
      <div className="flex items-center gap-4">
        {/* profile */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />{/* From the backend */}
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-xs">
        <DropdownMenuLabel>Ab Marshal</DropdownMenuLabel>{/* From the backend */}
        <DropdownMenuLabel className="text-xs font-light -mt-3">Abmarshal@gmial.com</DropdownMenuLabel>{/* From the backend */}
        <DropdownMenuSeparator />
        <DropdownMenuItem><CircleUserRound size={16} /> <Link href="#">Edit profile</Link></DropdownMenuItem>
        <DropdownMenuItem><Settings size={16} /> <Link href="#">Account settings</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    {/* Notification */}
    <DropdownMenu>
        <DropdownMenuTrigger>
        <Bell size={25} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {maintainanceReqs.map(mreq=>(
            <DropdownMenuItem className="w-xs flex items-center mt-5">
           <Link href="#" className="flex gap-3 items-center">
            <Avatar>
            <AvatarImage src={mreq.image} />{/* From the backend */}
            <AvatarFallback>CN</AvatarFallback>
            </Avatar> 
            <div className="">
           <div> {mreq.name} <span>{mreq.requestDescription}</span></div> 
           <div className="font-light">{mreq.time}</div>
            </div>
           </Link> 
        </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
