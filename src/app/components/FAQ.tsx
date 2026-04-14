import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const faqItems: FaqItem[] = [
  {
    q: "Hoe lang duurt de levering?",
    a: "Bestellingen geplaatst vóór 15:00 uur worden dezelfde werkdag verzonden. De verwachte levertijd is 1–3 werkdagen binnen Nederland en België. U ontvangt een bevestigingsmail zodra uw bestelling is verzonden.",
  },
  {
    q: "Vanaf welk bedrag is verzending gratis?",
    a: "Verzending is gratis bij bestellingen vanaf €50. Bij bestellingen onder de €50 rekenen wij €4,95 verzendkosten.",
  },
  {
    q: "Zijn de producten veilig voor alle honden?",
    a: "Onze snacks zijn geschikt voor de meeste honden. Voor puppy's onder de 12 weken of honden met een bekende voedselallergie raden wij aan om eerst uw dierenarts te raadplegen. Alle producten zijn EU-gecertificeerd (vet. nr. 14128301) en bevatten geen kunstmatige toevoegingen.",
  },
  {
    q: "Wat betekent het EU-veterinair certificaat?",
    a: "Het veterinair nummer 14128301 betekent dat onze productiefaciliteit in Polen officieel geregistreerd en goedgekeurd is door de Europese veterinaire autoriteiten. Dit garandeert dat onze producten voldoen aan de strengste Europese voedselveiligheidsnormen.",
  },
  {
    q: "Kan ik een bestelling retourneren?",
    a: "Omdat wij met voedsel voor huisdieren werken, accepteren wij geen retourzendingen van geopende producten. Ongeopende producten kunnen binnen 14 dagen na ontvangst worden geretourneerd, mits in originele verpakking. Neem contact met ons op via info@blissbone.nl voor een retourlabel.",
  },
  {
    q: "Hoe worden de snacks bewaard?",
    a: "Bewaar de snacks op een koele, droge plaats uit direct zonlicht. Na opening kunt u de snacks het best bewaren in een luchtdichte bak. De houdbaarheidsdatum staat vermeld op de verpakking — gemiddeld 6–12 maanden.",
  },
  {
    q: "Zijn de producten ook geschikt als dagelijkse snack?",
    a: "Ja, onze snacks zijn bedoeld als dagelijkse aanvulling op het reguliere dieet. Aanbevolen hoeveelheid: 1–2 snacks per dag, afhankelijk van het formaat en gewicht van uw hond. Geef altijd voldoende vers drinkwater.",
  },
  {
    q: "Kan ik een korting krijgen bij grote bestellingen?",
    a: "Ja! In onze winkelwagen ziet u automatisch een kortingsadvies. Bij bestellingen vanaf €75 ontvangt u 5% korting, en bij bestellingen vanaf €100 zelfs 10% korting. De korting wordt automatisch berekend bij het afrekenen.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#111111] py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/30 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        <div className="max-w-3xl mx-auto">
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
                Veelgestelde vragen
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
              Alles wat u wilt weten
            </motion.h2>
          </div>

          {/* FAQ items */}
          <div className="flex flex-col gap-2">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border border-[#D4AF77]/12 overflow-hidden transition-colors duration-300"
                style={{ borderColor: openIdx === i ? "rgba(212,175,119,0.3)" : "rgba(212,175,119,0.12)" }}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
                  aria-expanded={openIdx === i}
                >
                  <span
                    className="flex-1 transition-colors duration-300"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: openIdx === i ? "#D4AF77" : "#ffffff",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.q}
                  </span>
                  <div
                    className="shrink-0 w-7 h-7 flex items-center justify-center border rounded-full transition-all duration-300"
                    style={{
                      borderColor: openIdx === i ? "#D4AF77" : "rgba(212,175,119,0.25)",
                      color: openIdx === i ? "#D4AF77" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {openIdx === i ? <Minus size={12} /> : <Plus size={12} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div
                        className="px-6 pb-5"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}
                      >
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12 p-8 border border-[#D4AF77]/15"
          >
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>
              Staat uw vraag er niet bij?
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", marginBottom: "20px" }}>
              Ons team helpt u graag persoonlijk verder.
            </p>
            <button
              onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              className="px-8 py-3 transition-opacity hover:opacity-85"
              style={{ background: "linear-gradient(135deg, #D4AF77, #C9A66B)", fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: "#111111" }}
            >
              Neem contact op
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/30 to-transparent" />
    </section>
  );
}
