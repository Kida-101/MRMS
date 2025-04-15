"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import { AppSidebar } from "../../components/dashboard/layout/AppSidebar";
import { SidebarProvider } from "../../components/ui/sidebar";
import Header from "../../components/dashboard/layout/Header";
import Loading from "@/components/ui/Loading";
import useUser from "@/hooks/useUser";

const Layout = ({ children }) => {
  const { isLoading } = useUser();

  if (isLoading) return <Loading />;

  return (
    <>
      <AuthGuard>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full flex flex-col h-screen relative z-0 overflow-y-auto">
            <Header />
            <div className="px-4 pt-4 flex-1">{children}</div>
          </main>
        </SidebarProvider>
      </AuthGuard>
    </>
  );
};

export default Layout;
