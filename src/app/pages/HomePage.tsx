import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { TrustBar } from "../components/TrustBar";
import { Shop } from "../components/Shop";
import { About } from "../components/About";
import { Testimonials } from "../components/Testimonials";
import { Blog } from "../components/Blog";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { CartDrawer } from "../components/CartDrawer";
import { Product } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle } from "lucide-react";

export function HomePage() {
  const { items, isOpen, openCart, closeCart, addToCart, removeFromCart, updateQty, clearCart, cartCount, discount } = useCart();
  const [notification, setNotification] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setNotification(product.name);
    setTimeout(() => setNotification(null), 2800);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0a0a0a", fontFamily: "'Inter', sans-serif" }}
    >
      {/* SEO Meta Info Note:
          meta title: "BlissBone | 100% Natuurlijke Hondensnacks – EU Goedgekeurd"
          meta description: "Ontdek BlissBone – premium gedroogde hondensnacks zonder chemicaliën, gemaakt in Polen. EU-goedgekeurd (vet. nr. 14128301). Bestel nu!"
          keywords: natuurlijke hondensnacks, hondensnack, gedroogde snacks, BlissBone
      */}

      <Navigation cartCount={cartCount} onCartClick={openCart} />
      <Hero />
      <TrustBar />
      <Shop onAddToCart={handleAddToCart} />
      <About />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isOpen}
        onClose={closeCart}
        items={items}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        onClearCart={clearCart}
        discount={discount}
      />

      {/* Add to Cart Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-4 w-[calc(100vw-2rem)] sm:w-auto"
            style={{
              background: "linear-gradient(135deg, #1a1a1a, #111111)",
              border: "1px solid rgba(212,175,119,0.3)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
              maxWidth: "400px",
            }}
          >
            <CheckCircle size={18} className="text-[#D4AF77] shrink-0" />
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                Toegevoegd aan winkelmand
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  color: "#D4AF77",
                }}
              >
                {notification}
              </p>
            </div>
            <button
              onClick={() => { setNotification(null); openCart(); }}
              className="ml-auto text-white/40 hover:text-[#D4AF77] transition-colors"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Bekijk
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
