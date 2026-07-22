import { motion } from "framer-motion";

const certifications = [
  "/images/D1.webp",
  "/images/D2.webp",
  "/images/D3.webp",
  "/images/D4.webp",
  "/images/D5.webp",
  "/images/D6.webp",
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="py-20 sm:py-24 bg-[#1a1a1a] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C89B3C]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C89B3C]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/20 rounded-full mb-6">
            <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">
              Certifications & Standards
            </span>
          </div>

          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our <span className="text-[#C89B3C]">Commitment</span> to Excellence
          </h2>

          <p className="text-white/50 max-w-2xl mx-auto font-['Poppins']">
            Your safety and satisfaction are our highest priorities. We maintain
            the strictest standards across every aspect of our practice.
          </p>
        </motion.div>

        {/* First Row - 4 Images */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {certifications.slice(0, 4).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden bg-white shadow-lg"
            >
              <img
                src={image}
                alt={`Certification ${index + 1}`}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>

        {/* Second Row - 2 Centered Images */}
        <div className="flex justify-center gap-6 flex-wrap">
          {certifications.slice(4).map((image, index) => (
            <motion.div
              key={index + 4}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
              className="w-full sm:w-[48%] lg:w-[23%] rounded-2xl overflow-hidden bg-white shadow-lg"
            >
              <img
                src={image}
                alt={`Certification ${index + 5}`}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}