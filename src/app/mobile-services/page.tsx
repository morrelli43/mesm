import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Mobile Services",
};

export default function MobileServicesPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8">Mobile Services</h1>
            
            {/* Overview Section */}
            <section className="mb-12">
                <p className="text-lg text-muted-foreground mb-8">
                    We bring our expert eScooter repair services directly to you! Our mobile service covers the Melbourne metropolitan area, providing convenient on-site repairs and maintenance for your electric scooter.
                </p>
            </section>

            {/* Service Areas Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Service Areas</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Inner Melbourne</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                CBD, Southbank, Docklands, Carlton, Fitzroy, Richmond, South Yarra, Prahran
                            </p>
                            <p className="font-semibold text-green-600">Standard Service Area</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Middle Ring Suburbs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Brunswick, Thornbury, Hawthorn, Camberwell, Caulfield, St Kilda, Port Melbourne
                            </p>
                            <p className="font-semibold text-blue-600">Extended Service Area</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Outer Suburbs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Footscray, Preston, Box Hill, Glen Waverley, Moorabbin, Brighton
                            </p>
                            <p className="font-semibold text-orange-600">Premium Service Area</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Callout Charges Section */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Callout Charges</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-green-600">Standard Areas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold mb-2">$25</div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Inner Melbourne suburbs within 10km of CBD
                            </p>
                            <ul className="text-sm space-y-1">
                                <li>• Free quotes included</li>
                                <li>• Same day service available</li>
                                <li>• No additional travel time</li>
                            </ul>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-600">Extended Areas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold mb-2">$40</div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Middle ring suburbs 10-20km from CBD
                            </p>
                            <ul className="text-sm space-y-1">
                                <li>• Free quotes included</li>
                                <li>• Next day service available</li>
                                <li>• Slightly longer travel time</li>
                            </ul>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-orange-600">Premium Areas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold mb-2">$60</div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Outer suburbs beyond 20km from CBD
                            </p>
                            <ul className="text-sm space-y-1">
                                <li>• Free quotes included</li>
                                <li>• Scheduled service times</li>
                                <li>• Extended travel required</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Additional Information */}
            <section className="mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Important Service Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold mb-2">Service Conditions</h4>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                    <li>• Weather permitting (indoor repairs preferred)</li>
                                    <li>• Callout charge waived if repair is completed</li>
                                    <li>• Minimum 2-hour booking window</li>
                                    <li>• Power outlet access required for some repairs</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">What We Bring</h4>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                    <li>• Complete mobile workshop setup</li>
                                    <li>• Diagnostic equipment and tools</li>
                                    <li>• Common replacement parts</li>
                                    <li>• All safety equipment</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
