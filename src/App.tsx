import { Mail, MapPin, Phone, Tent, Calendar, Users, Music, PartyPopper, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import emailjs from '@emailjs/browser';
import { useState, FormEvent } from 'react';

function App() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    details: '',
    startDate: '',
    endDate: ''
  });

  // Service Cards Data
  const serviceCards = [
    {
      title: "Heritage & Legacy",
      image: "./src/images/HNL.jpg", // update with the correct image path
      description: "Lallooji Shivgovind Das Tent Co. was established in 1921 by Late Shri Lallooji and has been passed down through four generations. It began by serving major events like the Kumbh Mela and Magh Mela on the banks of the holy Ganges, evolving into a nationally recognized brand known for its innovative solutions."
    },
    {
      title: "Services Provided",
      image: "./src/images/CS.jpg",
      description: "The company offers a wide range of services, including tenting, barricading, camp setups, and temporary structures for events, exhibitions, pilgrim shelters, and administrative purposes. These solutions are equipped with essential utilities like electrical fitting , toiletry services, ensuring comprehensive support for any need."
    },
    {
      title: "Commitment to Excellence",
      image: "./src/images/heroimagereal.jpg",
      description: "With extensive resources and a dedication to maintaining international standards, Lallooji Shivgovind Das Tent Co. ensures that every project is a success. Their professional management and value-added services focus on creativity and imagination, setting clients apart from the competition."
    },
  ];

  // State to manage which cards are open (showing description)
  const [openCards, setOpenCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setOpenCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Rest of the existing functions...
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          location: formData.location,
          start_date:formData.startDate,
          end_date:formData.endDate,
          message: formData.details,
          to_email: 'srijanwh@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      toast({
        title: "Success!",
        description: "Your inquiry has been sent. We'll get back to you soon!",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        startDate:'',
        endDate:'',
        details: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm border-b border-[#FF6B35]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
            <img src="./src/images/lalloji logo.png" alt="Lalloji Logo" className="h-8 w-8" />
              <span className="text-white font-bold text-xl">Lallooji Shivgoind Das Tent Co.</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-300 hover:text-[#FF6B35] transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('inquiry')}
                className="text-gray-300 hover:text-[#FF6B35] transition-colors"
              >
                Plan Event
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-[#FF6B35] transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <button
                onClick={() => scrollToSection('services')}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-[#FF6B35] transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('inquiry')}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-[#FF6B35] transition-colors"
              >
                Plan Event
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-[#FF6B35] transition-colors"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
<header className="relative h-screen flex items-center justify-center overflow-hidden">
  <video 
    autoPlay 
    loop 
    muted 
    playsInline
    className="absolute inset-0 w-full h-full object-cover z-0"
    style={{ filter: 'brightness(0.5)' }}
  >
    <source src="./src/videos/heropagevid.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  {/* Texture overlay */}
  <div 
    className="absolute inset-0 z-10"
    style={{
      backgroundImage: 'url("./src/textures/cross-stripes.png")',
      backgroundRepeat: 'repeat',
      mixBlendMode: 'overlay',
      opacity: 0.25
    }}
  />
  {/* Content */}
  <div className="text-center text-white z-30 px-4 relative">
    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
      Lallooji Shivgoind Das Tent Co.
    </h1>
    <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-md">
      Everything You Need
    </p>
    <Button 
      onClick={() => scrollToSection('inquiry')}
      className="bg-[#FF6B35] hover:bg-[#ff8255] text-white text-lg px-8 py-6 shadow-lg"
    >
      Plan Your Event
    </Button>
  </div>
</header>

       {/* Services Section with Interactive Cards */}
       <section id="services" className="py-20 px-4 bg-neutral-900">
  <h2 className="text-4xl font-bold text-white text-center mb-16">Company Profile</h2>
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {serviceCards.map((card, index) => (
      <div 
        key={index} 
        className="relative cursor-pointer group" 
        onClick={() => toggleCard(index)}
      >
        <div className="relative h-64 rounded overflow-hidden shadow-lg">
          <img 
            src={card.image} 
            alt={card.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
          />
          {/* Title overlay that stays centered */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
            <h3 className="text-white text-2xl font-bold">{card.title}</h3>
          </div>
        </div>
        
        {/* Separate description container */}
        <div 
          className={`mt-4 p-4 bg-black/70 text-white rounded transition-all duration-300 ${
            openCards[index] ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
          }`}
        >
          <p className="text-sm leading-relaxed">{card.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-20 px-4 bg-[#FF6B35]">
        {/* Rest of the inquiry form section remains the same */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Plan Your Event</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="text-white"
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="text-white"
              required
            />
             <Input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="text-white"
            />
            <Input
              type="text"
              name="location"
              placeholder="Event Location"
              value={formData.location}
              onChange={handleChange}
              className="text-white"
            />
            <Input
              type="date"
              name="startDate"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={handleChange}
              className="text-white"
            />
             <Input
              type="date"
              name="endDate"
              placeholder="End Date"
              value={formData.endDate}
              onChange={handleChange}
              className="text-white"
            />
            <Textarea
              name="details"
              placeholder="Event Details"
              value={formData.details}
              onChange={handleChange}
              className="text-white"
              rows={2}
            />
            <Button type="submit" disabled={isSubmitting} className="bg-[#FF6B35] hover:bg-[#ff8255] text-white text-lg px-8 py-6">
              {isSubmitting ? "Submitting..." : "Send Inquiry"}
            </Button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-neutral-900">
        {/* Rest of the contact section remains the same */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex justify-center items-center">
            <Card className="p-6 bg-black/50 border-[#FF6B35]/20 transform hover:scale-105 transition-transform">
              <Phone className="w-12 h-12 text-[#FF6B35] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
              <p className="text-gray-400">+91 9412022633</p>
            </Card>
            <Card className="p-6 bg-black/50 border-[#FF6B35]/20 transform hover:scale-105 transition-transform">
              <Mail className="w-12 h-12 text-[#FF6B35] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-gray-400">lalloojitents@gmail.com</p>
            </Card>
            <Card className="p-6 bg-black/50 border-[#FF6B35]/20 transform hover:scale-105 transition-transform">
              <MapPin className="w-12 h-12 text-[#FF6B35] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Address</h3>
              <p className="text-gray-400">Devpura , Haridwar, Uttarakhand, India</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-center text-gray-400">
        <p>© 2025 Lalloji Shivgovind Das tent co. All rights reserved.</p>
      </footer>

      <Toaster />
    </div>
  );
}

export default App;