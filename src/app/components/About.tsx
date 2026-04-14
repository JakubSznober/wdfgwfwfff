import { motion } from "motion/react";
import { Leaf, FlaskConical, BadgeCheck, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const featureItems = [
  {
    icon: Leaf,
    title: "100% Natuurlijk",
    desc: "Onze snacks bestaan uitsluitend uit natuurlijke ingrediënten. Geen vulstoffen, geen smaakversterkers — alleen puur product.",
  },
  {
    icon: FlaskConical,
    title: "Geen Chemicaliën",
    desc: "Wij gebruiken geen chemicaliën of kunstmatige conserveringsmiddelen. Het droogproces is volledig natuurlijk.",
  },
  {
    icon: BadgeCheck,
    title: "EU Goedgekeurd",
    desc: "Al onze producten zijn EU-gecertificeerd (veterinair nummer 14128301) en voldoen aan de hoogste voedselveiligheidsnormen.",
  },
  {
    icon: MapPin,
    title: "EU Gecertificeerde Productie",
    desc: "Geproduceerd onder strenge Europese kwaliteitscontrole. Erkend veterinair nummer: PL 14128301 WE.",
  },
];

export function About() {
  return (
    <section id="over-ons" className="bg-[#111111] py-24 lg:py-36 relative overflow-hidden">
      {/* Decorative gold left bar */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF77]/30 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">

          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1686602738407-11024fc22117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
                alt="Productie in Polen – BlissBone naturlijke hondensnacks worden zorgvuldig gedroogd"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 to-transparent" />
            </div>

            {/* Gold frame accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-[#D4AF77]/40" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-[#D4AF77]/40" />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 right-4 lg:bottom-8 lg:-right-8 bg-[#0a0a0a] border border-[#D4AF77]/30 p-6 flex flex-col items-center gap-1"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.5rem",
                  fontWeight: 600,
                  color: "#D4AF77",
                  lineHeight: 1,
                }}
              >
                100%
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Natuurlijk
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className="flex items-center gap-4 mb-7">
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
                Ons verhaal
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
              }}
            >
              Transparantie is<br />
              <em style={{ fontWeight: 300 }}>onze kernwaarde</em>
            </h2>

            {/* Gold divider */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-[#D4AF77] to-transparent" />
              <div className="w-1 h-1 rounded-full bg-[#D4AF77]/60" />
            </div>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.85,
                marginBottom: "1.5rem",
              }}
            >
              <strong style={{ color: "#D4AF77", fontWeight: 500 }}>BlissBone</strong> – 100% natuurlijke, gedroogde hondensnacks. Gecertificeerd
              volgens EU-normen. Zonder chemicaliën en kunstmatige toevoegingen.
              Erkend veterinair nummer: <strong style={{ color: "rgba(255,255,255,0.8)" }}>PL 14128301 WE</strong>.
            </p>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.85,
                marginBottom: "2.5rem",
              }}
            >
              Wij geloven dat uw hond het allerbeste verdient. Daarom selecteren wij alleen de zuiverste grondstoffen
              en drogen wij deze op traditionele wijze — zonder compromissen op smaak, kwaliteit of veiligheid.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10 border-t border-[#D4AF77]/15 pt-8">
              {[
                { num: "6+", label: "Productlijnen" },
                { num: "EU", label: "Gecertificeerd" },
                { num: "EU", label: "Productie" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "2rem",
                      fontWeight: 600,
                      color: "#D4AF77",
                      lineHeight: 1,
                    }}
                  >
                    {stat.num}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                      marginTop: "6px",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative overflow-hidden px-10 py-4 transition-all duration-400"
              style={{
                background: "linear-gradient(135deg, #D4AF77 0%, #C9A66B 100%)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#111111",
              }}
            >
              <span className="relative z-10">Neem contact op</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-all duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div>
          <div className="flex items-center justify-center gap-4 mb-14">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF77]/40" />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em",
                fontStyle: "italic",
              }}
            >
              Onze beloften
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF77]/40" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-8 border border-[#D4AF77]/10 hover:border-[#D4AF77]/30 transition-all duration-500 relative overflow-hidden"
              >
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#D4AF77]/30 group-hover:border-[#D4AF77]/70 transition-colors duration-500" />

                <div className="mb-5 w-11 h-11 flex items-center justify-center border border-[#D4AF77]/25 group-hover:border-[#D4AF77]/60 transition-colors duration-500">
                  <item.icon size={20} className="text-[#D4AF77]" />
                </div>

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: "12px",
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.75,
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
