import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon } from "lucide-react";

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
    <main className="min-h-screen bg-[#0a0e1a] text-white pt-28 pb-[120px] px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-indigo-400/80 mb-3">Blog</p>
          <h1 className="font-medium text-[clamp(28px,4vw,48px)] text-white/90 mb-3">
            Recursos para productores
          </h1>
          <p className="text-[16px] text-white/45 max-w-md mx-auto">
            Tutoriales, técnicas y análisis de equipo para artistas independientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-white/[0.07] bg-white/[0.03] rounded-xl overflow-hidden hover:border-indigo-500/30 hover:bg-indigo-500/[0.03] transition-all duration-200"
            >
              <div className="aspect-video bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-center">
                <ImageIcon size={22} className="text-white/20" />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <Badge variant="secondary" className="self-start bg-indigo-500/[0.12] text-indigo-300 border-transparent">
                  {post.category}
                </Badge>
                <h2 className="text-[15px] font-medium text-white/90 leading-snug group-hover:text-white transition-colors">
                  {post.title}
                </h2>
                <p className="text-[13px] text-white/45 leading-relaxed line-clamp-2">{post.excerpt}</p>
                <span className="text-[13px] text-indigo-400/80 group-hover:text-indigo-300 transition-colors">
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
