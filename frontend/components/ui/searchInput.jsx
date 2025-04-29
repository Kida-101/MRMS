import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
export default function SearchInput() {
  return (
    <div className="flex items-center rounded-md border border-muted shadow-xs">
      <Search className="text-muted-foreground ml-2" />
      <Input
        className="border-none shadow-none focus-visible:border-none focus-visible:ring-0 dark:bg-transparent"
        placeholder="Search"
      />
    </div>
  );
}
