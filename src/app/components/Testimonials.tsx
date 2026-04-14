import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sophie van den Berg",
    location: "Amsterdam",
    rating: 5,
    text: "Mijn Labrador Finn is verzot op de kippenpoten! Heerlijk om te weten dat er geen rotzooi in zit. Al maanden trouw klant bij BlissBone.",
    avatar: "S",
    product: "Kippenpoten",
  },
  {
    id: 2,
    name: "Thomas Janssen",
    location: "Rotterdam",
    rating: 5,
    text: "Eindelijk een merk dat doet wat het belooft — 100% puur en EU-gecertificeerd. De rundvleesreepjes zijn de favoriet van onze Border Collie.",
    avatar: "T",
    product: "Rundvleesreepjes",
  },
  {
    id: 3,
    name: "Lisa de Vries",
    location: "Utrecht",
    rating: 5,
    text: "Onze dierenarts heeft BlissBone aanbevolen voor onze gevoelige Beagle. De lamslong is perfect — licht verteerbaar en snel bezorgd!",
    avatar: "L",
    product: "Lamslong",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[#0d0d0d] py-24 lg:py-28 relative overflow-hidden">
      {/* Decorative gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/30 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
              Klantbeoordelingen
            </span>
            <div className="h-px w-10 bg-[#D4AF77]/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.15,
            }}
          >
            Wat onze klanten zeggen
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative bg-[#111111] border border-[#D4AF77]/10 p-8 hover:border-[#D4AF77]/25 transition-all duration-500 group"
            >
              {/* Quote icon */}
              <Quote size={28} className="text-[#D4AF77]/20 mb-5" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={13} className="text-[#D4AF77] fill-[#D4AF77]" />
                ))}
              </div>

              {/* Text */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                  fontStyle: "italic",
                }}
              >
                "{t.text}"
              </p>

              {/* Product tag */}
              <span
                className="inline-block px-3 py-1 mb-5"
                style={{
                  background: "rgba(212,175,119,0.08)",
                  border: "1px solid rgba(212,175,119,0.2)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#D4AF77",
                }}
              >
                {t.product}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#D4AF77]/10">
                <div
                  className="w-9 h-9 flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #D4AF77, #C9A66B)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#111111",
                    }}
                  >
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    {t.location}
                  </p>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF77]/15 group-hover:border-[#D4AF77]/40 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-14 p-8 border border-[#D4AF77]/10"
        >
          <div className="text-center">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "3.5rem",
                fontWeight: 700,
                color: "#D4AF77",
                lineHeight: 1,
              }}
            >
              4.9
            </p>
            <div className="flex gap-1 justify-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-[#D4AF77] fill-[#D4AF77]" />
              ))}
            </div>
          </div>
          <div className="hidden sm:block w-px h-16 bg-[#D4AF77]/20" />
          <div className="text-center sm:text-left">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 500,
              }}
            >
              Gebaseerd op 650+ beoordelingen
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.35)",
                marginTop: "4px",
              }}
            >
              Vertrouwd door honderden Nederlandse hondeneigenaren
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
