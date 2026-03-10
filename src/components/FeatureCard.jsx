import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, heading, paragraph, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="glass-card p-8 hover:glow-shadow hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="w-14 h-14 rounded-xl feature-icon-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        {Icon && <Icon className="w-6 h-6 text-primary-foreground" />}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{heading}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {paragraph}
      </p>
    </motion.div>
  );
};
export default FeatureCard;


