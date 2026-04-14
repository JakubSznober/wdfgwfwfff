import { motion } from "motion/react";
import { Mail, Phone, BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface SiteSettings {
  contact_email?: string;
  contact_phone?: string;
  contact_kvk?: string;
}

const footerLinks = {
  shop: [
    { label: "Alle producten", href: "#shop" },
    { label: "Gevogelte snacks", href: "#shop" },
    { label: "Rund & Lam", href: "#shop" },
    { label: "Kauwstokken", href: "#shop" },
  ],
  info: [
    { label: "Over ons", href: "#over-ons" },
    { label: "Contact", href: "#contact" },
    { label: "Privacybeleid", href: "#" },
    { label: "Algemene voorwaarden", href: "#" },
  ],
  service: [
    { label: "Levering & retour", href: "#" },
    { label: "Veelgestelde vragen", href: "#" },
    { label: "Klantenservice", href: "#contact" },
  ],
};

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {/* use defaults */});
  }, []);

  const email = settings.contact_email || "info@blissbone.nl";
  const phone = settings.contact_phone || "";

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#070707] relative overflow-hidden">
      {/* Gold top border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF77]/50 to-transparent" />

      {/* Newsletter Strip */}
      <div className="bg-[#0f0f0f] border-b border-[#D4AF77]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.6rem",
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              Schrijf u in voor exclusieve aanbiedingen
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.4)",
                marginTop: "6px",
              }}
            >
              Ontvang als eerste nieuws over nieuwe producten en speciale acties.
            </p>
          </div>

          <div className="flex items-stretch gap-0 w-full md:w-auto">
            <input
              type="email"
              placeholder="uw@email.nl"
              className="flex-1 md:w-64 px-5 py-3.5 bg-transparent border border-[#D4AF77]/20 border-r-0 outline-none focus:border-[#D4AF77]/50 transition-colors"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.8)",
              }}
            />
            <button
              className="px-7 py-3.5 shrink-0 transition-all duration-300 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #D4AF77, #C9A66B)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#111111",
              }}
            >
              Inschrijven
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <button onClick={() => scrollTo("#home")} className="mb-6 inline-block">
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  color: "#D4AF77",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Bliss
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.8rem",
                  fontWeight: 300,
                  color: "#ffffff",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Bone
              </span>
            </button>

            <p
              className="mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.85,
                maxWidth: "280px",
              }}
            >
              100% natuurlijke, gedroogde hondensnacks. Gecertificeerd
              volgens EU-normen. Zonder chemicaliën en kunstmatige toevoegingen.
            </p>

            {/* Certifications */}
            <div className="flex items-center gap-3 p-4 border border-[#D4AF77]/15 mb-6 w-fit">
              <BadgeCheck size={18} className="text-[#D4AF77]" />
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF77", fontWeight: 600 }}>
                  Gecertificeerd volgens EU-normen
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)" }}>
                  Erkend vet. nr. PL 14128301 WE
                </p>
              </div>
            </div>

            {/* Contact quick links */}
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-white/40 hover:text-[#D4AF77] transition-colors duration-300"
              >
                <Mail size={14} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }}>{email}</span>
              </a>
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/40 hover:text-[#D4AF77] transition-colors duration-300"
                >
                  <Phone size={14} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }}>{phone}</span>
                </a>
              )}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4
              className="mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D4AF77",
                fontWeight: 600,
              }}
            >
              Shop
            </h4>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/40 hover:text-white transition-colors duration-300 text-left"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4
              className="mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D4AF77",
                fontWeight: 600,
              }}
            >
              Informatie
            </h4>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/40 hover:text-white transition-colors duration-300 text-left"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h4
              className="mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D4AF77",
                fontWeight: 600,
              }}
            >
              Klantenservice
            </h4>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.service.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/40 hover:text-white transition-colors duration-300 text-left"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/31612345678"
              target="_blank"
              rel="noreferrer"
              className="mt-8 flex items-center gap-3 px-4 py-3 border border-[#D4AF77]/25 hover:border-[#D4AF77]/60 transition-all duration-300 w-fit group"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4AF77">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.551 4.1 1.515 5.832L.057 23.082a.75.75 0 00.92.92l5.335-1.459A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.703 9.703 0 01-4.949-1.352l-.355-.21-3.687 1.008 1.011-3.617-.23-.371A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#D4AF77",
                  fontWeight: 500,
                }}
              >
                Chat met ons
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#D4AF77]/8">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.05em",
            }}
          >
            © 2026 BlissBone.nl — Alle rechten voorbehouden
          </p>
          <div className="flex items-center gap-6">
            {["Privacybeleid", "Cookiebeleid", "Disclaimer"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/25 hover:text-white/50 transition-colors duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.05em",
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,175,119,0.03) 0%, transparent 70%)",
        }}
      />
    </footer>
  );
}
