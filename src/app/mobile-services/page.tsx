import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mobile Services",
};

export default function MobileServicesPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">Mobile Services</h1>
            <p className="text-lg">
                They will be an overview of the mobile services, where the service
                areas are, the differences in callout charges.
            </p>
        </div>
    );
}
