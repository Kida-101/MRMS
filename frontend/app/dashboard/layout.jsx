import AuthGuard from "@/components/auth/AuthGuard";
import { AppSidebar } from "../../components/dashboard/layout/AppSidebar";
import { Separator } from "../../components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <AuthGuard>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          {children}
        </SidebarProvider>
      </AuthGuard>
    </>
  );
};

export default Layout;
