import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white pt-28 pb-[120px] px-6">
      <article className="max-w-[720px] mx-auto">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4 bg-indigo-500/[0.12] text-indigo-300 border-transparent">
            Producción
          </Badge>
          <h1 className="font-medium text-[clamp(28px,4vw,42px)] text-white/90 leading-tight mb-4">
            Título del artículo placeholder
          </h1>
          <div className="flex items-center gap-3 text-[13px] text-white/35">
            <span>8 de junio, 2026</span>
            <span>·</span>
            <span>5 min de lectura</span>
          </div>
        </div>

        {/* Hero image placeholder */}
        <div className="w-full aspect-video bg-white/[0.03] border border-white/[0.07] rounded-xl flex items-center justify-center mb-10">
          <div className="flex flex-col items-center gap-2 text-white/20">
            <ImageIcon size={32} />
            <span className="text-[13px]">Imagen del artículo</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5 text-[16px] text-white/60 leading-[1.8]">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <h2 className="text-[20px] font-medium text-white/85 mt-2">Subtítulo placeholder</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.07]">
          <Link
            href="/blog"
            className="text-[14px] text-indigo-400/80 hover:text-indigo-300 transition-colors"
          >
            ← Volver al blog
          </Link>
        </div>
      </article>
    </main>
  );
}
