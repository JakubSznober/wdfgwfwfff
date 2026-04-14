import { motion } from "motion/react";
import { Leaf, ShieldCheck, Award, Truck } from "lucide-react";

const trustItems = [
  {
    icon: Leaf,
    title: "100% Natuurlijk",
    desc: "Geen kunstmatige toevoegingen",
  },
  {
    icon: ShieldCheck,
    title: "Geen Chemicaliën",
    desc: "Puur en veilig voor uw hond",
  },
  {
    icon: Award,
    title: "EU Goedgekeurd",
    desc: "Veterinair nr. 14128301",
  },
  {
    icon: Truck,
    title: "Snelle Levering",
    desc: "Gratis verzending vanaf €40",
  },
];

export function TrustBar() {
  return (
    <section className="bg-[#0a0a0a] py-16 relative overflow-hidden">
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/40 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-4 p-6 border border-[#D4AF77]/10 hover:border-[#D4AF77]/30 transition-all duration-400 group"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-[#D4AF77]/30 group-hover:border-[#D4AF77]/70 transition-colors duration-300">
                <item.icon size={22} className="text-[#D4AF77]" />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#D4AF77",
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.45)",
                    marginTop: "4px",
                    lineHeight: 1.5,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gold bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF77]/40 to-transparent" />
    </section>
  );
}
