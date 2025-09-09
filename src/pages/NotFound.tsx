import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, Waves } from "lucide-react";
import OceanBackground from "@/components/OceanBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <OceanBackground variant="deep" animated>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-deep bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 gradient-ocean rounded-full flex items-center justify-center shadow-ocean">
                <Waves className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-6xl font-bold gradient-ocean bg-clip-text text-transparent">
              404
            </CardTitle>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Lost at Sea</h2>
              <p className="text-muted-foreground">
                The page you're looking for has drifted away like a message in a bottle.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="hero" className="flex-1" asChild>
                <a href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </a>
              </Button>
              <Button variant="surface" className="flex-1" asChild>
                <a href="/chat">
                  <Search className="w-4 h-4 mr-2" />
                  Explore Data
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Navigate back to familiar waters with SeaSpeak
            </p>
          </CardContent>
        </Card>
      </div>
    </OceanBackground>
  );
};

export default NotFound;
