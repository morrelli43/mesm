"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scooter } from "@/types/api";
import { 
  ShoppingCart, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronLeft, 
  ChevronRight,
  Star,
  Shield,
  Zap,
  Battery,
  Gauge,
  Weight,
  Mountain
} from "lucide-react";

export default function ProductDetailsPage() {
  const params = useParams();
  const [scooter, setScooter] = useState<Scooter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchScooter(params.id as string);
    }
  }, [params.id]);

  const fetchScooter = async (id: string) => {
    try {
      const response = await fetch(`/api/scooters/${id}`);
      if (!response.ok) {
        throw new Error('Scooter not found');
      }
      const data = await response.json();
      setScooter(data);
    } catch (error) {
      console.error('Error fetching scooter:', error);
      setError('Failed to load scooter details');
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (scooter && scooter.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === scooter.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (scooter && scooter.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? scooter.images.length - 1 : prev - 1
      );
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(price);
  };

  const handleContactUs = () => {
    // Navigate to contact page with pre-filled subject
    window.location.href = `/contact?subject=Viewing%20Request%20for%20${scooter?.brand}%20${scooter?.model}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading scooter details...</span>
        </div>
      </div>
    );
  }

  if (error || !scooter) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Scooter Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The requested scooter could not be found.'}</p>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Get 3 top features as USPs
  const topFeatures = scooter.features.slice(0, 3);

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Back Button */}
      <Button 
        variant="outline" 
        onClick={() => window.history.back()}
        className="mb-6"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to For Sale
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={scooter.images[currentImageIndex] || scooter.imageUrl || '/placeholder-scooter.jpg'}
              alt={`${scooter.brand} ${scooter.model}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Image Carousel Controls */}
            {scooter.images.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Stock Status Badge */}
            <div className="absolute top-4 right-4">
              <Badge variant={scooter.inStock ? "default" : "destructive"}>
                {scooter.inStock ? 'In Stock' : 'Sold'}
              </Badge>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {scooter.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {scooter.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square bg-gray-100 rounded-md overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${scooter.brand} ${scooter.model} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          {/* Name and Manufacturer */}
          <div>
            <p className="text-lg text-gray-600 mb-2">by {scooter.brand}</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {scooter.model}
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{scooter.year}</Badge>
              <Badge variant="outline" className="capitalize">{scooter.condition}</Badge>
            </div>
          </div>

          {/* Buy Now / Contact Section */}
          <Card>
            <CardContent className="p-6">
              {scooter.inStock ? (
                <Button 
                  size="lg" 
                  className="w-full mb-4"
                  onClick={handleContactUs}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Contact Us to Purchase
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="w-full mb-4"
                  disabled
                >
                  Currently Sold
                </Button>
              )}
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">or</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleContactUs}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Us to Arrange a Viewing
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">RRP</p>
                <p className="text-lg text-gray-500 line-through mb-2">
                  {formatPrice(scooter.originalPrice)}
                </p>
                <p className="text-sm text-gray-600 mb-1">Our Price</p>
                <p className="text-3xl font-bold text-green-600 mb-2">
                  {formatPrice(scooter.price)}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  Save {formatPrice(scooter.originalPrice - scooter.price)}!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 3 Key USPs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Features</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-3">
                {topFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Description of Modifications */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">What We&apos;ve Done</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <p className="text-gray-700 leading-relaxed">
              {scooter.description}
            </p>
            
            {scooter.features.length > 3 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Additional Features:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {scooter.features.slice(3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Specifications Chart */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Specifications</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-medium text-gray-900 flex items-center">
                      <Weight className="w-4 h-4 mr-2 text-gray-600" />
                      eScooter Weight
                    </td>
                    <td className="py-3 text-gray-700">{scooter.specs.weight}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-medium text-gray-900 flex items-center">
                      <Gauge className="w-4 h-4 mr-2 text-gray-600" />
                      Max Speed
                    </td>
                    <td className="py-3 text-gray-700">{scooter.specs.topSpeed}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-medium text-gray-900 flex items-center">
                      <Battery className="w-4 h-4 mr-2 text-gray-600" />
                      Max Range
                    </td>
                    <td className="py-3 text-gray-700">{scooter.specs.range}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-medium text-gray-900 flex items-center">
                      <Mountain className="w-4 h-4 mr-2 text-gray-600" />
                      Condition
                    </td>
                    <td className="py-3 text-gray-700 capitalize">{scooter.condition}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pr-4 font-medium text-gray-900 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-gray-600" />
                      Mileage
                    </td>
                    <td className="py-3 text-gray-700">{scooter.mileage} km</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-gray-900 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-gray-600" />
                      Warranty
                    </td>
                    <td className="py-3 text-gray-700">{scooter.warranty}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Need More Information?</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4" onClick={handleContactUs}>
                <div className="text-center">
                  <MessageCircle className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Contact Form</div>
                  <div className="text-xs text-gray-600">Send us a message</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4" asChild>
                <a href="tel:+61-XXX-XXX-XXX">
                  <div className="text-center">
                    <Phone className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Call Now</div>
                    <div className="text-xs text-gray-600">Speak with our team</div>
                  </div>
                </a>
              </Button>
              
              <Button variant="outline" className="h-auto p-4" asChild>
                <a href="mailto:info@melbourneescootermechanics.com">
                  <div className="text-center">
                    <Mail className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Email Us</div>
                    <div className="text-xs text-gray-600">Get detailed info</div>
                  </div>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}