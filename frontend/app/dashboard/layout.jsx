import AuthGuard from "@/components/auth/AuthGuard";
import { AppSidebar } from "../../components/dashboard/layout/AppSidebar";
import { SidebarProvider } from "../../components/ui/sidebar";
import Header from "../../components/dashboard/layout/Header";

const Layout = ({ children }) => {
  return (
    <>
      <AuthGuard>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full flex flex-col gap-4">
            <Header />
            <div className="px-4">{children}</div>
          </main>
        </SidebarProvider>
      </AuthGuard>
    </>
  );
};

export default Layout;
