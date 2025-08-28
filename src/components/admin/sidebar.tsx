import { cn } from "@/lib/utils";
import { MainNav } from "@/components/admin/main-nav";

export function Sidebar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "hidden h-full border-r bg-background/95 pt-16 lg:block",
        className
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Overview
          </h2>
          <div className="space-y-1">
            <MainNav />
          </div>
        </div>
      </div>
    </div>
  );
}
