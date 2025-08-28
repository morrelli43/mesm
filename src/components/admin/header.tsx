import Link from "next/link";
import { MainNav } from "@/components/admin/main-nav";
import { UserNav } from "@/components/admin/user-nav";
import { MountainIcon } from "lucide-react";

export function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 lg:hidden"
        >
          <MountainIcon className="h-6 w-6" />
          <span className="font-bold">ACME</span>
        </Link>
        <div className="hidden lg:block">
          <MainNav />
        </div>
        <div className="ml-auto">
          <UserNav />
        </div>
      </nav>
    </div>
  );
}
