import { Metadata } from "next";

export const metadata: Metadata = {
    title: "For Sale",
};

export default function ForSalePage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">For Sale</h1>
            <p className="text-lg">
                This will list eScooters that have been refurbished by our technicians.
                You can trust that these second hand scooters have been fully checked
                and are in great condition. Some scooters will even have modifications
                added to them, we believe improve from the manufacturers
                implementations.
            </p>
        </div>
    );
}
