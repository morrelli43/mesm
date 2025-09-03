"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";

export function Navigation() {
  const { data: session } = useSession();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Melbourne eScooter Mechanics</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/about"
        >
          About Us
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/for-sale"
        >
          Refurbs for Sale
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/mobile-services"
        >
          Mobile Repairs
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/services"
        >
          Services
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/contact"
        >
          Contact Us
        </Link>
        {session ? (
          <Button asChild>
            <Link href="/admin">
              Dashboard
            </Link>
          </Button>
        ) : (
          <>
            <Button asChild variant="outline">
              <Link href="/login">
                Login
              </Link>
            </Button>
            <Button asChild>
              <Link href="/book-a-service">
                Book a Service
              </Link>
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
