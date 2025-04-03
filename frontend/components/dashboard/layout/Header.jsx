"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const currentPage = pathname.split("/").at(-1);
  const currentPageCapitalize =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div className="flex justify-between w-full px-4 py-2 border-b border-dashed items-center">
      <div className="flex gap-1 items-center">
        <SidebarTrigger className="size-10" />
        <div className="font-bold text-2xl">{currentPageCapitalize}</div>
      </div>
      <div>Right</div>
    </div>
  );
};

export default Header;
