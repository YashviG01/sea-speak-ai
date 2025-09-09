import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  BarChart3, 
  TrendingUp, 
  Layers, 
  Filter, 
  Download,
  RefreshCw,
  Maximize2,
  Settings,
  Calendar
} from "lucide-react";
import Navigation from "@/components/Navigation";
import OceanBackground from "@/components/OceanBackground";
import dataVisualization from "@/assets/data-visualization.jpg";

const Visualize = () => {
  const [selectedRegion, setSelectedRegion] = useState("global");
  const [selectedParameter, setSelectedParameter] = useState("temperature");
  const [timeRange, setTimeRange] = useState("30days");
  const [viewMode, setViewMode] = useState("map");

  const floatData = [
    { id: "2903458", lat: 25.4, lon: 65.2, temp: 28.5, salinity: 35.2, status: "active" },
    { id: "5906102", lat: 24.8, lon: 67.1, temp: 27.8, salinity: 35.4, status: "active" },
    { id: "4903261", lat: 26.2, lon: 64.5, temp: 29.1, salinity: 35.0, status: "active" },
    { id: "7890123", lat: 23.5, lon: 68.3, temp: 26.9, salinity: 35.6, status: "inactive" },
  ];

  const parameters = [
    { value: "temperature", label: "Temperature", unit: "°C", color: "coral" },
    { value: "salinity", label: "Salinity", unit: "PSU", color: "turquoise" },
    { value: "pressure", label: "Pressure", unit: "dbar", color: "ocean" },
    { value: "oxygen", label: "Dissolved Oxygen", unit: "μmol/kg", color: "coral" },
  ];

  const regions = [
    { value: "global", label: "Global Ocean" },
    { value: "atlantic", label: "Atlantic Ocean" },
    { value: "pacific", label: "Pacific Ocean" },
    { value: "indian", label: "Indian Ocean" },
    { value: "arabian", label: "Arabian Sea" },
    { value: "mediterranean", label: "Mediterranean Sea" },
  ];

  const timeRanges = [
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
    { value: "3months", label: "Last 3 months" },
    { value: "1year", label: "Last year" },
    { value: "5years", label: "Last 5 years" },
  ];

  return (
    <OceanBackground>
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Data Visualizations</h1>
          <p className="text-muted-foreground">
            Interactive maps and charts of ARGO float trajectories and oceanographic parameters
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6 shadow-surface">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-turquoise-500" />
              <span>Visualization Controls</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Parameter</label>
                <Select value={selectedParameter} onValueChange={setSelectedParameter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {parameters.map((param) => (
                      <SelectItem key={param.value} value={param.value}>
                        {param.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end space-x-2">
                <Button variant="hero" className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update
                </Button>
                <Button variant="outline" size="icon">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Card className="shadow-surface h-96">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-turquoise-500" />
                    <span>Interactive Ocean Map</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={viewMode === "map" ? "default" : "outline"}
                      onClick={() => setViewMode("map")}
                    >
                      Map
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === "satellite" ? "default" : "outline"}
                      onClick={() => setViewMode("satellite")}
                    >
                      Satellite
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div 
                  className="w-full h-64 bg-cover bg-center rounded-lg relative"
                  style={{ backgroundImage: `url(${dataVisualization})` }}
                >
                  <div className="absolute inset-0 bg-ocean-900/20 rounded-lg" />
                  {/* Simulated float markers */}
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-coral-400 rounded-full shadow-lg animate-pulse" />
                  <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-turquoise-400 rounded-full shadow-lg animate-pulse" />
                  <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-coral-400 rounded-full shadow-lg animate-pulse" />
                  
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
                    Showing {floatData.length} active floats • Real-time data
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {/* Active Floats */}
            <Card className="shadow-surface">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Active Floats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {floatData.slice(0, 3).map((float) => (
                  <div key={float.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                    <div>
                      <p className="font-medium text-foreground">#{float.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {float.lat.toFixed(1)}°N, {float.lon.toFixed(1)}°E
                      </p>
                    </div>
                    <Badge variant={float.status === "active" ? "default" : "secondary"}>
                      {float.status}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Floats
                </Button>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="shadow-surface">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Current Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg Temperature</span>
                  <span className="font-medium text-coral-500">28.1°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg Salinity</span>
                  <span className="font-medium text-turquoise-500">35.3 PSU</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Data Points</span>
                  <span className="font-medium text-ocean-600">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Update</span>
                  <span className="font-medium text-foreground">12 min ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-surface">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-turquoise-500" />
                <span>Temperature Profiles</span>
              </CardTitle>
              <CardDescription>Depth vs Temperature for selected floats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-b from-coral-100 to-coral-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-coral-400 mb-4 mx-auto" />
                  <p className="text-coral-600 font-medium">Temperature Profile Chart</p>
                  <p className="text-coral-500 text-sm">Interactive depth analysis</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" size="sm">
                  <Filter className="w-3 h-3 mr-1" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-surface">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-turquoise-500" />
                <span>Time Series Analysis</span>
              </CardTitle>
              <CardDescription>Parameter trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-b from-turquoise-100 to-turquoise-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-turquoise-500 mb-4 mx-auto" />
                  <p className="text-turquoise-700 font-medium">Time Series Chart</p>
                  <p className="text-turquoise-600 text-sm">Trend analysis and forecasting</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" size="sm">
                  <Calendar className="w-3 h-3 mr-1" />
                  Date Range
                </Button>
                <Button variant="outline" size="sm">
                  <Layers className="w-3 h-3 mr-1" />
                  Layers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </OceanBackground>
  );
};

export default Visualize;