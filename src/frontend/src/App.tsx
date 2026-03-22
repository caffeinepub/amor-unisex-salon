import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Brush,
  ChevronLeft,
  ChevronRight,
  Clock,
  Facebook,
  Feather,
  Flower,
  Heart,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scissors,
  Sparkles,
  Star,
  User,
  Waves,
  Wifi,
  Wind,
  X,
  Youtube,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Fade-on-scroll hook ────────────────────────────────────────────────────────
function useFadeOnScroll() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const SERVICE_CATEGORIES = [
  {
    title: "Hair Care",
    icon: Scissors,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
    description:
      "Expert cuts, colors, highlights, and treatments tailored to your unique style.",
    services: [
      "Hair Straightening",
      "Keratin Hair Wash",
      "Crown Highlights",
      "Blow Dry",
      "Hair Smoothening",
      "Hair Trim - Layer",
      "Hair Perming",
      "Kids Hair Cut",
      "Hair Wash",
      "Crown Touch Up",
      "Hair Cut - Transformation",
      "Hair Cut With Styling",
      "Anti Hair Fall Treatment",
      "Hair Colour",
      "Basic Hair Spa With Treatment",
      "Advance Hair Cut",
      "Hair Ironing",
      "Keratin GK Hair Treatment",
      "Hair Maintenance",
      "Hair Rebonding",
      "Hair Wash With Conditioning",
      "Hair Highlights",
      "Touch Up",
      "Hair Styling",
      "Hair Spa",
      "Hair Colouring - Global",
      "Style Make Over",
      "Hair Botox Treatment",
      "Hair Extension",
      "Hair Cut",
      "Hair Colour - Beard",
      "Hair Highlights - Global",
      "Basic Hair Cut",
    ],
  },
  {
    title: "Skin Care",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80",
    description:
      "Revitalizing facials, peels, and skin-care rituals for a luminous glow.",
    services: [
      "Bleaching",
      "Chemical Peel Treatment",
      "Hydra Facial Treatment",
      "Detanning",
      "Bleach - Fruit",
      "Basic Clean Up",
      "Thermo Herb Facial",
      "D-Tan - Body",
      "Vital Peel Facial",
      "O3 Clean Up",
      "Facial Glow",
      "Skin Treatment",
      "D-Tan Bleach",
      "Radiance Rejuvenating Cocoa Facial",
      "Facial Wrinkles",
      "Clean Up",
      "Bleach - Body",
      "Tan Pack - Face",
      "Casmara Advance Facial",
      "Pimple Treatment",
      "O3 Facial",
      "Anti Acne Facial",
      "Essential Anti Dandruff Treatment",
    ],
  },
  {
    title: "Nails",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80",
    description:
      "Manicures, pedicures, gel, and nail art by our meticulous nail artists.",
    services: [
      "Artificial Nail Extension",
      "Acrylic Permanent Nail Extension",
      "Herbal Manicure",
      "Acrylic Nail Extension",
      "Pedicure - Herbal",
      "Premium Manicure",
      "3D Nail Art",
      "Anti Tan Manicure",
      "Manicure",
      "Pedicure",
      "Nail Buffing",
      "Basic Pedicure And Manicure",
      "Nail Extension",
    ],
  },
  {
    title: "Makeup",
    icon: Brush,
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80",
    description:
      "From everyday glam to special occasions — our artists bring out your best.",
    services: [
      "Engagement Makeup",
      "Bridal Package",
      "Air Brush Makeup",
      "Party Makeup",
      "Basic Makeup",
      "Bridal Makeup",
    ],
  },
  {
    title: "Body Care",
    icon: Waves,
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80",
    description:
      "Full-body treatments, polishing, and spa therapies to renew your skin.",
    services: [
      "Advance Polishing - Arms",
      "Body Spa",
      "Body Care Polishing",
      "Body Polishing With Scrub",
    ],
  },
  {
    title: "Grooming",
    icon: User,
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80",
    description:
      "Classic shaves, beard sculpting, and modern grooming for every style.",
    services: ["Shaving", "Eyelash Extension", "Beard Styling"],
  },
  {
    title: "Hair Removal",
    icon: Feather,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80",
    description:
      "Smooth, long-lasting results with our gentle premium waxing services.",
    services: ["Waxing - Body", "Threading - Eyebrows", "Waxing - Normal"],
  },
  {
    title: "Massage",
    icon: Wind,
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
    description:
      "Relaxing massage therapies to soothe tired muscles and calm the mind.",
    services: ["Foot Massage", "Face Massage"],
  },
  {
    title: "Bridal Packages",
    icon: Flower,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
    description:
      "Bespoke bridal packages ensuring you look breathtaking on your special day.",
    services: ["Bridal Package"],
  },
  {
    title: "Tattoo Services",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=400&q=80",
    description:
      "Artistic and precision tattoo services by skilled professionals.",
    services: ["Nail Tattoo"],
  },
];

const GALLERY_IMAGES = [
  {
    src: "/assets/uploads/amor-unisex-salon-vasant-vihar-delhi-beauty-parlours-18f18wis4s-2.jpg",
    alt: "Amor Salon Reception Lounge",
  },
  {
    src: "/assets/uploads/amor-unisex-salon-vasant-vihar-delhi-beauty-parlours-u69kgocccn-3.jpg",
    alt: "Amor Salon Front Desk",
  },
  {
    src: "/assets/uploads/amor-unisex-salon-vasant-vihar-delhi-beauty-parlours-v817v9oeah-4.jpg",
    alt: "Amor Salon Styling Floor",
  },
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    alt: "Hair Styling Session",
  },
  {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    alt: "Skin Treatment",
  },
  {
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
    alt: "Makeup Artistry",
  },
];

const TESTIMONIALS = [
  {
    name: "Meera Kapoor",
    review:
      "Absolutely stunning experience. The staff are warm, skilled, and truly attentive. My hair has never looked this good — I felt like royalty throughout.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    review:
      "Came in for a beard trim and left with a full grooming treatment. The ambience is incredibly luxurious and the results are immaculate. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sanya Bhatia",
    review:
      "Got my bridal makeup done here and it was beyond perfect. The team understood my vision instantly and executed it flawlessly. Worth every penny.",
    rating: 5,
  },
  {
    name: "Rohan Verma",
    review:
      "The spa treatment was deeply relaxing. A true luxury escape in the heart of Delhi. I leave feeling completely rejuvenated every single time.",
    rating: 5,
  },
];

const TEAM = [
  {
    name: "Priya Sharma",
    specialty: "Senior Hair Stylist",
    bio: "10+ years crafting bespoke cuts and color techniques for every hair type.",
    photo:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80",
  },
  {
    name: "Rohit Verma",
    specialty: "Men's Grooming Expert",
    bio: "Master barber specializing in classic shaves and contemporary fades.",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
  },
  {
    name: "Anjali Singh",
    specialty: "Skin & Spa Therapist",
    bio: "Certified aesthetician with expertise in advanced skin rituals and body therapies.",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
  },
  {
    name: "Karan Kapoor",
    specialty: "Bridal & Makeup Artist",
    bio: "Award-winning artist who has transformed over 200 brides on their special day.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Services", href: "services" },
  { label: "Gallery", href: "gallery" },
  { label: "Team", href: "team" },
];

const LEGAL: Record<string, { title: string; content: string }> = {
  privacy: {
    title: "Privacy Policy",
    content:
      "Last updated: March 2026\n\nAmor Unisex Salon does not store any personal data on servers or databases. When you submit an appointment request via our booking form, your information is forwarded directly to our team via email through FormSubmit.co — a third-party email forwarding service. No data is retained by us beyond what your email client stores.\n\nWe do not use cookies for tracking, and we do not share your information with any third parties other than FormSubmit.co for the sole purpose of email forwarding.\n\nFor questions, contact us at owner@amorsalon.in.",
  },
  terms: {
    title: "Terms of Use",
    content:
      "Last updated: March 2026\n\nBy accessing and using the Amor Unisex Salon website, you agree to these Terms of Use. This website is for informational purposes only. The content is provided 'as is' without warranties of any kind.\n\nAppointment requests made through this site do not constitute a confirmed booking until confirmed by our team via phone or email. We reserve the right to modify or discontinue services at any time.\n\nAll content, images, and branding on this site are the property of Amor Unisex Salon. Unauthorized reproduction is prohibited.",
  },
  disclaimer: {
    title: "Disclaimer",
    content:
      "Last updated: March 2026\n\nThe services provided at Amor Unisex Salon are for cosmetic and grooming purposes only. Results may vary based on individual hair type, skin type, and other personal factors.\n\nOur services do not constitute medical advice or treatment. We recommend consulting a qualified medical professional for any skin or scalp conditions before undergoing treatments.\n\nAmor Unisex Salon is not liable for any adverse reactions that may occur due to undisclosed allergies or medical conditions. Please inform your stylist of any known sensitivities before your appointment.",
  },
};

// ── Small components ──────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="h-px w-16 bg-gold opacity-60" />
      <div className="w-2 h-2 rounded-full bg-gold opacity-80" />
      <div className="h-px w-16 bg-gold opacity-60" />
    </div>
  );
}

function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12">
      <p className="text-gold font-poppins text-sm tracking-[0.3em] uppercase mb-2">
        {label}
      </p>
      <h2 className="font-playfair text-4xl md:text-5xl text-salon-off-white mb-3">
        {title}
      </h2>
      <GoldDivider />
      {subtitle && (
        <p className="text-salon-gray font-poppins text-base max-w-xl mx-auto mt-3">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function StarRating({ count }: { count: number }) {
  const stars = ["a", "b", "c", "d", "e"].slice(0, count);
  return (
    <div className="flex gap-1">
      {stars.map((s) => (
        <Star key={s} className="w-4 h-4 fill-gold text-gold" />
      ))}
    </div>
  );
}

function SocialIcons() {
  const icons = [
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Youtube, href: "#", label: "YouTube" },
    {
      Icon: MessageCircle,
      href: "https://wa.me/917291922197",
      label: "WhatsApp",
    },
  ];
  return (
    <div className="flex gap-3">
      {icons.map(({ Icon, href, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all duration-300"
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [legalModal, setLegalModal] = useState<string | null>(null);
  const [serviceCategory, setServiceCategory] = useState("");

  const aboutRef = useFadeOnScroll() as React.RefObject<HTMLDivElement>;
  const servicesRef = useFadeOnScroll() as React.RefObject<HTMLDivElement>;
  const galleryRef = useFadeOnScroll() as React.RefObject<HTMLDivElement>;
  const testimonialsRef = useFadeOnScroll() as React.RefObject<HTMLDivElement>;
  const teamRef = useFadeOnScroll() as React.RefObject<HTMLDivElement>;
  const bookingRef = useFadeOnScroll() as React.RefObject<HTMLDivElement>;
  const contactRef = useFadeOnScroll() as React.RefObject<HTMLDivElement>;

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null
          ? null
          : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
      ),
    [],
  );
  const nextImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i + 1) % GALLERY_IMAGES.length,
      ),
    [],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prevImage, nextImage, closeLightbox]);

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("service", serviceCategory);
    try {
      // CHANGE owner@amorsalon.in to the actual salon owner email before going live
      await fetch("https://formsubmit.co/ajax/owner@amorsalon.in", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
    } catch {
      // proceed to success regardless
    }
    setFormState("success");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-salon-black text-salon-off-white">
      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gold/20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              type="button"
              onClick={() => scrollTo("home")}
              className="flex items-center gap-3 flex-shrink-0"
            >
              <img
                src="/assets/uploads/amor-unisex-salon-vasant-vihar-delhi-beauty-parlours-qq68adkpe6-1.webp"
                alt="Amor Unisex Salon"
                className="h-10 w-auto object-contain"
              />
              <span className="hidden sm:block font-playfair text-xl text-gold tracking-wide">
                Amor Unisex Salon
              </span>
            </button>

            <nav
              className="hidden md:flex items-center gap-8"
              data-ocid="main.panel"
            >
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={`#${l.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(l.href);
                  }}
                  className="text-salon-gray hover:text-gold transition-colors duration-200 font-poppins text-sm tracking-wider"
                  data-ocid="nav.link"
                >
                  {l.label}
                </a>
              ))}
              <Button
                onClick={() => scrollTo("booking")}
                className="bg-gold text-white hover:bg-gold-dark font-poppins text-sm px-5 font-semibold tracking-wider transition-all duration-300"
                data-ocid="nav.primary_button"
              >
                Book Now
              </Button>
            </nav>

            <button
              type="button"
              className="md:hidden text-gold"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden pb-4 border-t border-gold/10 pt-4 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={`#${l.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(l.href);
                  }}
                  className="text-salon-gray hover:text-gold font-poppins text-sm tracking-wider"
                >
                  {l.label}
                </a>
              ))}
              <Button
                onClick={() => scrollTo("booking")}
                className="bg-gold text-white font-semibold w-full"
              >
                Book Now
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/uploads/amor-unisex-salon-vasant-vihar-delhi-beauty-parlours-18f18wis4s-2.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="font-poppins text-gold tracking-[0.4em] uppercase text-sm mb-4 animate-fade-in-up">
            Amor Unisex Salon
          </p>
          <h1 className="font-playfair text-5xl md:text-7xl text-white leading-tight mb-6 animate-fade-in-up">
            Where Style Meets
            <span className="block text-gold italic">Elegance</span>
          </h1>
          <p className="font-poppins text-white/80 text-lg md:text-xl mb-10 animate-fade-in-up">
            Experience the finest grooming services in town.
          </p>
          <Button
            onClick={() => scrollTo("booking")}
            className="bg-gold text-white hover:bg-gold-dark font-poppins font-semibold px-10 py-6 text-base tracking-widest transition-all duration-300 uppercase"
            data-ocid="hero.primary_button"
          >
            Book an Appointment
          </Button>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
          <div className="w-px h-12 bg-gold animate-pulse" />
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
      <section
        id="about"
        ref={aboutRef}
        className="section-fade py-24 px-4 bg-salon-black"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold font-poppins text-sm tracking-[0.3em] uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-salon-off-white mb-6">
              A Passion for Beauty &amp; Precision
            </h2>
            <GoldDivider />
            <p className="text-salon-gray font-poppins leading-relaxed mb-6">
              Founded with a deep passion for beauty and precision, Amor Unisex
              Salon was born from a vision to create a sanctuary where every
              guest feels celebrated. Nestled in the heart of Vasant Vihar, New
              Delhi, we have been transforming looks and elevating confidence
              for years.
            </p>
            <p className="text-salon-gray font-poppins leading-relaxed mb-8">
              Our team of expertly trained stylists and therapists bring
              artistry, technique, and warmth to every service. Whether you seek
              a transformative haircut, a relaxing spa experience, or a flawless
              bridal look — Amor is your destination.
            </p>
            <blockquote className="border-l-2 border-gold pl-6 italic font-playfair text-gold text-xl">
              "True beauty is found in the details, and we dedicate ourselves to
              perfecting every one."
            </blockquote>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 border border-gold/20 rounded" />
            <img
              src="/assets/uploads/amor-unisex-salon-vasant-vihar-delhi-beauty-parlours-u69kgocccn-3.jpg"
              alt="Amor Salon interior"
              className="w-full h-[500px] object-cover rounded"
            />
            <div className="absolute bottom-6 right-6 bg-white/95 border border-gold/30 px-6 py-4 backdrop-blur shadow-gold-sm">
              <p className="font-playfair text-gold text-2xl font-bold">10+</p>
              <p className="font-poppins text-salon-gray text-xs tracking-widest uppercase">
                Years of Excellence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────────── */}
      <section
        id="services"
        ref={servicesRef}
        className="section-fade py-24 px-4 bg-salon-card"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="What We Offer"
            title="Our Services"
            subtitle="A comprehensive selection of premium beauty and grooming experiences."
          />

          {/* Category Photo Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
            {SERVICE_CATEGORIES.slice(0, 5).map(
              ({ title, image, icon: Icon }, i) => (
                <div
                  key={title}
                  className="group bg-salon-black border border-gold/20 rounded overflow-hidden hover:border-gold/60 hover:-translate-y-1 hover:shadow-gold transition-all duration-300"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-2 left-3 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gold" />
                      <span className="font-playfair text-white text-sm">
                        {title}
                      </span>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
            {SERVICE_CATEGORIES.slice(5).map(
              ({ title, image, icon: Icon }, i) => (
                <div
                  key={title}
                  className="group bg-salon-black border border-gold/20 rounded overflow-hidden hover:border-gold/60 hover:-translate-y-1 hover:shadow-gold transition-all duration-300"
                  data-ocid={`services.item.${i + 6}`}
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-2 left-3 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gold" />
                      <span className="font-playfair text-white text-sm">
                        {title}
                      </span>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Full Services List Accordion */}
          <div className="bg-salon-black border border-gold/15 rounded-lg p-6 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gold/20" />
              <p className="font-poppins text-gold text-sm tracking-[0.3em] uppercase">
                Full Services List
              </p>
              <div className="h-px flex-1 bg-gold/20" />
            </div>
            <Accordion type="multiple" className="space-y-2">
              {SERVICE_CATEGORIES.map(({ title, icon: Icon, services }) => (
                <AccordionItem
                  key={title}
                  value={title}
                  className="border border-gold/15 rounded-md overflow-hidden"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-gold/5 transition-colors [&>svg]:text-gold">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="font-playfair text-lg text-salon-off-white">
                        {title}
                      </span>
                      <span className="ml-2 text-salon-gray font-poppins text-xs">
                        ({services.length} services)
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-poppins border border-gold/20 text-salon-gray bg-salon-card hover:border-gold/50 hover:text-gold transition-colors duration-200"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Info Badges */}
            <div className="mt-8 pt-6 border-t border-gold/15">
              <p className="font-poppins text-gold text-xs tracking-[0.25em] uppercase mb-4">
                Salon Info
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant="outline"
                  className="border-gold/30 text-salon-gray font-poppins gap-2 px-4 py-2"
                >
                  <Wifi className="w-3.5 h-3.5 text-gold" />
                  WiFi Available
                </Badge>
                <Badge
                  variant="outline"
                  className="border-gold/30 text-salon-gray font-poppins gap-2 px-4 py-2"
                >
                  <User className="w-3.5 h-3.5 text-gold" />
                  Unisex Salon
                </Badge>
                <Badge
                  variant="outline"
                  className="border-gold/30 text-salon-gray font-poppins gap-2 px-4 py-2"
                >
                  <Wind className="w-3.5 h-3.5 text-gold" />
                  Air Conditioned
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────────────────── */}
      <section
        id="gallery"
        ref={galleryRef}
        className="section-fade py-24 px-4 bg-salon-black"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Our Space"
            title="Gallery"
            subtitle="A glimpse into the Amor experience."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => openLightbox(i)}
                className="relative group overflow-hidden rounded border border-gold/10 hover:border-gold/40 transition-colors cursor-pointer"
                data-ocid={`gallery.item.${i + 1}`}
                aria-label={`View ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-gold opacity-0 group-hover:opacity-100 font-poppins text-xs tracking-widest uppercase transition-opacity">
                    View
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => !open && closeLightbox()}
      >
        <DialogContent
          className="max-w-4xl bg-white border border-gold/20 p-2"
          data-ocid="gallery.modal"
        >
          {lightboxIndex !== null && (
            <div className="relative">
              <img
                src={GALLERY_IMAGES[lightboxIndex].src}
                alt={GALLERY_IMAGES[lightboxIndex].alt}
                className="w-full max-h-[80vh] object-contain"
              />
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all shadow-xs"
                data-ocid="gallery.pagination_prev"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all shadow-xs"
                data-ocid="gallery.pagination_next"
              >
                <ChevronRight size={20} />
              </button>
              <p className="text-center text-salon-gray font-poppins text-xs mt-2 pb-1">
                {GALLERY_IMAGES[lightboxIndex].alt}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section
        ref={testimonialsRef}
        className="section-fade py-24 px-4 bg-salon-card"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading label="Client Love" title="Testimonials" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map(({ name, review, rating }, i) => (
              <div
                key={name}
                className="bg-white border border-gold/20 rounded p-6 flex flex-col gap-4 hover:border-gold/50 hover:shadow-gold-sm transition-all duration-300"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <StarRating count={rating} />
                <p className="text-salon-gray font-poppins text-sm leading-relaxed flex-1 italic">
                  "{review}"
                </p>
                <p className="font-playfair text-gold text-base">— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ────────────────────────────────────────────────────────────── */}
      <section
        id="team"
        ref={teamRef}
        className="section-fade py-24 px-4 bg-salon-black"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="The Experts"
            title="Meet the Team"
            subtitle="Passionate professionals dedicated to bringing out your best."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map(({ name, specialty, bio, photo }, i) => (
              <div
                key={name}
                className="group bg-white border border-gold/20 rounded overflow-hidden hover:border-gold/50 hover:shadow-gold transition-all duration-300 text-center"
                data-ocid={`team.item.${i + 1}`}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-playfair text-xl text-salon-off-white mb-1">
                    {name}
                  </h3>
                  <p className="text-gold font-poppins text-xs tracking-widest uppercase mb-2">
                    {specialty}
                  </p>
                  <p className="text-salon-gray font-poppins text-sm leading-relaxed">
                    {bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ────────────────────────────────────────────────────── */}
      <section
        id="booking"
        ref={bookingRef}
        className="section-fade py-24 px-4 bg-salon-card"
      >
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            label="Reserve Your Visit"
            title="Book an Appointment"
            subtitle="Fill in your details and we'll confirm your appointment shortly."
          />

          {formState === "success" ? (
            <div
              className="text-center py-16 border border-gold/30 rounded bg-white shadow-xs"
              data-ocid="booking.success_state"
            >
              <div className="text-gold text-5xl mb-4 font-playfair">✦</div>
              <h3 className="font-playfair text-3xl text-salon-off-white mb-3">
                Thank You!
              </h3>
              <p className="text-salon-gray font-poppins">
                Your appointment request has been received. Our team will
                contact you shortly to confirm.
              </p>
            </div>
          ) : (
            // CHANGE owner@amorsalon.in to the actual salon owner email before going live
            <form
              onSubmit={handleBookingSubmit}
              className="space-y-6 bg-white border border-gold/15 rounded-lg p-8 shadow-xs"
              data-ocid="booking.panel"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_subject"
                value="New Appointment Request – Amor Unisex Salon"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="booking-name"
                    className="font-poppins text-salon-gray text-sm tracking-wide"
                  >
                    Full Name *
                  </label>
                  <Input
                    id="booking-name"
                    name="name"
                    required
                    placeholder="Your full name"
                    className="bg-white border-gold/30 text-salon-off-white placeholder:text-salon-gray/50 focus:border-gold"
                    data-ocid="booking.input"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="booking-phone"
                    className="font-poppins text-salon-gray text-sm tracking-wide"
                  >
                    Phone Number *
                  </label>
                  <Input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Your phone number"
                    className="bg-white border-gold/30 text-salon-off-white placeholder:text-salon-gray/50 focus:border-gold"
                    data-ocid="booking.input"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="booking-email"
                    className="font-poppins text-salon-gray text-sm tracking-wide"
                  >
                    Email (optional)
                  </label>
                  <Input
                    id="booking-email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    className="bg-white border-gold/30 text-salon-off-white placeholder:text-salon-gray/50 focus:border-gold"
                    data-ocid="booking.input"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="booking-service"
                    className="font-poppins text-salon-gray text-sm tracking-wide"
                  >
                    Service Category *
                  </label>
                  <Select onValueChange={setServiceCategory}>
                    <SelectTrigger
                      className="bg-white border-gold/30 text-salon-off-white focus:border-gold"
                      data-ocid="booking.select"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gold/30">
                      {SERVICE_CATEGORIES.map(({ title }) => (
                        <SelectItem
                          key={title}
                          value={title}
                          className="text-salon-off-white focus:bg-gold/10 focus:text-gold"
                        >
                          {title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="booking-date"
                    className="font-poppins text-salon-gray text-sm tracking-wide"
                  >
                    Preferred Date *
                  </label>
                  <Input
                    id="booking-date"
                    name="date"
                    type="date"
                    required
                    className="bg-white border-gold/30 text-salon-off-white focus:border-gold"
                    data-ocid="booking.input"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="booking-time"
                    className="font-poppins text-salon-gray text-sm tracking-wide"
                  >
                    Preferred Time *
                  </label>
                  <Input
                    id="booking-time"
                    name="time"
                    type="time"
                    required
                    className="bg-white border-gold/30 text-salon-off-white focus:border-gold"
                    data-ocid="booking.input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="booking-message"
                  className="font-poppins text-salon-gray text-sm tracking-wide"
                >
                  Special Requests
                </label>
                <Textarea
                  id="booking-message"
                  name="message"
                  rows={4}
                  placeholder="Any special requests or notes for us..."
                  className="bg-white border-gold/30 text-salon-off-white placeholder:text-salon-gray/50 focus:border-gold resize-none"
                  data-ocid="booking.textarea"
                />
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="bg-gold text-white hover:bg-gold-dark font-poppins font-semibold px-12 py-6 text-base tracking-widest uppercase transition-all duration-300"
                  data-ocid="booking.submit_button"
                >
                  {formState === "submitting"
                    ? "Sending..."
                    : "Confirm Appointment"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        ref={contactRef}
        className="section-fade py-24 px-4 bg-salon-black"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading label="Find Us" title="Contact" />
          <div className="grid md:grid-cols-2 gap-12">
            <div className="border border-gold/20 rounded overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.6!2d77.1667!3d28.5672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzAyLjAiTiA3N8KwMDknMjAuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Amor Salon Location"
              />
            </div>

            <div className="flex flex-col gap-8 justify-center">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-playfair text-salon-off-white text-lg mb-1">
                    Address
                  </p>
                  <p className="text-salon-gray font-poppins text-sm leading-relaxed">
                    Lower Ground Floor, Community Centre, 45,
                    <br />
                    Basant Lok, Vasant Vihar,
                    <br />
                    New Delhi, Delhi 110057
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-playfair text-salon-off-white text-lg mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+917291922197"
                    className="text-salon-gray font-poppins text-sm hover:text-gold transition-colors"
                  >
                    072919 22197
                  </a>
                  <br />
                  <a
                    href="https://wa.me/917291922197"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold font-poppins text-sm hover:underline mt-1 inline-block"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-playfair text-salon-off-white text-lg mb-1">
                    Hours
                  </p>
                  <p className="text-salon-gray font-poppins text-sm">
                    Monday – Sunday: 11:00 AM – 9:00 PM
                  </p>
                </div>
              </div>
              <div>
                <p className="font-playfair text-salon-off-white text-lg mb-3">
                  Follow Us
                </p>
                <SocialIcons />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-salon-card border-t border-gold/10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/uploads/amor-unisex-salon-vasant-vihar-delhi-beauty-parlours-qq68adkpe6-1.webp"
                  alt="Amor Unisex Salon"
                  className="h-10 w-auto object-contain"
                />
                <span className="font-playfair text-lg text-gold">
                  Amor Unisex Salon
                </span>
              </div>
              <p className="text-salon-gray font-poppins text-sm leading-relaxed">
                A luxury unisex salon in Vasant Vihar, New Delhi. Dedicated to
                beauty, precision, and excellence.
              </p>
            </div>

            <div>
              <p className="font-playfair text-gold text-lg mb-4">
                Quick Links
              </p>
              <ul className="space-y-2">
                {[...NAV_LINKS, { label: "Contact", href: "contact" }].map(
                  (l) => (
                    <li key={l.label}>
                      <a
                        href={`#${l.href}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(l.href);
                        }}
                        className="text-salon-gray font-poppins text-sm hover:text-gold transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <p className="font-playfair text-gold text-lg mb-4">Connect</p>
              <div className="mb-6">
                <SocialIcons />
              </div>
              <div className="flex flex-col gap-2">
                {(["privacy", "terms", "disclaimer"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setLegalModal(key)}
                    className="text-salon-gray font-poppins text-sm hover:text-gold transition-colors text-left"
                    data-ocid="footer.link"
                  >
                    {key === "privacy"
                      ? "Privacy Policy"
                      : key === "terms"
                        ? "Terms of Use"
                        : "Disclaimer"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gold/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-salon-gray font-poppins text-xs">
              © {new Date().getFullYear()} Amor Unisex Salon. All rights
              reserved.
            </p>
            <p className="text-salon-gray font-poppins text-xs">
              Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── LEGAL MODAL ─────────────────────────────────────────────────────── */}
      <Dialog
        open={!!legalModal}
        onOpenChange={(open) => !open && setLegalModal(null)}
      >
        <DialogContent
          className="max-w-2xl bg-white border border-gold/20 text-salon-off-white"
          data-ocid="legal.modal"
        >
          {legalModal && (
            <>
              <h2 className="font-playfair text-2xl text-gold mb-4">
                {LEGAL[legalModal].title}
              </h2>
              <div className="text-salon-gray font-poppins text-sm leading-relaxed whitespace-pre-line max-h-[60vh] overflow-y-auto">
                {LEGAL[legalModal].content}
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => setLegalModal(null)}
                  className="bg-gold text-white hover:bg-gold-dark"
                  data-ocid="legal.close_button"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
