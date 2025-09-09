import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Database, 
  Search, 
  Filter, 
  Download,
  RefreshCw,
  Eye,
  MoreHorizontal,
  SortAsc,
  SortDesc,
  Calendar,
  MapPin
} from "lucide-react";
import Navigation from "@/components/Navigation";
import OceanBackground from "@/components/OceanBackground";

interface FloatData {
  id: string;
  wmo: string;
  latitude: number;
  longitude: number;
  date: string;
  temperature: number;
  salinity: number;
  pressure: number;
  oxygen?: number;
  status: "active" | "inactive" | "delayed";
  platform: string;
}

const DataExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const floatData: FloatData[] = [
    {
      id: "1",
      wmo: "2903458",
      latitude: 25.45,
      longitude: 65.23,
      date: "2024-01-15",
      temperature: 28.5,
      salinity: 35.2,
      pressure: 1013.2,
      oxygen: 210.5,
      status: "active",
      platform: "APEX"
    },
    {
      id: "2",
      wmo: "5906102",
      latitude: 24.82,
      longitude: 67.15,
      date: "2024-01-14",
      temperature: 27.8,
      salinity: 35.4,
      pressure: 1015.8,
      oxygen: 208.2,
      status: "active",
      platform: "SOLO"
    },
    {
      id: "3",
      wmo: "4903261",
      latitude: 26.18,
      longitude: 64.52,
      date: "2024-01-13",
      temperature: 29.1,
      salinity: 35.0,
      pressure: 1012.5,
      oxygen: 212.8,
      status: "active",
      platform: "APEX"
    },
    {
      id: "4",
      wmo: "7890123",
      latitude: 23.55,
      longitude: 68.31,
      date: "2024-01-10",
      temperature: 26.9,
      salinity: 35.6,
      pressure: 1018.1,
      status: "delayed",
      platform: "PROVOR"
    },
    {
      id: "5",
      wmo: "3456789",
      latitude: 27.22,
      longitude: 63.87,
      date: "2024-01-08",
      temperature: 28.9,
      salinity: 34.8,
      pressure: 1014.2,
      oxygen: 215.3,
      status: "inactive",
      platform: "APEX"
    }
  ];

  const filteredData = floatData.filter(item => {
    const matchesSearch = item.wmo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue: any = a[sortBy as keyof FloatData];
    let bValue: any = b[sortBy as keyof FloatData];
    
    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "delayed":
        return "secondary";
      case "inactive":
        return "outline";
      default:
        return "outline";
    }
  };

  const exportFormats = [
    { value: "csv", label: "CSV" },
    { value: "netcdf", label: "NetCDF" },
    { value: "ascii", label: "ASCII" },
    { value: "json", label: "JSON" }
  ];

  return (
    <OceanBackground>
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Data Explorer</h1>
          <p className="text-muted-foreground">
            Browse, filter, and export structured oceanographic datasets from ARGO floats
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-surface">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-turquoise-500" />
              <span>Search & Filter</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by WMO ID or platform..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
                <div className="flex space-x-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="wmo">WMO ID</SelectItem>
                      <SelectItem value="temperature">Temperature</SelectItem>
                      <SelectItem value="salinity">Salinity</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  >
                    {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-surface">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                  <p className="text-2xl font-bold text-foreground">{sortedData.length}</p>
                </div>
                <Database className="w-8 h-8 text-turquoise-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-surface">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Floats</p>
                  <p className="text-2xl font-bold text-coral-500">
                    {sortedData.filter(f => f.status === "active").length}
                  </p>
                </div>
                <MapPin className="w-8 h-8 text-coral-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-surface">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Temperature</p>
                  <p className="text-2xl font-bold text-ocean-600">
                    {(sortedData.reduce((sum, f) => sum + f.temperature, 0) / sortedData.length).toFixed(1)}°C
                  </p>
                </div>
                <span className="text-2xl">🌡️</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-surface">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Salinity</p>
                  <p className="text-2xl font-bold text-turquoise-600">
                    {(sortedData.reduce((sum, f) => sum + f.salinity, 0) / sortedData.length).toFixed(1)} PSU
                  </p>
                </div>
                <span className="text-2xl">🧂</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="shadow-surface">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-turquoise-500" />
                  <span>ARGO Float Data</span>
                </CardTitle>
                <CardDescription>
                  Showing {sortedData.length} records from oceanographic floats
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Select defaultValue="csv">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {exportFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="hero" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-foreground">WMO ID</th>
                    <th className="text-left p-4 font-medium text-foreground">Location</th>
                    <th className="text-left p-4 font-medium text-foreground">Date</th>
                    <th className="text-left p-4 font-medium text-foreground">Temperature</th>
                    <th className="text-left p-4 font-medium text-foreground">Salinity</th>
                    <th className="text-left p-4 font-medium text-foreground">Pressure</th>
                    <th className="text-left p-4 font-medium text-foreground">Oxygen</th>
                    <th className="text-left p-4 font-medium text-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-foreground">Platform</th>
                    <th className="text-left p-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((item, index) => (
                    <tr key={item.id} className={`border-t hover:bg-muted/30 transition-smooth ${index % 2 === 0 ? "bg-background" : "bg-muted/10"}`}>
                      <td className="p-4 font-mono text-sm text-foreground">{item.wmo}</td>
                      <td className="p-4 text-sm text-foreground">
                        {item.latitude.toFixed(2)}°N, {item.longitude.toFixed(2)}°E
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span>{item.date}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-coral-600 font-medium">{item.temperature}°C</td>
                      <td className="p-4 text-sm text-turquoise-600 font-medium">{item.salinity} PSU</td>
                      <td className="p-4 text-sm text-ocean-600 font-medium">{item.pressure} dbar</td>
                      <td className="p-4 text-sm text-foreground">
                        {item.oxygen ? `${item.oxygen} μmol/kg` : "N/A"}
                      </td>
                      <td className="p-4">
                        <Badge variant={getStatusBadgeVariant(item.status)}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-foreground">{item.platform}</td>
                      <td className="p-4">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </OceanBackground>
  );
};

export default DataExplorer;