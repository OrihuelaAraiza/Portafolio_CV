import { motion } from "framer-motion";
import SplitText from "../reactbits/TextAnimations/SplitText/SplitText";
import AnimatedContent from "../reactbits/Animations/AnimatedContent/AnimatedContent";

export default function ProjectCard({ title, description, image, link, tags, index }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        boxShadow: "0 12px 40px 0 rgba(255,127,17,0.23)",
        y: -8,
        transition: { duration: 0.24 }
      }}
      className="bg-darker rounded-xl shadow-lg p-5 flex flex-col"
    >
    <AnimatedContent
      as="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1 + (index || 0) * 0.13, duration: 0.5, type: "spring" }}
      whileHover={{
        scale: 1.04,
        boxShadow: "0 8px 32px 0 #FF474755",
        background: "linear-gradient(135deg, #232323 80%, #FF474740)",
        borderColor: "#FF7F11"
      }}
      className="bg-darker rounded-2xl shadow-lg p-4 flex flex-col gap-3 border-2 border-dark hover:border-orange transition-all cursor-pointer"
      style={{
        background: "rgba(35, 35, 35, 0.94)",
        backdropFilter: "blur(3px)"
      }}
    >
      <img src={image} alt={title} className="rounded-xl object-cover h-48 w-full" />
      <SplitText
        text={title}
        className="font-bold text-2xl text-orange"
        charDelay={0.02}
        from="top"
      />
      <p className="text-light/80 text-sm">{description}</p>
      <div className="flex gap-2 flex-wrap mt-2">
        {tags.map((t) => (
          <span className="bg-orange/20 text-orange rounded px-2 py-0.5 text-xs font-semibold" key={t}>{t}</span>
        ))}
      </div>
    </AnimatedContent>
    </motion.div>
    
  );
} 