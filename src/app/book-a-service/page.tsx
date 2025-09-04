import { Metadata } from "next";
import { BookingForm } from "@/components/booking/booking-form";

export const metadata: Metadata = {
    title: "Book a Service",
};

interface BookAServicePageProps {
    searchParams: Promise<{ step?: string }>;
}

export default async function BookAServicePage({ searchParams }: BookAServicePageProps) {
    const params = await searchParams;
    const initialStep = params.step ? parseInt(params.step, 10) : 1;
    const validStep = isNaN(initialStep) || initialStep < 1 || initialStep > 8 ? 1 : initialStep;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black">
            <div className="container mx-auto py-10">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-white">Book a Service</h1>
                    <p className="text-lg text-gray-300">
                        This is the core service of the frontend site. It will be a booking form where users fill in information about their scooter location and requirements. The form will be split into 6 different sections/pages.
                    </p>
                </div>
                <BookingForm initialStep={validStep} />
            </div>
        </div>
    );
}
