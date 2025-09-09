import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare, 
  BarChart3, 
  Database, 
  History, 
  Settings, 
  TrendingUp,
  MapPin,
  Activity,
  Waves
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import OceanBackground from "@/components/OceanBackground";
import heroOcean from "@/assets/hero-ocean.jpg";
import dataVisualization from "@/assets/data-visualization.jpg";

const Index = () => {
  const quickActions = [
    {
      title: "AI Assistant",
      description: "Ask questions about ocean data in natural language",
      icon: MessageSquare,
      href: "/chat",
      variant: "hero" as const,
      color: "from-turquoise-500 to-ocean-600"
    },
    {
      title: "Visualize Data",
      description: "Interactive maps and charts of ARGO float trajectories",
      icon: BarChart3,
      href: "/visualize",
      variant: "ocean" as const,
      color: "from-ocean-500 to-ocean-700"
    },
    {
      title: "Data Explorer",
      description: "Browse and filter structured oceanographic datasets",
      icon: Database,
      href: "/explore",
      variant: "surface" as const,
      color: "from-turquoise-300 to-turquoise-500"
    }
  ];

  const recentActivity = [
    { action: "Queried salinity profiles near equator", time: "2 hours ago", type: "query" },
    { action: "Exported BGC data for Arabian Sea", time: "4 hours ago", type: "export" },
    { action: "Viewed float trajectory visualization", time: "1 day ago", type: "view" },
    { action: "Downloaded temperature profiles", time: "2 days ago", type: "download" }
  ];

  const stats = [
    { label: "Active ARGO Floats", value: "3,847", icon: MapPin, trend: "+12%" },
    { label: "Data Points Today", value: "2.4M", icon: Activity, trend: "+8%" },
    { label: "Queries Processed", value: "156", icon: TrendingUp, trend: "+23%" }
  ];

  return (
    <OceanBackground animated>
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-12 rounded-2xl overflow-hidden shadow-deep">
          <div 
            className="bg-cover bg-center h-64 md:h-80"
            style={{ backgroundImage: `url(${heroOcean})` }}
          >
            <div className="absolute inset-0 gradient-deep opacity-80" />
            <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
              <div className="max-w-2xl">
                <div className="flex justify-center mb-4">
                  <Waves className="w-12 h-12 text-turquoise-300" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to SeaSpeak</h1>
                <p className="text-lg md:text-xl text-turquoise-100 mb-6">
                  AI-powered platform for exploring oceanographic data through natural language queries and intelligent visualizations
                </p>
                <Button variant="coral" size="xl" asChild>
                  <Link to="/chat">Start Exploring</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-surface hover:shadow-ocean transition-wave">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <stat.icon className="w-8 h-8 text-turquoise-500 mb-2" />
                    <span className="text-xs text-coral-500 font-medium">{stat.trend}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="group hover:shadow-deep transition-wave cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-full flex items-center justify-center shadow-ocean group-hover:scale-110 transition-smooth`}>
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-foreground">{action.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {action.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant={action.variant} className="w-full" asChild>
                  <Link to={action.href}>Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity & Data Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="shadow-surface">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="w-5 h-5 text-turquoise-500" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                    <div className="w-2 h-2 bg-turquoise-400 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/history">View All Activity</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Data Preview */}
          <Card className="shadow-surface">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-turquoise-500" />
                <span>Live Data Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="h-40 bg-cover bg-center rounded-lg mb-4 flex items-center justify-center"
                style={{ backgroundImage: `url(${dataVisualization})` }}
              >
                <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                  <p className="text-sm">Real-time ARGO float positions</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Floats:</span>
                  <span className="text-foreground font-medium">3,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Latest Update:</span>
                  <span className="text-foreground font-medium">15 min ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coverage:</span>
                  <span className="text-foreground font-medium">Global</span>
                </div>
              </div>
              <Button variant="ocean" className="w-full mt-4" asChild>
                <Link to="/visualize">View Visualizations</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </OceanBackground>
  );
};

export default Index;
