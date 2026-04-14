import { motion } from "motion/react";
import { ShoppingCart, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { formatPrice } from "../lib/price";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  badge?: string | null;
  category: string;
  rating: number;
  reviews: number;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex flex-col bg-[#111111] border border-[#D4AF77]/10 hover:border-[#D4AF77]/30 transition-all duration-500 overflow-hidden"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
    >
      {/* Badge */}
      {product.badge && (
        <div
          className="absolute top-4 left-4 z-10 px-3 py-1"
          style={{
            background: "linear-gradient(135deg, #D4AF77, #C9A66B)",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#111111",
              fontWeight: 700,
            }}
          >
            {product.badge}
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-[#181818]">
        <ImageWithFallback
          src={product.image}
          alt={`${product.name} – natuurlijke hondensnack van BlissBone`}
          className="w-full h-full object-cover"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 700ms ease" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick add overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <button
            onClick={() => onAddToCart(product)}
            className="w-full py-3 text-center transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #D4AF77 0%, #C9A66B 100%)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#111111",
            }}
          >
            Snel toevoegen
          </button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#D4AF77",
            fontWeight: 500,
          }}
        >
          {product.category}
        </span>

        {/* Name */}
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < Math.floor(product.rating) ? "text-[#D4AF77] fill-[#D4AF77]" : "text-[#D4AF77]/30"}
            />
          ))}
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            ({product.reviews})
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.65,
            flexGrow: 1,
          }}
        >
          {product.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[#D4AF77]/20 via-[#D4AF77]/10 to-transparent mt-1" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "#D4AF77",
                lineHeight: 1,
              }}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice != null && (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.3)",
                  textDecoration: "line-through",
                }}
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="group/btn relative flex items-center gap-2 px-5 py-3 overflow-hidden transition-all duration-400"
            style={{
              border: "1px solid rgba(212, 175, 119, 0.4)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#D4AF77",
            }}
          >
            <ShoppingCart size={13} />
            <span>Toevoegen</span>
            <div
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #D4AF77 0%, #C9A66B 100%)" }}
            />
            <span className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              style={{ color: "#111111", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}
            >
              <ShoppingCart size={13} />
              Toevoegen
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}