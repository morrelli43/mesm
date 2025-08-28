import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book a Service",
};

export default function BookAServicePage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">Book a Service</h1>
            <p className="text-lg">
                This is the core service of the frontend site. It will be a booking
                form where users fill in information about their scooter location and
                requirements. The form will be split into 5 different sections/pages.
            </p>
        </div>
    );
}
