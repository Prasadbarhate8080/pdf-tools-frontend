const FeatureCard = ({ icon:Icon, heading, paragraph, delay = 0 }) => {
  console.log(Icon)
  return (
    <div
      className="glass-card p-8 hover:glow-shadow hover:-translate-y-1 transition-all duration-300 group opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-xl feature-icon-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        {Icon && <Icon className="w-6 h-6 text-primary-foreground" />}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{heading}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{paragraph}</p>
    </div>
  )
}
export default FeatureCard

