import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Mail, CheckCircle } from "lucide-react";
import OceanBackground from "@/components/OceanBackground";
import heroOcean from "@/assets/hero-ocean.jpg";

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate verification - in real app, this would call verification API
    if (verificationCode === "123456") {
      setIsVerified(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      alert("Invalid verification code. Try 123456 for demo.");
    }
  };

  const handleResendCode = () => {
    setTimeLeft(300);
    // Simulate resending code
    alert("New verification code sent to your email!");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isVerified) {
    return (
      <OceanBackground variant="deep" animated>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroOcean})` }}
          >
            <div className="absolute inset-0 bg-ocean-900/80" />
          </div>

          <div className="relative z-10 w-full max-w-md">
            <Card className="shadow-deep border-ocean-700 bg-card/95 backdrop-blur-sm text-center">
              <CardHeader className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-coral-500 rounded-full flex items-center justify-center shadow-ocean">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-foreground">Email Verified!</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    Your account has been successfully verified. Redirecting to SeaSpeak...
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="w-8 h-8 border-2 border-turquoise-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground">Welcome to the ocean of data exploration!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </OceanBackground>
    );
  }

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

        {/* Verification Form */}
        <div className="relative z-10 w-full max-w-md">
          <Card className="shadow-deep border-ocean-700 bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 gradient-ocean rounded-full flex items-center justify-center shadow-ocean">
                  <Mail className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">Verify Your Email</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  We've sent a 6-digit verification code to your email address
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Verification Code</label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="text-center text-lg font-mono tracking-wider transition-smooth focus:shadow-surface"
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    For demo purposes, use code: <span className="font-mono font-medium">123456</span>
                  </p>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Verify Email
                </Button>

                <div className="text-center space-y-3">
                  <div className="text-sm text-muted-foreground">
                    {timeLeft > 0 ? (
                      <>Code expires in <span className="font-mono font-medium text-coral-400">{formatTime(timeLeft)}</span></>
                    ) : (
                      <span className="text-destructive">Verification code has expired</span>
                    )}
                  </div>

                  {timeLeft === 0 ? (
                    <Button variant="outline" onClick={handleResendCode} className="w-full">
                      Resend Verification Code
                    </Button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="text-sm text-turquoise-400 hover:text-turquoise-300 transition-smooth underline"
                    >
                      Didn't receive the code? Resend
                    </button>
                  )}
                </div>
              </form>

              <div className="mt-6 text-center border-t border-border pt-6">
                <p className="text-muted-foreground text-sm">
                  Wrong email address?{" "}
                  <Link to="/signup" className="text-turquoise-400 hover:text-turquoise-300 font-medium transition-smooth">
                    Go back to sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 text-center text-white/70">
            <div className="flex justify-center mb-2">
              <Waves className="w-5 h-5 text-turquoise-300" />
            </div>
            <p className="text-xs">
              Your security is important to us. This verification step helps protect your SeaSpeak account.
            </p>
          </div>
        </div>
      </div>
    </OceanBackground>
  );
};

export default Verify;