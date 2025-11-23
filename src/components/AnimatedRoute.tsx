import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface AnimatedRouteProps {
  children: ReactNode;
}

const AnimatedRoute = ({ children }: AnimatedRouteProps) => {
  const location = useLocation();

  return (
    <div 
      key={location.pathname}
      className="animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      {children}
    </div>
  );
};

export default AnimatedRoute;
