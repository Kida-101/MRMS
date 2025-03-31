<<<<<<< HEAD
import AuthGuard from '@/components/auth/AuthGuard';

const Layout = ({ children }) => {
=======
import { AppSidebar } from "../../components/dashboard/layout/AppSidebar";
import { Separator } from "../../components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
>>>>>>> 13ca914eb93f2b7546f3ba2ee25139abe982b14d

const Layout = ({ children }) => {
  return (
<<<<<<< HEAD
    <>
      <AuthGuard>
        {children}
      </AuthGuard>
    </>
=======
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
>>>>>>> 13ca914eb93f2b7546f3ba2ee25139abe982b14d
  );
};

export default Layout;
