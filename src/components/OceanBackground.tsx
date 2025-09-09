import { ReactNode } from "react";

interface OceanBackgroundProps {
  children: ReactNode;
  variant?: "light" | "deep" | "surface";
  animated?: boolean;
}

const OceanBackground = ({ 
  children, 
  variant = "light", 
  animated = false 
}: OceanBackgroundProps) => {
  const getBackgroundClass = () => {
    switch (variant) {
      case "deep":
        return "gradient-deep";
      case "surface":
        return "gradient-surface";
      default:
        return "bg-background";
    }
  };

  return (
    <div className={`min-h-screen relative ${getBackgroundClass()}`}>
      {/* Animated ocean particles */}
      {animated && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-turquoise-300/30 rounded-full ocean-flow" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-turquoise-400/40 rounded-full ocean-flow" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-turquoise-200/20 rounded-full ocean-flow" style={{ animationDelay: '4s' }} />
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-turquoise-300/30 rounded-full ocean-flow" style={{ animationDelay: '6s' }} />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default OceanBackground;