import { Metadata } from "next";
import { BookingForm } from "@/components/booking/booking-form";

export const metadata: Metadata = {
    title: "Book a Service",
};

export default function BookAServicePage() {
    return <BookingForm />;
}
