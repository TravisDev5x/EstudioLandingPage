"use client";
import LandingNavbar from "@/app/(landing)/_components/Navbar";
import LandingFooter from "@/app/(landing)/_components/Footer";
import { Button, Card, CardContent, Chip } from "@heroui/react";
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
      <div className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full bg-[#4f46e5] blur-[80px] opacity-[0.15] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full bg-[#0ea5e9] blur-[80px] opacity-[0.15] pointer-events-none" />
      <div className="absolute top-1/2 right-[15%] w-[250px] h-[250px] rounded-full bg-[#7c3aed] blur-[80px] opacity-[0.12] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/[0.08] text-[13px] text-indigo-300">
          <Music size={12} />
          Estudio de grabación · Ecatepec
        </div>

        <h1 className="font-medium leading-[1.1] tracking-[-0.02em] text-[clamp(40px,8vw,80px)]">
          <span className="text-white">Donde nacen</span>
          <br />
          <span className="text-indigo-400/90">las ideas.</span>
        </h1>

        <p className="text-[18px] text-white/50 max-w-[520px]">
          Grabación, producción musical y clases en un espacio diseñado para artistas serios.
        </p>

        <div className="flex items-center gap-3 mt-2">
          <Button variant="primary" size="lg" className="flex items-center gap-2">
            <Calendar size={16} />
            Reservar sesión
          </Button>
          <Button variant="ghost" size="lg" className="flex items-center gap-2">
            <Play size={16} />
            Escuchar muestras
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-[scroll-bounce_2s_ease-in-out_infinite]">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-[120px] px-6">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="flex flex-col gap-5">
          <p className="text-[11px] uppercase tracking-[0.15em] text-indigo-400/80">Nosotros</p>
          <h2 className="font-medium leading-tight text-[clamp(28px,4vw,42px)] text-white/90">
            Un espacio para crear sin límites
          </h2>
          <p className="text-[16px] text-white/55 leading-[1.8]">
            Somos un estudio independiente en Ecatepec enfocado en música electrónica, producción y
            formación de artistas. Cada proyecto recibe atención personalizada.
          </p>
          <div className="flex items-start gap-8 mt-2">
            {(
              [
                ["5+", "Años de experiencia"],
                ["200+", "Proyectos grabados"],
                ["50+", "Artistas formados"],
              ] as const
            ).map(([num, label]) => (
              <div key={label}>
                <p className="text-[32px] font-medium text-white leading-none mb-1">{num}</p>
                <p className="text-[12px] text-white/40">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="border border-white/[0.07] bg-white/[0.03]">
          <CardContent className="flex items-center justify-center p-0" style={{ aspectRatio: "4/3" }}>
            <div className="flex flex-col items-center gap-2 text-white/20">
              <ImageIcon size={32} />
              <span className="text-[13px]">Foto del estudio</span>
            </div>
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
    <section id="servicios" className="py-[120px] px-6 bg-white/[0.015]">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-indigo-400/80 mb-3">Servicios</p>
          <h2 className="font-medium text-[clamp(28px,4vw,42px)] text-white/90">
            Todo lo que necesitas para crear
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="border border-white/[0.07] bg-white/[0.03] hover:border-indigo-500/40 hover:bg-indigo-500/[0.05] transition-all duration-200"
            >
              <CardContent className="p-8 flex flex-col gap-4">
                <Icon size={28} className="text-indigo-400" />
                <h3 className="text-[17px] font-medium text-white/90">{title}</h3>
                <p className="text-[14px] text-white/50 leading-relaxed">{desc}</p>
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
    variant: "primary" as const,
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
    <section id="precios" className="py-[120px] px-6">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-indigo-400/80 mb-3">Precios</p>
          <h2 className="font-medium text-[clamp(28px,4vw,42px)] text-white/90">
            Planes simples y transparentes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`border transition-all duration-200 ${
                plan.highlight
                  ? "border-indigo-500/50 bg-indigo-500/[0.08]"
                  : "border-white/[0.07] bg-white/[0.03]"
              }`}
            >
              <CardContent className="p-6 flex flex-col gap-5">
                {plan.highlight && (
                  <Chip size="sm" variant="soft" className="self-start text-indigo-300 bg-indigo-500/20">
                    Popular
                  </Chip>
                )}
                <div>
                  <h3 className="text-[17px] font-medium text-white/90 mb-1">{plan.name}</h3>
                  <p className="text-[22px] font-medium text-white">{plan.price}</p>
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[14px] text-white/60">
                      <CheckCircle2 size={14} className="text-green-400 shrink-0" />
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
    <section id="blog" className="py-[120px] px-6 bg-white/[0.015]">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-indigo-400/80 mb-3">Blog</p>
          <h2 className="font-medium text-[clamp(28px,4vw,42px)] text-white/90">
            Recursos para productores
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="border border-white/[0.07] bg-white/[0.03] overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-center">
                  <ImageIcon size={22} className="text-white/20" />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <Chip size="sm" variant="soft" className="self-start text-indigo-300 bg-indigo-500/[0.12]">
                    {post.category}
                  </Chip>
                  <h3 className="text-[15px] font-medium text-white/90 leading-snug">{post.title}</h3>
                  <p className="text-[13px] text-white/45 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-[13px] text-indigo-400/80 hover:text-indigo-300 transition-colors"
                  >
                    Leer más →
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <a href="/blog" className="text-[14px] text-indigo-400/80 hover:text-indigo-300 transition-colors">
            Ver todos los posts →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="contacto" className="py-[120px] px-6">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-indigo-400/80 mb-3">Contacto</p>
          <h2 className="font-medium text-[clamp(28px,4vw,42px)] text-white/90">
            Hablemos de tu proyecto
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="flex flex-col gap-5">
            {(
              [
                { Icon: MapPin, text: "Ecatepec, Estado de México" },
                { Icon: Mail, text: "contacto@studio.mx" },
                { Icon: Phone, text: "+52 55 XXXX XXXX" },
              ] as const
            ).map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-[15px] text-white/60">
                <Icon size={16} className="text-indigo-400/70 shrink-0" />
                {text}
              </div>
            ))}
            <div className="flex items-center gap-3 mt-2">
              <button
                className="p-2 rounded-lg border border-white/[0.07] text-white/40 hover:text-white/70 hover:border-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Music size={16} />
              </button>
              <button
                className="p-2 rounded-lg border border-white/[0.07] text-white/40 hover:text-white/70 hover:border-white/20 transition-colors"
                aria-label="SoundCloud"
              >
                <Music size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-white/60">Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-[14px] text-white/90 placeholder:text-white/25 outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-white/60">Email</label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-[14px] text-white/90 placeholder:text-white/25 outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-white/60">Mensaje</label>
              <textarea
                rows={4}
                placeholder="Cuéntanos sobre tu proyecto..."
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-[14px] text-white/90 placeholder:text-white/25 outline-none focus:border-indigo-500/50 transition-colors resize-none"
              />
            </div>
            <Button variant="primary" className="w-full mt-1">
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
    <div className="bg-[#0a0e1a] text-white overflow-x-hidden">
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
