"use client";
import { motion } from "framer-motion";

export default function FadeIn({ children, className, delay = 0, y = 20 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
