import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Phone, Mail, BadgeCheck, MessageSquare, Send, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ContactSettings {
  contact_phone?: string;
  contact_email?: string;
}

function toWhatsappUrl(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  const intl = digits.startsWith('0') ? '31' + digits.slice(1) : digits;
  return `https://wa.me/${intl}`;
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<ContactSettings>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {/* use defaults */});
  }, []);

  const phone = settings.contact_phone || "+31 6 12 34 56 78";
  const email = settings.contact_email || "info@blissbone.nl";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        alert(data.error || "Versturen mislukt. Probeer opnieuw.");
      }
    } catch {
      alert("Verbinding mislukt. Probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-[#0a0a0a] py-24 lg:py-36 relative overflow-hidden">
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/40 to-transparent" />

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
              Neem contact op
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
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.15,
            }}
          >
            Wij staan voor u klaar
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-md mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.75,
            }}
          >
            Heeft u vragen over onze producten of wilt u een bestelling plaatsen? Neem direct contact op.
          </motion.p>
        </div>

        {/* B2B / Groothandel Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 p-8 lg:p-10 border border-[#D4AF77]/30 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(212,175,119,0.06) 0%, rgba(212,175,119,0.02) 100%)" }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF77]/50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF77]/50" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#D4AF77", fontWeight: 600, marginBottom: "10px" }}>
                Groothandel / B2B
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 1.15,
                  marginBottom: "10px",
                }}
              >
                Bent u een winkel of hondenschool?
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "520px" }}>
                Neem contact op voor groothandel​prijzen en kwantumkortingen.
                Wij leveren aan winkels, hondenscholen en horecabedrijven in heel Europa —
                met EU-gecertificeerde producten (erkend veterinair nr. PL 14128301 WE).
              </p>
            </div>
            <a
              href={`mailto:${email}?subject=B2B%20%2F%20Groothandel%20aanvraag`}
              className="shrink-0 group relative overflow-hidden px-8 py-4 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #D4AF77 0%, #C9A66B 100%)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#111111",
              }}
            >
              <span className="relative z-10">Neem contact op</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-all duration-300" />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            {/* Contact Cards */}
            <a
              href={toWhatsappUrl(phone)}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-5 p-6 border border-[#D4AF77]/10 hover:border-[#D4AF77]/40 transition-all duration-400"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-[#D4AF77]/25 group-hover:border-[#D4AF77]/70 shrink-0 transition-colors">
                <MessageSquare size={20} className="text-[#D4AF77]" />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#D4AF77",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  WhatsApp
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: "#ffffff",
                  }}
                >
                  {phone}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.35)",
                    marginTop: "4px",
                  }}
                >
                  Beschikbaar ma–za, 9:00–18:00
                </p>
              </div>
            </a>

            <a
              href={`mailto:${email}`}
              className="group flex items-start gap-5 p-6 border border-[#D4AF77]/10 hover:border-[#D4AF77]/40 transition-all duration-400"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-[#D4AF77]/25 group-hover:border-[#D4AF77]/70 shrink-0 transition-colors">
                <Mail size={20} className="text-[#D4AF77]" />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#D4AF77",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  E-mail
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: "#ffffff",
                  }}
                >
                  {email}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.35)",
                    marginTop: "4px",
                  }}
                >
                  Reactie binnen 24 uur
                </p>
              </div>
            </a>

            <div className="flex items-start gap-5 p-6 border border-[#D4AF77]/10">
              <div className="w-12 h-12 flex items-center justify-center border border-[#D4AF77]/25 shrink-0">
                <BadgeCheck size={20} className="text-[#D4AF77]" />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#D4AF77",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  Gecertificeerd volgens EU-normen
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: "#ffffff",
                  }}
                >
                  PL 14128301 WE
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.35)",
                    marginTop: "4px",
                  }}
                >
                  Erkend veterinair nummer
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-video overflow-hidden hidden lg:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1772186858744-afeefcc0049a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
                alt="Gelukkige hond – BlissBone klant"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
              <div className="absolute -top-2 -left-2 w-10 h-10 border-t border-l border-[#D4AF77]/40" />
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-[#111111] border border-[#D4AF77]/10 p-8 lg:p-10 relative">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#D4AF77]/30" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#D4AF77]/30" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center gap-5 py-12"
                >
                  <CheckCircle size={48} className="text-[#D4AF77]" />
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.8rem",
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                  >
                    Bericht ontvangen!
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.7,
                    }}
                  >
                    Bedankt voor uw bericht. Wij nemen zo spoedig mogelijk contact met u op.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                    className="mt-2 text-[#D4AF77] hover:text-[#E8C78F] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    Nieuw bericht
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3
                    className="mb-8"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.8rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      lineHeight: 1.2,
                    }}
                  >
                    Stuur ons een bericht
                  </h3>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.65rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "#D4AF77",
                          fontWeight: 500,
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        Uw naam *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jan de Vries"
                        className="w-full px-4 py-3.5 bg-transparent border border-[#D4AF77]/15 focus:border-[#D4AF77]/50 outline-none transition-colors duration-300"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.8)",
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.65rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "#D4AF77",
                          fontWeight: 500,
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        E-mailadres *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jan@email.nl"
                        className="w-full px-4 py-3.5 bg-transparent border border-[#D4AF77]/15 focus:border-[#D4AF77]/50 outline-none transition-colors duration-300"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.8)",
                        }}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.65rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "#D4AF77",
                          fontWeight: 500,
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        Uw bericht *
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Stel hier uw vraag..."
                        className="w-full px-4 py-3.5 bg-transparent border border-[#D4AF77]/15 focus:border-[#D4AF77]/50 outline-none transition-colors duration-300 resize-none"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.8)",
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative flex items-center justify-center gap-3 py-4 overflow-hidden transition-all duration-300 disabled:opacity-70"
                      style={{
                        background: "linear-gradient(135deg, #D4AF77 0%, #C9A66B 50%, #B8925A 100%)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.72rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        color: "#111111",
                      }}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#111]/30 border-t-[#111] rounded-full animate-spin" />
                          Verzenden...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Verstuur bericht
                        </>
                      )}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-all duration-300" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
