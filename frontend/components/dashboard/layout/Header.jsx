// "use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
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
        <div>Left side (Global search here)</div>
      </div>
      <div>Right side</div>
    </div>
  );
};

export default Header;
