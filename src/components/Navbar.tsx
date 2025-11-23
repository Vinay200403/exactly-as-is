import { Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative p-2.5 rounded-xl transition-all group-hover:scale-110">
              <div className="absolute inset-0 bg-gradient-gold rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <Landmark className="w-7 h-7 relative z-10 icon-gradient" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              Virtual Museum
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-foreground hover:text-accent transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/museums"
              className="text-foreground hover:text-accent transition-colors font-medium"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
