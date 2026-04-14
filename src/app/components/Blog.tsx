import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BlogPostPreview {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image?: string | null;
  category: string;
  createdAt: string;
}

const FALLBACK_POSTS: BlogPostPreview[] = [
  {
    id: 1,
    slug: "voordelen-natuurlijke-gryzakken-honden",
    title: "De 5 grootste voordelen van natuurlijke gryzakken voor uw hond",
    excerpt: "Waarom steeds meer hondenbaasjes kiezen voor 100% natuurlijke kauwsnacks — en wat de wetenschap erover zegt.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Gezondheid",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    slug: "droog-voer-versus-natuurlijke-snacks",
    title: "Droogvoer vs. natuurlijke snacks: wat is beter voor uw hond?",
    excerpt: "Een eerlijke vergelijking — inclusief voor- en nadelen van beide opties voor een gezond hondendieet.",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    category: "Voeding",
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: 3,
    slug: "eu-certificering-hondenvoer-uitleg",
    title: "Wat betekent EU-certificering voor hondenvoer?",
    excerpt: "Alles over veterinaire nummers, EU-keurmerken en waarom dit zo belangrijk is voor de veiligheid van uw hond.",
    image: "https://images.unsplash.com/photo-1649429398909-db7ae841f7f6?w=800&q=80",
    category: "Kwaliteit",
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPostPreview[]>(FALLBACK_POSTS);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data: BlogPostPreview[]) => {
        if (Array.isArray(data) && data.length > 0) setPosts(data.slice(0, 3));
      })
      .catch(() => {/* use fallback */});
  }, []);

  return (
    <section id="blog" className="bg-[#0d0d0d] py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/30 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <div className="h-px w-10 bg-[#D4AF77]/50" />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#D4AF77", fontWeight: 500 }}>
              Kennisbank
            </span>
            <div className="h-px w-10 bg-[#D4AF77]/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 600, color: "#ffffff", lineHeight: 1.15 }}
          >
            Nieuws & Advies
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-lg mx-auto"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.75 }}
          >
            Expert-artikelen over hondenvoeding, gezondheid en kwaliteit — speciaal voor Nederlandse hondenbaasjes.
          </motion.p>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col bg-[#111111] border border-[#D4AF77]/10 hover:border-[#D4AF77]/30 transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/9] bg-[#181818]">
                <ImageWithFallback
                  src={post.image || ""}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent" />
                {/* Category badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1" style={{ background: "rgba(212,175,119,0.15)", border: "1px solid rgba(212,175,119,0.3)" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF77", fontWeight: 600 }}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-3">
                {/* Date */}
                <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <Calendar size={11} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem" }}>
                    {formatDate(post.createdAt)}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="group-hover:text-[#D4AF77] transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: "#ffffff", lineHeight: 1.3 }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p
                  className="flex-1"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}
                >
                  {post.excerpt}
                </p>

                {/* Read more */}
                <div className="flex items-center gap-2 pt-2 mt-auto" style={{ color: "#D4AF77" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
                    Lees meer
                  </span>
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/30 to-transparent" />
    </section>
  );
}
