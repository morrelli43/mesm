import { Metadata } from "next";

export const metadata: Metadata = {
    title: "For Sale",
};

export default function ForSaleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}