import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Recursos para Productores",
  description: "Artículos, tutoriales y recursos sobre producción musical, síntesis, mezcla y equipo de estudio.",
};

const posts = [
  { slug: "sintesis-primer-set", category: "Producción", title: "Cómo armar tu primer set de síntesis", excerpt: "Guía paso a paso para productores que comienzan en el mundo del synthesis analógico y virtual." },
  { slug: "mezcla-en-el-cuarto", category: "Técnica", title: "Mezcla en el cuarto: errores comunes", excerpt: "Los errores que todo productor comete al mezclar en casa y cómo evitarlos con equipo accesible." },
  { slug: "plugins-esenciales-techno", category: "Equipo", title: "5 plugins esenciales para Techno y Trance", excerpt: "Una selección curada de plugins que definen el sonido de los géneros electrónicos más populares." },
  { slug: "sidechaining-tecnicas", category: "Técnica", title: "Sidechaining: técnicas avanzadas", excerpt: "Más allá del sidechain básico con compresor: cómo usar multiband y volume shaping para resultados pro." },
  { slug: "hardware-software-workflow", category: "Producción", title: "Hardware vs Software en 2026", excerpt: "Un análisis honesto de cuándo vale la pena invertir en hardware y cuándo el software es suficiente." },
  { slug: "mastering-en-casa", category: "Equipo", title: "Guía de mastering en casa", excerpt: "Principios fundamentales para hacer un master decente sin una sala de mastering profesional." },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-28 pb-[120px] px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-primary mb-3">Blog</p>
          <h1 className="font-medium text-[clamp(28px,4vw,48px)] text-foreground mb-3">
            Recursos para productores
          </h1>
          <p className="text-[16px] text-muted-foreground max-w-md mx-auto">
            Tutoriales, técnicas y análisis de equipo para artistas independientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-border bg-card rounded-xl overflow-hidden hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
            >
              <div className="aspect-video bg-muted border-b border-border flex items-center justify-center">
                <ImageIcon size={22} className="text-muted-foreground" />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <Badge variant="secondary" className="self-start bg-primary/10 text-primary border-transparent">
                  {post.category}
                </Badge>
                <h2 className="text-[15px] font-medium text-foreground leading-snug group-hover:text-foreground transition-colors">
                  {post.title}
                </h2>
                <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                <span className="text-[13px] text-primary group-hover:text-primary/70 transition-colors">
                  Leer más →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
