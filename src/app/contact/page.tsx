import { db } from "@/lib/db";
import { Metadata } from "next";
import { 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Facebook,
  Instagram,
  Twitter,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
    title: "Contact Us - Melbourne eScooter Mechanics",
    description: "Get in touch with Melbourne's premier eScooter repair service. Find our opening hours, location, and contact information.",
};

async function getContactPageContent() {
  const content = await db
    .selectFrom('page_content')
    .where('page', '=', 'contact')
    .selectAll()
    .execute();

  const contentMap = content.reduce((acc, item) => {
    acc[item.section] = item.content;
    return acc;
  }, {} as Record<string, string>);

  return contentMap;
}

export default async function ContactPage() {
    const content = await getContactPageContent();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            <p className="text-lg">
                {content.content}
            </p>
        </div>
    );
}
