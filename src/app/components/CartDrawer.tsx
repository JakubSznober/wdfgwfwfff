import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowLeft, CheckCircle, Tag } from "lucide-react";
import { CartItem } from "../context/CartContext";
import type { DiscountInfo } from "../context/CartContext";
import { formatPrice } from "../lib/price";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: DiscountInfo;
  onRemove: (productId: number) => void;
  onUpdateQty: (productId: number, delta: number) => void;
  onClearCart: () => void;
}

export function CartDrawer({ isOpen, onClose, items, discount, onRemove, onUpdateQty, onClearCart }: CartDrawerProps) {
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", postalCode: "" });
  const [paymentMethod, setPaymentMethod] = useState("IDEAL");
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const finalTotal = total - discount.amount;
  const FREE_SHIPPING = 50;

  const handleClose = () => {
    if (step === "success") {
      setForm({ name: "", email: "", address: "", city: "", postalCode: "" });
    }
    setStep("cart");
    onClose();
  };

  const handleOrder = async (e: FormEvent) => {
    e.preventDefault();
    setOrderError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          paymentMethod,
          discount: discount.amount,
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
        }),
      });
      if (!res.ok) { setOrderError("Bestelling mislukt. Probeer opnieuw."); return; }
      onClearCart();
      setStep("success");
    } catch {
      setOrderError("Verbinding mislukt. Probeer opnieuw.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full px-4 py-3 bg-[#0f0f0f] border border-[#D4AF77]/20 focus:border-[#D4AF77]/50 outline-none transition-colors text-white/90 text-sm";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0f0f0f] border-l border-[#D4AF77]/15 flex flex-col"
          >
            <div className="flex items-center justify-between px-7 py-6 border-b border-[#D4AF77]/10">
              <div className="flex items-center gap-3">
                {step === "checkout" && (
                  <button onClick={() => setStep("cart")} className="text-white/40 hover:text-white mr-1">
                    <ArrowLeft size={18} />
                  </button>
                )}
                <ShoppingBag size={20} className="text-[#D4AF77]" />
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#ffffff" }}>
                  {step === "checkout" ? "Afrekenen" : step === "success" ? "Bestelling geplaatst" : "Winkelmand"}
                </span>
                {step === "cart" && (
                  <span className="px-2 py-0.5" style={{ background: "rgba(212,175,119,0.1)", border: "1px solid rgba(212,175,119,0.2)", fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "#D4AF77" }}>
                    {items.length}
                  </span>
                )}
              </div>
              <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {step === "success" && (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-8">
                  <CheckCircle size={48} className="text-[#4ade80]" />
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#ffffff" }}>
                      Bedankt voor uw bestelling!
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", marginTop: "8px" }}>
                      Wij nemen zo snel mogelijk contact met u op voor betaling en bezorging.
                    </p>
                  </div>
                  <button onClick={handleClose} className="mt-2 px-8 py-3" style={{ background: "linear-gradient(135deg, #D4AF77, #C9A66B)", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "#111111" }}>
                    Doorgaan met winkelen
                  </button>
                </div>
              )}

              {step === "checkout" && (
                <form id="checkout-form" onSubmit={handleOrder} className="px-7 py-5 flex flex-col gap-5">
                  {orderError && <div className="px-4 py-3 text-sm" style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>{orderError}</div>}
                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Naam *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>E-mailadres *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Adres</label>
                    <input type="text" value={form.address} onChange={(e) => setForm(p => ({ ...p, address: e.target.value }))} className={inputCls} placeholder="Straatnaam + huisnummer" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Postcode</label>
                      <input type="text" value={form.postalCode} onChange={(e) => setForm(p => ({ ...p, postalCode: e.target.value }))} className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Stad</label>
                      <input type="text" value={form.city} onChange={(e) => setForm(p => ({ ...p, city: e.target.value }))} className={inputCls} />
                    </div>
                  </div>
                  <div className="mt-2 p-4 border border-[#D4AF77]/10">
                    <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>Betaalwijze</p>
                    {[
                      { id: "IDEAL", label: "iDEAL", sub: "Betaal direct via uw bank" },
                      { id: "BANK_TRANSFER", label: "Bankoverschrijving", sub: "Betaal na ontvangst factuur" },
                      { id: "CREDITCARD", label: "Creditcard", sub: "Visa / Mastercard" },
                    ].map((m) => (
                      <label
                        key={m.id}
                        className="flex items-center gap-3 py-2.5 px-3 mb-1 cursor-pointer transition-colors"
                        style={{
                          background: paymentMethod === m.id ? "rgba(212,175,119,0.08)" : "transparent",
                          border: `1px solid ${paymentMethod === m.id ? "rgba(212,175,119,0.3)" : "transparent"}`,
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={m.id}
                          checked={paymentMethod === m.id}
                          onChange={() => setPaymentMethod(m.id)}
                          className="accent-[#D4AF77]"
                        />
                        <div>
                          <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.8)", fontFamily: "'Inter', sans-serif" }}>{m.label}</p>
                          <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>{m.sub}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="mt-2 p-4 border border-[#D4AF77]/10">
                    <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>Samenvatting</p>
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between mb-1.5">
                        <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>{item.quantity}x {item.product.name}</span>
                        <span style={{ fontSize: "0.8rem", color: "#D4AF77" }}>{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t border-[#D4AF77]/10 mt-3 pt-3">
                      {discount.amount > 0 && (
                        <div className="flex justify-between mb-1.5">
                          <span style={{ fontSize: "0.8rem", color: "#D4AF77" }}>{discount.percent}% korting</span>
                          <span style={{ fontSize: "0.8rem", color: "#D4AF77" }}>-{formatPrice(discount.amount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>Totaal</span>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#D4AF77", fontWeight: 600 }}>{formatPrice(finalTotal)}</span>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {step === "cart" && (items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
                  <ShoppingBag size={40} className="text-[#D4AF77]/20" />
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "rgba(255,255,255,0.3)" }}>Uw winkelmand is leeg</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.2)" }}>Voeg producten toe om door te gaan</p>
                  <button onClick={handleClose} className="mt-2 px-8 py-3" style={{ background: "linear-gradient(135deg, #D4AF77, #C9A66B)", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "#111111" }}>
                    Ga winkelen
                  </button>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-[#D4AF77]/8">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 px-7 py-5">
                      <div className="w-20 h-20 shrink-0 overflow-hidden bg-[#1a1a1a]">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 600, color: "#ffffff", lineHeight: 1.2 }}>{item.product.name}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "#D4AF77", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>{item.product.category}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#D4AF77]/20">
                            <button onClick={() => onUpdateQty(item.product.id, -1)} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-[#D4AF77] transition-colors"><Minus size={12} /></button>
                            <span className="w-8 text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>{item.quantity}</span>
                            <button onClick={() => onUpdateQty(item.product.id, 1)} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-[#D4AF77] transition-colors"><Plus size={12} /></button>
                          </div>
                          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: "#D4AF77" }}>{formatPrice(item.product.price)}</span>
                        </div>
                      </div>
                      <button onClick={() => onRemove(item.product.id)} className="text-white/20 hover:text-red-400 transition-colors self-start mt-1"><Trash2 size={15} /></button>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {step !== "success" && items.length > 0 && (
              <div className="border-t border-[#D4AF77]/10 px-7 py-6 flex flex-col gap-4">
                {step === "cart" && (
                  <>
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>Gratis verzending vanaf {formatPrice(FREE_SHIPPING)}</span>
                      {total < FREE_SHIPPING && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#D4AF77" }}>Nog {formatPrice(FREE_SHIPPING - total)}</span>}
                    </div>
                    <div className="h-px bg-[#D4AF77]/10 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D4AF77] to-[#E8C78F] transition-all duration-500" style={{ width: `${Math.min((total / FREE_SHIPPING) * 100, 100)}%`, height: "2px", top: "-0.5px" }} />
                    </div>
                    {discount.nextTier ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.45)" }}>
                            Voeg <span style={{ color: "#D4AF77" }}>{formatPrice(discount.amountToNextTier)}</span> toe voor <span style={{ color: "#D4AF77" }}>{discount.nextTier.percent}% korting</span>
                          </span>
                        </div>
                        <div className="h-px bg-[#D4AF77]/10 relative overflow-hidden">
                          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D4AF77]/60 to-[#D4AF77] transition-all duration-500" style={{ width: `${Math.min((total / discount.nextTier.threshold) * 100, 100)}%`, height: "2px", top: "-0.5px" }} />
                        </div>
                      </div>
                    ) : discount.percent > 0 ? (
                      <div className="h-px bg-[#D4AF77]/10 relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D4AF77] to-[#E8C78F]" style={{ width: "100%", height: "2px", top: "-0.5px" }} />
                      </div>
                    ) : null}
                    {discount.percent > 0 && (
                      <div className="flex items-center justify-between px-3 py-2" style={{ background: "rgba(212,175,119,0.08)", border: "1px solid rgba(212,175,119,0.2)" }}>
                        <div className="flex items-center gap-2">
                          <Tag size={12} style={{ color: "#D4AF77" }} />
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "#D4AF77", letterSpacing: "0.08em" }}>{discount.percent}% korting toegepast</span>
                        </div>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#D4AF77", fontWeight: 600 }}>-{formatPrice(discount.amount)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between py-2">
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Totaal</span>
                      <div className="flex flex-col items-end gap-0.5">
                        {discount.amount > 0 && (
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", textDecoration: "line-through" }}>{formatPrice(total)}</span>
                        )}
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: "#D4AF77" }}>{formatPrice(finalTotal)}</span>
                      </div>
                    </div>
                  </>
                )}
                {step === "cart" ? (
                  <button onClick={() => setStep("checkout")} className="group relative w-full py-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #D4AF77 0%, #C9A66B 50%, #B8925A 100%)", fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "#111111" }}>
                    <span className="relative z-10">Afrekenen</span>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-all duration-300" />
                  </button>
                ) : (
                  <button type="submit" form="checkout-form" disabled={submitting} className="group relative w-full py-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #D4AF77 0%, #C9A66B 50%, #B8925A 100%)", fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "#111111", opacity: submitting ? 0.7 : 1 }}>
                    <span className="relative z-10">{submitting ? "Bezig..." : "Bestelling plaatsen"}</span>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-all duration-300" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
