import { ReactNode } from "react";

interface AnimatedRouteProps {
  children: ReactNode;
}

const AnimatedRoute = ({ children }: AnimatedRouteProps) => {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
};

export default AnimatedRoute;
