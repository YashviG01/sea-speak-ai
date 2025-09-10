import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  MessageSquare, 
  BarChart3, 
  Database, 
  Settings, 
  History,
  Menu,
  X,
  Waves
} from "lucide-react";
import logoImage from "@/assets/logo-minimal.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/chat", label: "AI Assistant", icon: MessageSquare },
    { href: "/visualize", label: "Visualize", icon: BarChart3 },
    { href: "/explore", label: "Data Explorer", icon: Database },
    { href: "/history", label: "History", icon: History },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border shadow-surface sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 transition-smooth hover:scale-105">
            <img 
              src={logoImage} 
              alt="SeaSpeak" 
              className="h-10 w-10 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                variant={isActive(item.href) ? "default" : "ghost"}
                size="sm"
                asChild
                className="transition-smooth"
              >
                <Link to={item.href} className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
            <Button variant="outline" size="sm" onClick={handleLogout} className="ml-4">
              Logout
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="justify-start transition-smooth"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to={item.href} className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout} 
                className="justify-start mt-4"
              >
                Logout
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;