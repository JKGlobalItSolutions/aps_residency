import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";
import { useToast } from "../components/ui/use-toast";
import { rooms } from "../data/hotel-data";
import { PaymentSection } from "../components/PaymentSection";
import emailjs from "emailjs-com"; // ✅ EmailJS import

const Booking = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    rooms: 1,
    specialRequests: "",
    screenshot: null,
  });

  const [bookingSummary, setBookingSummary] = useState({
    nights: 0,
    roomRate: 0,
    taxes: 0,
    total: 0,
  });

  // ✅ Handle form submit with EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        "your_service_id", // replace with EmailJS Service ID
        "your_template_id", // replace with EmailJS Template ID
        e.target, // send the whole form DOM
        "your_public_key" // replace with EmailJS Public Key
      );

      toast({
        title: "Booking Confirmed!",
        description: "We have sent your booking details to our email.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        roomType: "",
        checkIn: "",
        checkOut: "",
        adults: 1,
        children: 0,
        rooms: 1,
        specialRequests: "",
        screenshot: null,
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Error",
        description: "Failed to send booking details. Try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  // Pre-select room from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const roomParam = urlParams.get("room");
    if (roomParam) {
      setFormData((prev) => ({ ...prev, roomType: roomParam }));
    }
  }, [location]);

  // Set minimum check-in date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (!formData.checkIn) {
      setFormData((prev) => ({ ...prev, checkIn: today }));
    }
  }, []);

  // Calculate booking summary
  useEffect(() => {
    if (formData.checkIn && formData.checkOut && formData.roomType) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const nights = Math.ceil(
        (checkOutDate.getTime() - checkInDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      const room = rooms.find((r) => r.id === formData.roomType);
      if (room && nights > 0) {
        const roomRate = room.price * nights * formData.rooms;
        const taxes = Math.round(roomRate * 0.15); // 15% tax
        const total = roomRate + taxes;

        setBookingSummary({ nights, roomRate, taxes, total });
      }
    }
  }, [formData.checkIn, formData.checkOut, formData.roomType, formData.rooms, formData.adults, formData.children]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, screenshot: file }));
    }
  };

  const selectedRoom = rooms.find((r) => r.id === formData.roomType);

  return (
    <div className="pt-16" style={{ marginBottom: "50px" }}>
      <section className="section-padding bg-muted/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground font-serif">
              Complete Your Booking
            </h1>
            <p className="text-muted-foreground text-lg">
              Fill in your details to reserve your perfect stay at LuxeStay
              Hotel
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">
                    Guest Information
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* First + Last Name */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bookingFirstName">First Name *</Label>
                        <Input
                          id="bookingFirstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="bookingLastName">Last Name *</Label>
                        <Input
                          id="bookingLastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="bookingEmail">Email Address *</Label>
                      <Input
                        id="bookingEmail"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="bookingPhone">Phone Number *</Label>
                      <Input
                        id="bookingPhone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        required
                      />
                    </div>

                    <hr className="border-border" />

                    <h3 className="text-xl font-semibold">
                      Reservation Details
                    </h3>

                    {/* Room Selection */}
                    <div>
                      <Label htmlFor="selectedRoom">Selected Room *</Label>
                      <Select
                        value={formData.roomType}
                        onValueChange={(value) =>
                          handleInputChange("roomType", value)
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a room type" />
                        </SelectTrigger>
                        <SelectContent>
                          {rooms.map((room) => (
                            <SelectItem key={room.id} value={room.id}>
                              {room.title} - ₹{room.price}/night
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dates */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="checkInDate">Check-in Date *</Label>
                        <Input
                          id="checkInDate"
                          name="checkIn"
                          type="date"
                          value={formData.checkIn}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) =>
                            handleInputChange("checkIn", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="checkOutDate">Check-out Date *</Label>
                        <Input
                          id="checkOutDate"
                          name="checkOut"
                          type="date"
                          value={formData.checkOut}
                          min={
                            formData.checkIn
                              ? new Date(
                                  new Date(formData.checkIn).getTime() + 86400000
                                )
                                  .toISOString()
                                  .split("T")[0]
                              : undefined
                          }
                          onChange={(e) =>
                            handleInputChange("checkOut", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    {/* Guests & Rooms */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="numAdults">Number of Adults *</Label>
                        <Select
                          value={formData.adults.toString()}
                          onValueChange={(value) =>
                            handleInputChange("adults", parseInt(value))
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select adults" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Adult</SelectItem>
                            <SelectItem value="2">2 Adults</SelectItem>
                            <SelectItem value="3">3 Adults</SelectItem>
                            <SelectItem value="4">4 Adults</SelectItem>
                            <SelectItem value="5">5 Adults</SelectItem>
                            <SelectItem value="6">6 Adults</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="numChildren">Number of Children</Label>
                        <Select
                          value={formData.children.toString()}
                          onValueChange={(value) =>
                            handleInputChange("children", parseInt(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select children" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0 Children</SelectItem>
                            <SelectItem value="1">1 Child</SelectItem>
                            <SelectItem value="2">2 Children</SelectItem>
                            <SelectItem value="3">3 Children</SelectItem>
                            <SelectItem value="4">4 Children</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Number of Rooms */}
                    <div>
                      <Label htmlFor="numRooms">Number of Rooms</Label>
                      <Select
                        value={formData.rooms.toString()}
                        onValueChange={(value) =>
                          handleInputChange("rooms", parseInt(value))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Room</SelectItem>
                          <SelectItem value="2">2 Rooms</SelectItem>
                          <SelectItem value="3">3 Rooms</SelectItem>
                          <SelectItem value="4">4 Rooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        name="specialRequests"
                        rows={3}
                        value={formData.specialRequests}
                        onChange={(e) =>
                          handleInputChange("specialRequests", e.target.value)
                        }
                        placeholder="Any special requests or preferences..."
                      />
                    </div>

                    {/* Screenshot Upload */}
                    <div>
                      <Label htmlFor="screenshotUpload">
                        Upload Screenshot (Payment proof)
                      </Label>
                      <Input
                        id="screenshotUpload"
                        name="screenshot"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {formData.screenshot && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Selected: {formData.screenshot.name}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-4 text-lg font-semibold"
                    >
                      {isSubmitting ? "Processing..." : "Complete Booking"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg border border-border sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Booking Summary
                  </h3>

                  <div className="space-y-4 mb-5">
                    {selectedRoom && (
                      <div className="pb-4 border-b border-border">
                        <p className="font-medium text-lg">
                          {selectedRoom.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedRoom.size} • {selectedRoom.maxGuests} guests •{" "}
                          {selectedRoom.view}
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Check-in:</span>
                        <span>
                          {formData.checkIn
                            ? new Date(formData.checkIn).toLocaleDateString()
                            : "--"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Check-out:
                        </span>
                        <span>
                          {formData.checkOut
                            ? new Date(formData.checkOut).toLocaleDateString()
                            : "--"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Adults:</span>
                        <span>{formData.adults}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Children:</span>
                        <span>{formData.children}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nights:</span>
                        <span>{bookingSummary.nights || "--"}</span>
                      </div>
                    </div>

                    <hr className="border-border" />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Room Rate:</span>
                        <span>₹{bookingSummary.roomRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Taxes & Fees:
                        </span>
                        <span>₹{bookingSummary.taxes}</span>
                      </div>
                    </div>

                    <hr className="border-border" />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Amount:</span>
                      <span className="text-primary">
                        ₹{bookingSummary.total}
                      </span>
                    </div>
                  </div>

                  <PaymentSection
                    total={bookingSummary.total ?? 0}
                    paymentMethod="upi"
                    onPaymentMethodChange={() => {}}
                    onMakePayment={() => {}}
                    isProcessing={false}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
