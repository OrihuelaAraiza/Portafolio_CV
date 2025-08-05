import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, delay: 0.4, type: "spring", bounce: 0.2 }}
      className="py-8 text-center text-sm text-light/50 bg-darker/80 backdrop-blur-md relative"
    >
      <motion.div
        initial={{ opacity: 0.5, width: "60%" }}
        animate={{
          opacity: [0.6, 1, 0.6],
          width: ["60%", "100%", "60%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute left-1/2 top-0 -translate-x-1/2 h-1 w-[60%] rounded-full bg-gradient-to-r from-accent/80 via-orange/80 to-accent/80 blur-sm"
      />
      © {new Date().getFullYear()} Juan Pablo Orihuela · Portafolio
    </motion.footer>
  );
} 