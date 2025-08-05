import { motion } from "framer-motion";
const skills = [
  "React", "TailwindCSS", "Framer Motion", "JavaScript", "SwiftUI",
  "iOS", "Unity", "C#", "Figma", "Git"
];
export default function Skills() {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <motion.span
          whileHover={{
            scale: 1.17,
            backgroundColor: "#FF7F11",
            color: "#222",
            transition: { duration: 0.19 },
          }}
          className="px-4 py-1 bg-transparent border border-accent text-accent rounded-full text-sm font-semibold cursor-pointer transition-colors"
          key={skill}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  );
}