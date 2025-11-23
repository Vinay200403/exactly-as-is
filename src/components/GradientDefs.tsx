// SVG gradient definitions for icon styling
const GradientDefs = () => {
  return (
    <svg className="gradient-defs" aria-hidden="true">
      <defs>
        <linearGradient id="icon-gradient-paint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(220, 40%, 25%)" />
          <stop offset="50%" stopColor="hsl(40, 85%, 55%)" />
          <stop offset="100%" stopColor="hsl(35, 90%, 65%)" />
        </linearGradient>

        <linearGradient id="icon-gradient-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(40, 85%, 55%)" />
          <stop offset="100%" stopColor="hsl(35, 90%, 70%)" />
        </linearGradient>

        <linearGradient id="icon-gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(220, 50%, 35%)" />
          <stop offset="100%" stopColor="hsl(210, 60%, 50%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GradientDefs;
