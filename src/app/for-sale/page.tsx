import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "For Sale",
};

// Mock data for refurbished eScooters
const refurbishedScooters = [
    {
        id: 1,
        brand: "Xiaomi",
        model: "Mi Electric Scooter Pro 2",
        price: 450,
        originalPrice: 599,
        condition: "Excellent",
        modifications: ["Upgraded brake pads", "LED strip lighting"],
        description: "Fully serviced with new battery. Range tested at 45km.",
        image: "/placeholder-scooter.jpg"
    },
    {
        id: 2,
        brand: "Segway",
        model: "Ninebot Max G30",
        price: 650,
        originalPrice: 899,
        condition: "Very Good",
        modifications: ["Performance tune", "Puncture-resistant tires"],
        description: "Recently refurbished motor and controller. Excellent range.",
        image: "/placeholder-scooter.jpg"
    },
    {
        id: 3,
        brand: "Razor",
        model: "E Prime III",
        price: 280,
        originalPrice: 399,
        condition: "Good",
        modifications: ["New deck grip", "Upgraded handlebars"],
        description: "Perfect for commuting. Battery recently replaced.",
        image: "/placeholder-scooter.jpg"
    },
    {
        id: 4,
        brand: "Kaabo",
        model: "Mantis 8",
        price: 1200,
        originalPrice: 1599,
        condition: "Excellent",
        modifications: ["Dual motor tune", "Suspension upgrade", "Custom paint"],
        description: "High-performance scooter with our custom modifications.",
        image: "/placeholder-scooter.jpg"
    },
    {
        id: 5,
        brand: "Pure",
        model: "Air Pro",
        price: 320,
        originalPrice: 449,
        condition: "Very Good",
        modifications: ["Extended range battery"],
        description: "Lightweight and portable. Great for city commuting.",
        image: "/placeholder-scooter.jpg"
    },
    {
        id: 6,
        brand: "Dualtron",
        model: "Mini",
        price: 800,
        originalPrice: 1199,
        condition: "Excellent",
        modifications: ["Performance controller", "Custom throttle"],
        description: "Compact but powerful. Fully refurbished by our technicians.",
        image: "/placeholder-scooter.jpg"
    }
];

export default function ForSalePage() {
    return (
        <div className="container mx-auto py-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Refurbished eScooters For Sale</h1>
                <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
                    Quality refurbished eScooters that have been fully checked and serviced by our expert technicians.
                    You can trust that these second hand scooters are in great condition. Many feature our custom 
                    modifications that improve on the manufacturer&apos;s original implementations.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {refurbishedScooters.map((scooter) => (
                    <Card key={scooter.id} className="overflow-hidden">
                        <div className="aspect-video bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground">Photo Coming Soon</span>
                        </div>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-start">
                                <span>{scooter.brand} {scooter.model}</span>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-green-600">${scooter.price}</div>
                                    <div className="text-sm text-muted-foreground line-through">
                                        ${scooter.originalPrice}
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Condition:</span>
                                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                                    {scooter.condition}
                                </span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{scooter.description}</p>
                            
                            {scooter.modifications.length > 0 && (
                                <div>
                                    <span className="text-sm font-medium">Our Modifications:</span>
                                    <ul className="text-sm text-muted-foreground mt-1">
                                        {scooter.modifications.map((mod, index) => (
                                            <li key={index} className="flex items-center">
                                                <span className="w-1 h-1 bg-current rounded-full mr-2"></span>
                                                {mod}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            <div className="pt-2">
                                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    Contact About This Scooter
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Quality Guarantee</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            All our refurbished eScooters come with a 30-day warranty and have been thoroughly 
                            tested by our certified technicians. Each scooter includes a detailed service report 
                            and any modifications are clearly documented.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
