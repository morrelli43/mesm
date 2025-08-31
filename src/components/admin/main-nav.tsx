"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname === "/admin"
            ? "bg-muted hover:bg-muted"
            : "hover:bg-transparent hover:underline",
          "justify-start"
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/admin/jobs"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname?.startsWith("/admin/jobs")
            ? "bg-muted hover:bg-muted"
            : "hover:bg-transparent hover:underline",
          "justify-start"
        )}
      >
        Jobs
      </Link>
      <Link
        href="/admin/technicians"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname?.startsWith("/admin/technicians")
            ? "bg-muted hover:bg-muted"
            : "hover:bg-transparent hover:underline",
          "justify-start"
        )}
      >
        Technicians
      </Link>
    </nav>
  );
}
