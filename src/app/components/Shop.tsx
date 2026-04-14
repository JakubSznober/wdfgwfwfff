import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { SlidersHorizontal, ChevronDown, Search } from "lucide-react";
import { ProductCard, Product } from "./ProductCard";

const sortOptions = ["Populariteit", "Prijs: laag–hoog", "Prijs: hoog–laag", "Nieuwste"];

interface ShopProps {
  onAddToCart: (product: Product) => void;
}

export function Shop({ onAddToCart }: ShopProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [sortBy, setSortBy] = useState("Populariteit");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSort, setShowSort] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    if (!showSort) return;
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSort(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showSort]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(() => {/* silent fail – show empty state */})
      .finally(() => setLoading(false));
  }, []);

  const categories = ["Alle", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchCat = selectedCategory === "Alle" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Prijs: laag–hoog") return a.price - b.price;
    if (sortBy === "Prijs: hoog–laag") return b.price - a.price;
    if (sortBy === "Nieuwste") return b.id - a.id;
    return a.id - b.id;
  });


  return (
    <section id="shop" className="bg-[#0a0a0a] py-24 lg:py-32 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(212,175,119,0.5) 80px, rgba(212,175,119,0.5) 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(212,175,119,0.5) 80px, rgba(212,175,119,0.5) 81px)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">

        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <div className="h-px w-10 bg-[#D4AF77]/50" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#D4AF77",
                fontWeight: 500,
              }}
            >
              Onze collectie
            </span>
            <div className="h-px w-10 bg-[#D4AF77]/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            Premium Hondensnacks
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.75,
            }}
          >
            Elk product is met zorg geselecteerd — puur van oorsprong, rijk van smaak, zeker van kwaliteit.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-10"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-5 py-2 transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: selectedCategory === cat ? "#111111" : "rgba(255,255,255,0.5)",
                  background: selectedCategory === cat
                    ? "linear-gradient(135deg, #D4AF77, #C9A66B)"
                    : "transparent",
                  border: selectedCategory === cat
                    ? "1px solid transparent"
                    : "1px solid rgba(212,175,119,0.2)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF77]/50" />
              <input
                type="text"
                placeholder="Zoeken..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-transparent border border-[#D4AF77]/20 focus:border-[#D4AF77]/50 outline-none transition-colors duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.7)",
                  width: "clamp(120px, 30vw, 180px)",
                }}
              />
            </div>

            {/* Sort */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 px-4 py-2.5 border border-[#D4AF77]/20 hover:border-[#D4AF77]/40 transition-colors"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <SlidersHorizontal size={13} className="text-[#D4AF77]" />
                {sortBy}
                <ChevronDown size={12} className={`transition-transform ${showSort ? "rotate-180" : ""}`} />
              </button>

              {showSort && (
                <div className="absolute right-0 top-full mt-1 z-20 bg-[#141414] border border-[#D4AF77]/20 min-w-[180px]">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setShowSort(false); }}
                      className="w-full px-4 py-3 text-left hover:bg-[#D4AF77]/10 transition-colors"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.72rem",
                        color: opt === sortBy ? "#D4AF77" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-[#111111] border border-[#D4AF77]/10 animate-pulse" />
            ))}
          </div>
        ) : sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {sorted.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Geen producten gevonden
            </p>
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center mt-14">
          <button
            className="group relative px-12 py-4 border border-[#D4AF77]/30 hover:border-[#D4AF77] overflow-hidden transition-all duration-400"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#D4AF77",
              fontWeight: 500,
            }}
          >
            <span className="relative z-10 group-hover:text-[#111] transition-colors duration-400">Meer laden</span>
            <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400"
              style={{ background: "linear-gradient(135deg, #D4AF77, #C9A66B)" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
