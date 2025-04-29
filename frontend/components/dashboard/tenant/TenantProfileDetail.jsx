import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TenantProfileDetail = ({ open, onOpenChange, tenant }) => {
  console.log(tenant);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tenant Profile</DialogTitle>
          <DialogDescription>Tenant Detail Here</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TenantProfileDetail;
