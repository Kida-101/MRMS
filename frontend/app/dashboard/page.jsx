
import PaymentInformation from "@/components/dashboard/analytics/payment/page"
import Maintenance from "@/components/dashboard/analytics/maintenance/page";
import TotalIncome from "@/components/dashboard/analytics/total income/page";
import LeaseConversion from "@/components/dashboard/analytics/Lease success rate/page";
import VacantRoom from "@/components/dashboard/analytics/vacancy rate/page";
import Revenue from "@/components/dashboard/analytics/Revenue/page";
import NumberOfTenant from "@/components/dashboard/analytics/number of tenant/page";
import VacantVsOccupied from "@/components/dashboard/analytics/vacant vs occupied/page";
import NewTenants from "@/components/dashboard/analytics/number of new tenant/page";
import PendingPayment from "@/components/dashboard/analytics/payment/page";
import RoomPieChart  from "@/components/dashboard/analytics/rooms/test";

const page = () => {
  return (
    
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/80"><TotalIncome /></div>
        <div className="aspect-video rounded-xl bg-muted/80"><LeaseConversion /></div>
        <div className="aspect-video rounded-xl bg-muted/80"><VacantRoom /></div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/80"><PaymentInformation /></div>
        <div className="aspect-video rounded-xl bg-muted/80"><Revenue /></div>
        <div className="aspect-video rounded-xl bg-muted/80"><NumberOfTenant /></div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/80"><Maintenance /></div>
        <div className="aspect-video rounded-xl bg-muted/80"><VacantVsOccupied /></div>
        <div className="aspect-video rounded-xl bg-muted/80"><NewTenants /></div>

        <div className="aspect-video rounded-xl bg-muted/80"><RoomPieChart  /></div>
        <div className="aspect-video rounded-xl bg-muted/80"><PendingPayment /></div>
        <div className="aspect-video rounded-xl bg-muted/80"></div>

      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/80 md:min-h-min" />
    </div>
  );
};

export default page;
