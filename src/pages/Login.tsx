import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Mail, Lock } from "lucide-react";
import OceanBackground from "@/components/OceanBackground";
import heroOcean from "@/assets/hero-ocean.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app, this would call authentication API
    navigate("/");
  };

  return (
    <OceanBackground variant="deep" animated>
      <div className="min-h-screen flex items-center justify-center p-4">
        {/* Background Hero Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroOcean})` }}
        >
          <div className="absolute inset-0 bg-ocean-900/80" />
        </div>

        {/* Login Form */}
        <div className="relative z-10 w-full max-w-md">
          <Card className="shadow-deep border-ocean-700 bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 gradient-ocean rounded-full flex items-center justify-center shadow-ocean">
                  <Waves className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">Welcome to SeaSpeak</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  AI-Powered ARGO Float Data Intelligence Platform
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 transition-smooth focus:shadow-surface"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 transition-smooth focus:shadow-surface"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Sign In
                </Button>

                <div className="text-center space-y-2">
                  <Link to="/forgot-password" className="text-sm text-turquoise-400 hover:text-turquoise-300 transition-smooth">
                    Forgot your password?
                  </Link>
                </div>
              </form>

              <div className="mt-6 text-center border-t border-border pt-6">
                <p className="text-muted-foreground text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-turquoise-400 hover:text-turquoise-300 font-medium transition-smooth">
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="mt-8 text-center text-white/80">
            <p className="text-sm mb-4">Explore oceanographic data with AI assistance</p>
            <div className="flex justify-center space-x-6 text-xs">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-turquoise-500/20 rounded-full flex items-center justify-center mb-2">
                  <span className="text-turquoise-300">🤖</span>
                </div>
                <span>AI Queries</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-turquoise-500/20 rounded-full flex items-center justify-center mb-2">
                  <span className="text-turquoise-300">📊</span>
                </div>
                <span>Visualizations</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-turquoise-500/20 rounded-full flex items-center justify-center mb-2">
                  <span className="text-turquoise-300">🌊</span>
                </div>
                <span>Ocean Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OceanBackground>
  );
};

export default Login;