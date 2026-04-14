import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Phone, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "Over ons", href: "#over-ons" },
  { label: "Contact", href: "#contact" },
];

interface NavigationProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Navigation({ cartCount, onCartClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <span
                className="text-[1.6rem] tracking-[0.12em] uppercase"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  color: "#D4AF77",
                  letterSpacing: "0.15em",
                }}
              >
                Bliss
              </span>
              <span
                className="text-[1.6rem] tracking-[0.12em] uppercase"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  color: "#ffffff",
                  letterSpacing: "0.15em",
                }}
              >
                Bone
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77] to-transparent opacity-60" />
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="relative group text-white/80 hover:text-[#D4AF77] transition-colors duration-300"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF77] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/31612345678"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-2 text-white/70 hover:text-[#D4AF77] transition-colors duration-300"
              title="WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.551 4.1 1.515 5.832L.057 23.082a.75.75 0 00.92.92l5.335-1.459A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.703 9.703 0 01-4.949-1.352l-.355-.21-3.687 1.008 1.011-3.617-.23-.371A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
            </a>

            <button
              onClick={onCartClick}
              className="relative flex items-center justify-center w-10 h-10 text-white/80 hover:text-[#D4AF77] transition-colors duration-300"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4AF77] text-[#111] flex items-center justify-center"
                  style={{ fontSize: "0.65rem", fontWeight: 700 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white/80 hover:text-[#D4AF77] transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-md border-b border-[#D4AF77]/20"
          >
            <div className="flex flex-col py-6 px-8 gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-white/80 hover:text-[#D4AF77] transition-colors text-left"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://wa.me/31612345678"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-[#D4AF77] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", letterSpacing: "0.08em" }}
              >
                <Phone size={16} />
                +31 6 12 34 56 78
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
