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
        href="/admin/details"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname?.startsWith("/admin/details")
            ? "bg-muted hover:bg-muted"
            : "hover:bg-transparent hover:underline",
          "justify-start"
        )}
      >
        Your Details
      </Link>
      <Link
        href="/admin/scooters"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname?.startsWith("/admin/scooters")
            ? "bg-muted hover:bg-muted"
            : "hover:bg-transparent hover:underline",
          "justify-start"
        )}
      >
        Your eScooters
      </Link>
      <Link
        href="/admin/appointments"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname?.startsWith("/admin/appointments")
            ? "bg-muted hover:bg-muted"
            : "hover:bg-transparent hover:underline",
          "justify-start"
        )}
      >
        Appointments
      </Link>
      <Link
        href="/admin/contact"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname?.startsWith("/admin/contact")
            ? "bg-muted hover:bg-muted"
            : "hover:bg-transparent hover:underline",
          "justify-start"
        )}
      >
        Contact Us
      </Link>
    </nav>
  );
}
