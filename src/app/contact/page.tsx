import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg">
                This page will give an overview of the opening times of the shop.
                Contact information. The location of the store and holiday beaks.
                There will also be links to the social media pages. If customer want
                to contact the store there will be a simple contact form or they can
                send an email be clicking a link.
            </p>
        </div>
    );
}
