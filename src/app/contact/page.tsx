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

export default function ContactPage() {
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    Opening Hours
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-medium">Monday - Friday:</span>
                                    <span>9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Saturday:</span>
                                    <span>9:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Sunday:</span>
                                    <span className="text-red-600">Closed</span>
                                </div>
                                <div className="pt-2 border-t">
                                    <p className="text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4 inline mr-1" />
                                        <strong>Holiday Notice:</strong> We are closed on public holidays. 
                                        Please check our social media for any special holiday hours or closures.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Location & Contact
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="font-medium">Melbourne eScooter Mechanics</p>
                                    <p className="text-muted-foreground">
                                        123 Collins Street<br />
                                        Melbourne VIC 3000<br />
                                        Australia
                                    </p>
                                </div>
                                
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        <a href="tel:+61312345678" className="hover:underline">
                                            +61 3 1234 5678
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        <a href="mailto:contact@melbourneescootermechanics.com.au" className="hover:underline">
                                            contact@melbourneescootermechanics.com.au
                                        </a>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <h4 className="font-medium mb-2">Follow Us</h4>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <a href="https://facebook.com/melbourneescootermechanics" target="_blank" rel="noopener noreferrer">
                                                <Facebook className="h-4 w-4 mr-1" />
                                                Facebook
                                                <ExternalLink className="h-3 w-3 ml-1" />
                                            </a>
                                        </Button>
                                        <Button variant="outline" size="sm" asChild>
                                            <a href="https://instagram.com/melbourneescootermechanics" target="_blank" rel="noopener noreferrer">
                                                <Instagram className="h-4 w-4 mr-1" />
                                                Instagram
                                                <ExternalLink className="h-3 w-3 ml-1" />
                                            </a>
                                        </Button>
                                        <Button variant="outline" size="sm" asChild>
                                            <a href="https://twitter.com/melbourneescootermechanics" target="_blank" rel="noopener noreferrer">
                                                <Twitter className="h-4 w-4 mr-1" />
                                                Twitter
                                                <ExternalLink className="h-3 w-3 ml-1" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Please do not use this form for booking enquiries. 
                                Use our <a href="/book-a-service" className="text-primary hover:underline">booking page</a> instead.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="contact-name">Name</Label>
                                    <Input type="text" id="contact-name" placeholder="Your name" required />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="contact-email">Email</Label>
                                    <Input type="email" id="contact-email" placeholder="your.email@example.com" required />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="contact-phone">Phone (Optional)</Label>
                                    <Input type="tel" id="contact-phone" placeholder="+61 xxx xxx xxx" />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="contact-subject">Subject</Label>
                                    <Input type="text" id="contact-subject" placeholder="How can we help you?" required />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="contact-message">Message</Label>
                                    <Textarea 
                                        placeholder="Tell us about your enquiry..." 
                                        id="contact-message" 
                                        className="min-h-[120px]"
                                        required 
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Information */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Important Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium mb-2">Emergency Repairs</h4>
                                <p className="text-sm text-muted-foreground">
                                    For urgent repair needs outside business hours, please call our emergency line. 
                                    Additional charges may apply for after-hours service.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Mobile Service Area</h4>
                                <p className="text-sm text-muted-foreground">
                                    Our mobile repair service covers most of Melbourne. 
                                    Contact us to check if we service your area (weather permitting).
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Warranty Inquiries</h4>
                                <p className="text-sm text-muted-foreground">
                                    For warranty claims or questions about previous repairs, 
                                    please have your service receipt ready when contacting us.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Parts & Accessories</h4>
                                <p className="text-sm text-muted-foreground">
                                    We stock genuine parts for most eScooter brands. 
                                    Call ahead to check availability for specific parts.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
