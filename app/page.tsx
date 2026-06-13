"use client";
import Link from "next/link";
import Image from "next/image";
import LandingNavbar from "@/app/(landing)/_components/Navbar";
import LandingFooter from "@/app/(landing)/_components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Play,
  ChevronDown,
  Mic,
  Music,
  BookOpen,
  Image as ImageIcon,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

// ── Hero ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Image
        src="https://res.cloudinary.com/deh81ozjh/image/upload/v1781315541/Panoramica2_floikl.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-white/35 dark:bg-black/70 transition-colors duration-300" />

      <div className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full bg-primary/20 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full bg-primary/20 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-[15%] w-[250px] h-[250px] rounded-full bg-primary/20 blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl rounded-3xl bg-background/60 backdrop-blur-md px-6 py-10 sm:px-12 sm:py-14">
        <h1 className="font-medium leading-[1.1] tracking-[-0.02em] text-[clamp(40px,8vw,80px)]">
          <span className="text-foreground">Donde nacen</span>
          <br />
          <span className="text-primary">las ideas.</span>
        </h1>

        <p className="text-[18px] text-muted-foreground max-w-[520px]">
          Grabación, producción musical y clases en un espacio diseñado para artistas serios.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
          <Button size="lg" className="flex items-center gap-2 px-6 w-full sm:w-auto">
            <Calendar size={16} />
            Reservar sesión
          </Button>
          <Button variant="ghost" size="lg" className="flex items-center gap-2 px-6 w-full sm:w-auto">
            <Play size={16} />
            Escuchar muestras
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-[scroll-bounce_2s_ease-in-out_infinite]">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-[120px] px-6">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-20 items-center">
        <div className="flex flex-col gap-5">
          <p className="text-[11px] uppercase tracking-[0.15em] text-primary">Nosotros</p>
          <h2 className="font-medium leading-tight text-[clamp(28px,4vw,42px)] text-foreground">
            Un espacio para crear sin límites
          </h2>
          <p className="text-[16px] text-muted-foreground leading-[1.8]">
            Somos un estudio independiente en Ecatepec enfocado en música electrónica, producción y
            formación de artistas. Cada proyecto recibe atención personalizada.
          </p>
        </div>

        <Card className="py-0 gap-0">
          <CardContent className="p-0 overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <Image
              src="https://res.cloudinary.com/deh81ozjh/image/upload/v1781315539/Frontal1_ufulj4.png"
              alt="Sala de producción del estudio"
              width={800}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────
const services = [
  {
    icon: Mic,
    title: "Grabación",
    desc: "Sala acondicionada acústicamente con equipo profesional para vocales e instrumentos.",
  },
  {
    icon: Music,
    title: "Producción Musical",
    desc: "Producción completa desde el concepto hasta la mezcla final. Trance, Techno y géneros electrónicos.",
  },
  {
    icon: BookOpen,
    title: "Clases",
    desc: "Aprende producción, síntesis y mezcla con metodología práctica y enfoque profesional.",
  },
];

function ServicesSection() {
  return (
    <section id="servicios" className="py-16 sm:py-24 lg:py-[120px] px-6 bg-muted/30">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-primary mb-3">Servicios</p>
          <h2 className="font-medium text-[clamp(28px,4vw,42px)] text-foreground">
            Todo lo que necesitas para crear
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="py-0 gap-0 hover:ring-primary/40 hover:bg-primary/5 transition-all duration-200"
            >
              <CardContent className="p-8 flex flex-col gap-4">
                <Icon size={28} className="text-primary" />
                <h3 className="text-[17px] font-medium text-foreground">{title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────
const pricingPlans = [
  {
    name: "Sesión",
    price: "$XXX / hora",
    highlight: false,
    features: ["Sala principal", "Técnico incluido", "2 horas mínimo", "Mezcla básica"],
    cta: "Consultar",
    variant: "ghost" as const,
  },
  {
    name: "Paquete",
    price: "$X,XXX / mes",
    highlight: true,
    features: [
      "Acceso mensual 20h",
      "Técnico incluido",
      "Mezcla profesional",
      "Master incluido",
      "Distribución digital",
      "1 videoclip simple",
    ],
    cta: "Reservar",
    variant: "default" as const,
  },
  {
    name: "Membresía",
    price: "$X,XXX / mes",
    highlight: false,
    features: [
      "Acceso ilimitado",
      "Uso de equipos",
      "Clases incluidas",
      "Comunidad privada",
      "Descuentos exclusivos",
    ],
    cta: "Consultar",
    variant: "ghost" as const,
  },
];

function PricingSection() {
  return (
    <section id="precios" className="py-16 sm:py-24 lg:py-[120px] px-6">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-primary mb-3">Precios</p>
          <h2 className="font-medium text-[clamp(28px,4vw,42px)] text-foreground">
            Planes simples y transparentes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`py-0 gap-0 transition-all duration-200 ${
                plan.highlight ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardContent className="p-6 flex flex-col gap-5">
                {plan.highlight && (
                  <Badge variant="secondary" className="self-start bg-primary/20 text-primary border-transparent">
                    Popular
                  </Badge>
                )}
                <div>
                  <h3 className="text-[17px] font-medium text-foreground mb-1">{plan.name}</h3>
                  <p className="text-[22px] font-medium text-foreground">{plan.price}</p>
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[14px] text-muted-foreground">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.variant} className="w-full mt-2">
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Blog Preview ──────────────────────────────────────────────────
const blogPosts = [
  {
    slug: "sintesis-primer-set",
    category: "Producción",
    title: "Cómo armar tu primer set de síntesis",
    excerpt: "Guía paso a paso para productores que comienzan en el mundo del synthesis analógico y virtual.",
  },
  {
    slug: "mezcla-en-el-cuarto",
    category: "Técnica",
    title: "Mezcla en el cuarto: errores comunes",
    excerpt: "Los errores que todo productor comete al mezclar en casa y cómo evitarlos con equipo accesible.",
  },
  {
    slug: "plugins-esenciales-techno",
    category: "Equipo",
    title: "5 plugins esenciales para Techno y Trance",
    excerpt: "Una selección curada de plugins que definen el sonido de los géneros electrónicos más populares.",
  },
];

function BlogPreviewSection() {
  return (
    <section id="blog" className="py-16 sm:py-24 lg:py-[120px] px-6 bg-muted/30">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-primary mb-3">Blog</p>
          <h2 className="font-medium text-[clamp(28px,4vw,42px)] text-foreground">
            Recursos para productores
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="py-0 gap-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted border-b border-border flex items-center justify-center">
                  <ImageIcon size={22} className="text-muted-foreground" />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <Badge variant="secondary" className="self-start bg-primary/10 text-primary border-transparent">
                    {post.category}
                  </Badge>
                  <h3 className="text-[15px] font-medium text-foreground leading-snug">{post.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[13px] text-primary hover:text-primary/70 transition-colors"
                  >
                    Leer más →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Link href="/blog" className="text-[14px] text-primary hover:text-primary/70 transition-colors">
            Ver todos los posts →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="contacto" className="py-16 sm:py-24 lg:py-[120px] px-6">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-primary mb-3">Contacto</p>
          <h2 className="font-medium text-[clamp(28px,4vw,42px)] text-foreground">
            Hablemos de tu proyecto
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-20">
          <div className="flex flex-col gap-5">
            {(
              [
                { Icon: MapPin, text: "Ecatepec, Estado de México" },
                { Icon: Mail, text: "contacto@studio.mx" },
                { Icon: Phone, text: "+52 55 XXXX XXXX" },
              ] as const
            ).map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-[15px] text-muted-foreground">
                <Icon size={16} className="text-primary/70 shrink-0" />
                {text}
              </div>
            ))}
            <div className="flex items-center gap-3 mt-2">
              <button
                className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Music size={16} />
              </button>
              <button
                className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
                aria-label="SoundCloud"
              >
                <Music size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-muted-foreground">Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full rounded-lg bg-input/30 border border-input px-3 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-muted-foreground">Email</label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-lg bg-input/30 border border-input px-3 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-muted-foreground">Mensaje</label>
              <textarea
                rows={4}
                placeholder="Cuéntanos sobre tu proyecto..."
                className="w-full rounded-lg bg-input/30 border border-input px-3 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <Button className="w-full mt-1">
              Enviar mensaje
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <LandingNavbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PricingSection />
      <BlogPreviewSection />
      <ContactSection />
      <LandingFooter />
    </div>
  );
}
