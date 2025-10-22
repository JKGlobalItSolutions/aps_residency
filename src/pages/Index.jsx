// src/pages/index.jsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import RoomModal from "@/components/RoomModal";
import {
  Star,
  Wifi,
  Car,
  Utensils,
  Users,
  Shield,
  Waves,
  Calendar,
} from "lucide-react";
import emailjs from "@emailjs/browser";

// Images

import gallery_img1 from "@/assets/gellary_img1.jpg";
import gallery_img2 from "@/assets/gellary_img2.jpg";
import gallery_img3 from "@/assets/gellary_img3.jpg";
import gallery_img4 from "@/assets/gellary_img4.jpg";
import gallery_img5 from "@/assets/gellary_img5.jpg";
import gallery_img6 from "@/assets/gellary_img6.jpg";
import gallery_img7 from "@/assets/gellary_img7.jpg";
import gallery_img8 from "@/assets/gellary_img8.jpg";

import heroImage from "@/assets/hotel-hero.jpg";
import poolImage from "@/assets/pool.jpg";
import restaurantImage from "@/assets/restaurant.jpg";
import gymImage from "@/assets/gym.jpg";
// import lobbyImage from "@/assets/lobby.jpg";
// import conferenceImage from "@/assets/conference.jpg";

// Room Images
import familyRoom1 from "@/assets/Family Room/DSC08906.jpg";
import familyRoom2 from "@/assets/Family Room/DSC08911.jpg";
import familyRoom3 from "@/assets/Family Room/DSC08920.jpg";
import familyRoom4 from "@/assets/Family Room/DSC08929.jpg";
import familyRoom5 from "@/assets/Family Room/DSC08936.jpg";
import familyRoom6 from "@/assets/Family Room/DSC09215.jpg";

import hillViewSuite1 from "@/assets/Hill View Suite Room With Balcony/DSC08735.jpg";
import hillViewSuite2 from "@/assets/Hill View Suite Room With Balcony/DSC08822.jpg";
import hillViewSuite3 from "@/assets/Hill View Suite Room With Balcony/DSC08823.jpg";
import hillViewSuite4 from "@/assets/Hill View Suite Room With Balcony/DSC08841.jpg";
import hillViewSuite5 from "@/assets/Hill View Suite Room With Balcony/DSC08844.jpg";
import hillViewSuite6 from "@/assets/Hill View Suite Room With Balcony/DSC08890.jpg";
import hillViewSuite7 from "@/assets/Hill View Suite Room With Balcony/DSC09215.jpg";

import premiumHillView1 from "@/assets/Premium Hill View Rooms/DSC09005.jpg";
import premiumHillView2 from "@/assets/Premium Hill View Rooms/DSC09013.jpg";
import premiumHillView3 from "@/assets/Premium Hill View Rooms/DSC09215.jpg";
import premiumHillView4 from "@/assets/Premium Hill View Rooms/IMG_5079.jpg";
import premiumHillView5 from "@/assets/Premium Hill View Rooms/IMG_5085.jpg";
import premiumHillView6 from "@/assets/Premium Hill View Rooms/IMG_5096.jpg";
import premiumHillView7 from "@/assets/Premium Hill View Rooms/IMG_5105.jpg";

import premiumRoom1 from "@/assets/Premium Room/DSC08906.jpg";
import premiumRoom2 from "@/assets/Premium Room/DSC08911.jpg";
import premiumRoom3 from "@/assets/Premium Room/DSC09021.jpg";
import premiumRoom4 from "@/assets/Premium Room/DSC09024.jpg";
import premiumRoom5 from "@/assets/Premium Room/DSC09215.jpg";
import premiumRoom6 from "@/assets/Premium Room/IMG_5132.jpg";

import standardRoom1 from "@/assets/Standard Room/DSC09133.jpg";
import standardRoom2 from "@/assets/Standard Room/DSC09146.jpg";
import standardRoom3 from "@/assets/Standard Room/DSC09152.jpg";
import standardRoom4 from "@/assets/Standard Room/DSC09157.jpg";
import standardRoom5 from "@/assets/Standard Room/DSC09215.jpg";

import suiteBalcony1 from "@/assets/Suite Room With Balcony/DSC08735.jpg";
import suiteBalcony2 from "@/assets/Suite Room With Balcony/DSC09079.jpg";
import suiteBalcony3 from "@/assets/Suite Room With Balcony/DSC09094.jpg";
import suiteBalcony4 from "@/assets/Suite Room With Balcony/DSC09097.jpg";
import suiteBalcony5 from "@/assets/Suite Room With Balcony/DSC09111.jpg";
import suiteBalcony6 from "@/assets/Suite Room With Balcony/DSC09118.jpg";
import suiteBalcony7 from "@/assets/Suite Room With Balcony/DSC09215.jpg";

import terraceHillView1 from "@/assets/Terrace Hill View Room/DSC08716.jpg";
import terraceHillView2 from "@/assets/Terrace Hill View Room/DSC08720.jpg";
import terraceHillView3 from "@/assets/Terrace Hill View Room/DSC08727.jpg";
import terraceHillView4 from "@/assets/Terrace Hill View Room/DSC08737.jpg";
import terraceHillView5 from "@/assets/Terrace Hill View Room/DSC08748.jpg";
import terraceHillView6 from "@/assets/Terrace Hill View Room/DSC08756.jpg";
import terraceHillView7 from "@/assets/Terrace Hill View Room/DSC08770.jpg";
import terraceHillView8 from "@/assets/Terrace Hill View Room/DSC09215.jpg";

const rooms = [
  {
    id: "1",
    name: "Standard Room",
    price: 150,
    images: [standardRoom1, standardRoom2, standardRoom3, standardRoom4, standardRoom5],
    description:
      "Comfortable and well-appointed room featuring modern amenities and city views. Perfect for business travelers and couples seeking quality accommodation at great value.",
    amenities: [
      "Free WiFi",
      "Smart TV",
      "Coffee Maker",
      "Air Conditioning",
      "Mini Fridge",
      "Safe",
    ],
    capacity: 2,
    bedType: "Queen Bed",
  },
  {
    id: "2",
    name: "Premium Room",
    price: 220,
    images: [premiumRoom1, premiumRoom2, premiumRoom3, premiumRoom4, premiumRoom5, premiumRoom6],
    description:
      "Elegant premium room with enhanced furnishings and modern amenities. Features upgraded bedding, work desk, and city views for a comfortable and productive stay.",
    amenities: [
      "Free WiFi",
      "Smart TV",
      "Coffee Maker",
      "Air Conditioning",
      "Mini Bar",
      "Safe",
      "Room Service",
      "Work Desk",
      "Premium Bedding",
    ],
    capacity: 2,
    bedType: "King Bed",
  },
  {
    id: "3",
    name: "Family Room",
    price: 280,
    images: [familyRoom1, familyRoom2, familyRoom3, familyRoom4, familyRoom5, familyRoom6],
    description:
      "Spacious family room designed for comfort and convenience. Features connecting rooms, kid-friendly amenities, and enough space for the whole family to relax.",
    amenities: [
      "Free WiFi",
      "Smart TV",
      "Coffee Maker",
      "Air Conditioning",
      "Mini Bar",
      "Safe",
      "Room Service",
      "Sofa Bed",
      "Kids Amenities",
      "Extra Storage",
    ],
    capacity: 4,
    bedType: "Queen Bed + Sofa Bed",
  },
  {
    id: "4",
    name: "Suite Room with Balcony",
    price: 350,
    images: [suiteBalcony1, suiteBalcony2, suiteBalcony3, suiteBalcony4, suiteBalcony5, suiteBalcony6, suiteBalcony7],
    description:
      "Luxurious suite featuring a private balcony with stunning views. Perfect for guests who want extra space and outdoor relaxation in elegant surroundings.",
    amenities: [
      "Free WiFi",
      "Smart TV",
      "Coffee Maker",
      "Air Conditioning",
      "Mini Bar",
      "Safe",
      "Room Service",
      "Private Balcony",
      "Seating Area",
      "Premium Toiletries",
    ],
    capacity: 3,
    bedType: "King Bed",
  },
  {
    id: "5",
    name: "Premium Hill View Room",
    price: 300,
    images: [premiumHillView1, premiumHillView2, premiumHillView3, premiumHillView4, premiumHillView5, premiumHillView6, premiumHillView7],
    description:
      "Premium room with breathtaking hill views and modern luxury. Wake up to scenic landscapes and enjoy the tranquility of nature from your comfortable accommodation.",
    amenities: [
      "Free WiFi",
      "Smart TV",
      "Coffee Maker",
      "Air Conditioning",
      "Mini Bar",
      "Safe",
      "Room Service",
      "Hill Views",
      "Large Windows",
      "Premium Amenities",
    ],
    capacity: 2,
    bedType: "King Bed",
  },
  {
    id: "6",
    name: "Hill View Suite Room with Balcony",
    price: 450,
    images: [hillViewSuite1, hillViewSuite2, hillViewSuite3, hillViewSuite4, hillViewSuite5, hillViewSuite6, hillViewSuite7],
    description:
      "Exclusive hill view suite with private balcony offering panoramic vistas. Experience luxury living with nature's beauty right at your doorstep in this premium accommodation.",
    amenities: [
      "Free WiFi",
      "Smart TV",
      "Coffee Maker",
      "Air Conditioning",
      "Mini Bar",
      "Safe",
      "Room Service",
      "Private Balcony",
      "Hill Views",
      "Living Area",
      "Premium Furnishings",
      "Butler Service",
    ],
    capacity: 4,
    bedType: "King Bed + Sofa Bed",
  },
  {
    id: "7",
    name: "Terrace Hill View Room",
    price: 380,
    images: [terraceHillView1, terraceHillView2, terraceHillView3, terraceHillView4, terraceHillView5, terraceHillView6, terraceHillView7, terraceHillView8],
    description:
      "Unique terrace room with private outdoor space and magnificent hill views. Perfect for guests seeking a blend of luxury accommodation and nature connection.",
    amenities: [
      "Free WiFi",
      "Smart TV",
      "Coffee Maker",
      "Air Conditioning",
      "Mini Bar",
      "Safe",
      "Room Service",
      "Private Terrace",
      "Hill Views",
      "Outdoor Seating",
      "Premium Bedding",
    ],
    capacity: 3,
    bedType: "King Bed",
  },
];

const amenities = [
  {
    icon: <Car className="h-8 w-8" />,
    title: "Limited Parking",
    description: "Safe and secure parking for guests",
    image: poolImage,
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Friendly Staff",
    description: "Our team is here with warmth and care to make your stay comfortable and enjoyable.",
    image: restaurantImage,
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "24/7 CCTV Security",
    description: "For your peace of mind and safety",
    image: gymImage,
  },
  // {
  //   icon: <Star className="h-8 w-8" />,
  //   title: "Spa & Wellness",
  //   description: "Rejuvenate your body and mind at our luxury spa",
  //   image: spaImage,
  // },
  // {
  //   icon: <Wifi className="h-8 w-8" />,
  //   title: "Free WiFi",
  //   description: "Stay connected with complimentary high-speed internet",
  //   image: lobbyImage,
  // },
  // {
  //   icon: <Calendar className="h-8 w-8" />,
  //   title: "Event Spaces",
  //   description: "Host special events in elegant conference rooms",
  //   image: conferenceImage,
  // },
];

const galleryImages = [
  { src: gallery_img1, alt: "Hotel Exterior" },
  { src: gallery_img2, alt: "Lobby" },
  { src: gallery_img3, alt: "Swimming Pool" },
  { src: gallery_img4, alt: "Restaurant" },
  { src: gallery_img5, alt: "Spa" },
  { src: gallery_img6, alt: "Fitness Center" },
  { src: gallery_img7, alt: "Conference Room" },
  { src: gallery_img8, alt: "Deluxe Room" },
];

const Index = function Index() {
  const { toast } = useToast();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = "YOUR_SERVICE_ID";
      const templateId = "YOUR_CONTACT_TEMPLATE_ID";
      const publicKey = "YOUR_PUBLIC_KEY";

      await emailjs.send(serviceId, templateId, contactForm, publicKey);

      toast({
        title: "Message Sent Successfully!",
        description: "We will get back as soon as possible.",
      });

      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Message Failed",
        description:
          "Please check EmailJS configuration and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-aps" style={{ color: "#D2691E" }}>
  Welcome to <span className="text-accent-gold">APS Residency</span>
</h1>

            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Experience luxury and comfort in the heart of the city.
              Where elegance meets exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="gold"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("rooms")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Rooms
              </Button>
              {/* <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-primary"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact Us
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">About APS Residency</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Located in the prestigious downtown district, APS Residency
              offers an unparalleled hospitality experience. Commitment to
              excellence is reflected in every detail, from elegantly appointed
              rooms to world-class amenities and personalized service.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-gold mb-2">
                  20+
                </div>
                <div className="text-muted-foreground">Luxurious Rooms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-gold mb-2">
                  24/7
                </div>
                <div className="text-muted-foreground">Concierge Service</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-gold mb-2">
                  5★
                </div>
                <div className="text-muted-foreground">Guest Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Rooms</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from carefully designed accommodations, each offering unique
              comfort and style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {rooms.map((room) => (
              <Card
                key={room.id}
                className="overflow-hidden hover:luxury-shadow transition-all duration-300 cursor-pointer group w-full max-w-sm"
              >
                <div className="relative">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* <div className="absolute top-4 right-4">
                    <span className="bg-accent-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ₹{room.price}/night
                    </span>
                  </div> */}
                </div>





                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {room.description.substring(0, 100)}...
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Up to {room.capacity} guests
                    </div>
                    <Button variant="outline" onClick={() => handleRoomClick(room)}>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Hotel Amenities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover an extensive range of facilities designed for comfort and
              convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <Card
                key={index}
                className="group hover:luxury-shadow transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="flex justify-center">
  <img
    src={amenity.image}
    alt={amenity.title}
    className="w-48 h-48 object-cover rounded-lg mb-4"
  />
</div>
                    <div className="absolute inset-0 bg-primary/80 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white">{amenity.icon}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{amenity.title}</h3>
                  <p className="text-muted-foreground">{amenity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Gallery</h2>
            <p className="text-lg text-muted-foreground">
              Take a visual tour of the beautiful hotel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">{image.alt}</span>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg text-muted-foreground">
              Get in touch for reservations and inquiries
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Hotel Information</h3>
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-muted-foreground">
                    49/A/1 vettavalam road, kilnathur,
                    <br />
                    Tiruvannamalai, 606 601
                    <br />
                    
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">9444195037</p>
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">apsresidencytvm@gmail.com</p>
                </div>
                <div>
                  <h4 className="font-medium">Check-in / Check-out</h4>
                  <p className="text-muted-foreground">3:00 PM / 12:00 PM</p>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-lg overflow-hidden luxury-shadow">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d341.68447825765935!2d79.08271061092677!3d12.224094678257504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bacc1d1934838c3%3A0x9244ddf21feed56a!2sAPS%20RESIDENCY!5e0!3m2!1sen!2sin!4v1760159893353!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hotel Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <Card className="luxury-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, message: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>

                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hero-gradient text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">APS Residency</h3>
            <p className="mb-6">Experience luxury. Create memories.</p>
            <p className="text-sm opacity-90">
              © 2024 APS Residency. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Room Modal */}
      <RoomModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;
