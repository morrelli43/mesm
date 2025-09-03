"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Zap, Battery, Weight } from "lucide-react";
import { Scooter } from "@/types/api";

interface ScooterCardProps {
  scooter: Scooter;
  onReadMore: (scooterId: string) => void;
}

export function ScooterCard({ scooter, onReadMore }: ScooterCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === scooter.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? scooter.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(price);
  };

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden">
      {/* Image Carousel */}
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={scooter.images[currentImageIndex] || scooter.imageUrl || '/placeholder-scooter.jpg'}
          alt={`${scooter.brand} ${scooter.model}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Carousel Controls */}
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
            
            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {scooter.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Stock Status Badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              scooter.inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {scooter.inStock ? 'In Stock' : 'Sold'}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <CardContent className="p-4">
        {/* Scooter Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {scooter.brand} {scooter.model}
        </h3>
        
        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xs text-gray-500">Top Speed</div>
            <div className="text-sm font-medium">{scooter.specs.topSpeed}</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Battery className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-xs text-gray-500">Range</div>
            <div className="text-sm font-medium">{scooter.specs.range}</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Weight className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-xs text-gray-500">Weight</div>
            <div className="text-sm font-medium">{scooter.specs.weight}</div>
          </div>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(scooter.price)}
            </div>
            {scooter.originalPrice > scooter.price && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(scooter.originalPrice)}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Condition</div>
            <div className="text-sm font-medium capitalize">{scooter.condition}</div>
          </div>
        </div>
      </CardContent>
      
      {/* Footer */}
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onReadMore(scooter.id)}
          className="w-full"
          disabled={!scooter.inStock}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}