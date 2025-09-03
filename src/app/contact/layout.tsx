import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - Melbourne eScooter Mechanics",
    description: "Get in touch with Melbourne's premier eScooter repair service. Find our opening hours, location, and contact information.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}