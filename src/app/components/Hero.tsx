import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const heroImage = "https://images.unsplash.com/photo-1681772811347-7948dafa728a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjB3YXJtJTIwbHV4dXJ5JTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc3NjA5MjU2M3ww&ixlib=rb-4.1.0&q=80&w=1920";

export function Hero() {
  const scrollToShop = () => {
    const el = document.getElementById("shop");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    const el = document.getElementById("over-ons");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={heroImage}
          alt="Golden Retriever – premium en natuurlijk hondenleven bij BlissBone"
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layer dark overlay for luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/75 via-[#0a0a0a]/50 to-[#0a0a0a]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/40" />
      </div>

      {/* Gold decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/50 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-[#D4AF77]/60 hidden sm:block" />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#D4AF77",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Gecertificeerd volgens EU-normen · PL 14128301 WE
          </span>
          <div className="h-px w-8 bg-[#D4AF77]/60 hidden sm:block" />
        </motion.div>

        {/* Logo Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <div className="relative inline-block">
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 9vw, 7rem)",
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <span className="text-[#D4AF77]">100% Natuurlijke</span>
            </h1>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 9vw, 7rem)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#ffffff",
              }}
            >
              Hondensnacks
            </h1>
          </div>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF77]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF77]" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF77]" />
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-12 max-w-xl"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.02em",
            fontWeight: 300,
          }}
        >
          Pure, natuurlijke, EU-gecertificeerde hondensnacks zonder chemicaliën
          en kunstmatige toevoegingen.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={scrollToShop}
            className="group relative overflow-hidden px-10 py-4 transition-all duration-500"
            style={{
              background: "linear-gradient(135deg, #D4AF77 0%, #C9A66B 50%, #B8925A 100%)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#111111",
            }}
          >
            <span className="relative z-10">Bekijk producten</span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-all duration-300" />
          </button>

          <button
            onClick={scrollToAbout}
            className="group relative px-10 py-4 border border-white/40 hover:border-[#D4AF77] transition-all duration-500 overflow-hidden"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <span className="relative z-10 group-hover:text-[#D4AF77] transition-colors duration-300">Meer over ons</span>
            <div className="absolute inset-0 bg-[#D4AF77]/0 group-hover:bg-[#D4AF77]/5 transition-all duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToShop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-[#D4AF77] transition-colors duration-300"
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Ontdek meer
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
    </section>
  );
}
