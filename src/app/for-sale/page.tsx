"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ScooterCard } from "@/components/scooter-card";
import { Scooter } from "@/types/api";

// Note: This would be better as a server component, but for now making it client-side
// to handle the read more functionality easily
export default function ForSalePage() {
    const router = useRouter();
    const [scooters, setScooters] = useState<Scooter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchScooters();
    }, []);

    const fetchScooters = async () => {
        try {
            const response = await fetch('/api/scooters?inStock=true');
            if (!response.ok) {
                throw new Error('Failed to fetch scooters');
            }
            const data = await response.json();
            setScooters(data);
        } catch (error) {
            console.error('Error fetching scooters:', error);
            setError('Failed to load scooters');
        } finally {
            setLoading(false);
        }
    };

    const handleReadMore = (scooterId: string) => {
        // Navigate to product details page
        router.push(`/for-sale/${scooterId}`);
    };

    if (loading) {
        return (
            <div className="container mx-auto py-10">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">For Sale</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        This will list eScooters that have been refurbished by our technicians. You can trust that these second hand scooters have been fully checked and are in great condition. Some scooters will even have modifications added to them, we believe improve from the manufacturers implementations.
                    </p>
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <span className="ml-2">Loading scooters...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-10">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">For Sale</h1>
                    <p className="text-lg text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">For Sale</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    This will list eScooters that have been refurbished by our technicians. You can trust that these second hand scooters have been fully checked and are in great condition. Some scooters will even have modifications added to them, we believe improve from the manufacturers implementations.
                </p>
            </div>

            {scooters.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600">No scooters currently available for sale.</p>
                    <p className="text-sm text-gray-500 mt-2">Check back soon for new refurbished scooters!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {scooters.map((scooter) => (
                        <ScooterCard
                            key={scooter.id}
                            scooter={scooter}
                            onReadMore={handleReadMore}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
