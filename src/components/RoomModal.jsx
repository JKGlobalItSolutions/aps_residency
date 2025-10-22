// src/components/room-modal.jsx

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { Bed, Users, Wifi, Car, Coffee, Tv } from "lucide-react";

const RoomModal = function RoomModal({ room, isOpen, onClose }) {
  const navigate = useNavigate();

  if (!room) return null;

 

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
      case "free wifi":
        return <Wifi className="h-4 w-4" />;
      case "parking":
      case "free parking":
        return <Car className="h-4 w-4" />;
      case "coffee":
      case "coffee maker":
        return <Coffee className="h-4 w-4" />;
      case "tv":
      case "smart tv":
        return <Tv className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{room.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Room Images Carousel */}
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {room.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={`${room.name} - Image ${index + 1}`}
                      className="w-full h-80 object-cover rounded-lg luxury-shadow"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            {/* <Badge className="absolute top-4 right-4 bg-accent-gold text-white z-10">
              ₹{room.price}/night
            </Badge> */}
          </div>

          {/* Room Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{room.bedType}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>
                  {room.capacity} Guest{room.capacity > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="font-semibold mb-3">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Book Button */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                {/* <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-2xl font-bold text-accent-gold">
                    ₹ {room.price}
                    <span className="text-sm text-muted-foreground">/night</span>
                  </p>
                </div> */}
              </div>

              <a
  href="https://sonachala-singlepagebooking-frontend.netlify.app/"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button variant="gold" size="lg" className="w-full">
    Book Now
  </Button>
</a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomModal;
