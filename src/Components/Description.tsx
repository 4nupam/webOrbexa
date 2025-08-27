"use client";

import { motion } from "framer-motion";


export default function Description() {
  return (
    <section
      id="projects"
      className=" px-6 sm:px-10 md:px-20 text-[var(--text)]"
    >
      {/* Intro Paragraph */}
      <motion.p
        className="max-w-4xl mx-auto text-center text-base sm:text-lg md:text-xl text-gray-800 font-extrabold leading-relaxed mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        The best <strong className="text-[var(--primary)]">MVP</strong> and <strong className="text-[var(--primary)]">SaaS</strong> development agency. Elite
        14-day delivery service trusted by 50+ startups. Where rapid delivery meets
        uncompromising quality.
      </motion.p>




    </section>
  );
}
