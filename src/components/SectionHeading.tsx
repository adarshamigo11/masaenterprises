import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string | React.ReactNode
  subtitle?: string
  align?: "left" | "center"
  light?: boolean
  titleColor?: string
}

export default function SectionHeading({ title, subtitle, align = "center", light = false, titleColor }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`text-3xl font-bold  lg:text-4xl ${titleColor || (light ? "text-primary-foreground" : "text-foreground")}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mx-auto mt-3 max-w-2xl leading-relaxed ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className={`mt-4 h-1 w-16 rounded-full bg-accent ${align === "left" ? "" : "mx-auto"}`} 
      />
    </motion.div>
  )
}
