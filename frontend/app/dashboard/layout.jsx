import { AppSidebar } from "../../components/dashboard/layout/AppSidebar";
import { Separator } from "../../components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  );
};

export default Layout;
