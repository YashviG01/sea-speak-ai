import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  History as HistoryIcon, 
  Search, 
  Filter, 
  Download,
  Trash2,
  Eye,
  Calendar,
  Clock,
  MessageSquare,
  BarChart3,
  Database,
  Star,
  StarOff
} from "lucide-react";
import Navigation from "@/components/Navigation";
import OceanBackground from "@/components/OceanBackground";

interface ActivityItem {
  id: string;
  type: "query" | "visualization" | "export" | "download";
  title: string;
  description: string;
  timestamp: Date;
  isFavorite: boolean;
  status: "completed" | "failed" | "processing";
  resultCount?: number;
}

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "query",
      title: "Salinity profiles near equator",
      description: "Show me salinity profiles near the equator in March 2023",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isFavorite: true,
      status: "completed",
      resultCount: 24
    },
    {
      id: "2",
      type: "export",
      title: "BGC data export - Arabian Sea",
      description: "Exported biogeochemical parameters for Arabian Sea region",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isFavorite: false,
      status: "completed",
      resultCount: 156
    },
    {
      id: "3",
      type: "visualization",
      title: "Float trajectory visualization",
      description: "Interactive map showing ARGO float movements",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isFavorite: true,
      status: "completed"
    },
    {
      id: "4",
      type: "download",
      title: "Temperature profiles download",
      description: "Downloaded temperature profile data in NetCDF format",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isFavorite: false,
      status: "completed",
      resultCount: 89
    },
    {
      id: "5",
      type: "query",
      title: "Mediterranean Sea oxygen levels",
      description: "What are the current oxygen levels in the Mediterranean?",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      isFavorite: false,
      status: "failed"
    }
  ]);

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || activity.type === selectedType;
    
    let matchesTime = true;
    if (timeFilter !== "all") {
      const now = new Date();
      const activityTime = activity.timestamp;
      switch (timeFilter) {
        case "today":
          matchesTime = activityTime.toDateString() === now.toDateString();
          break;
        case "week":
          matchesTime = (now.getTime() - activityTime.getTime()) <= 7 * 24 * 60 * 60 * 1000;
          break;
        case "month":
          matchesTime = (now.getTime() - activityTime.getTime()) <= 30 * 24 * 60 * 60 * 1000;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesTime;
  });

  const toggleFavorite = (id: string) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, isFavorite: !activity.isFavorite } : activity
    ));
  };

  const deleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "query":
        return MessageSquare;
      case "visualization":
        return BarChart3;
      case "export":
      case "download":
        return Download;
      default:
        return Database;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  return (
    <OceanBackground>
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Activity History</h1>
          <p className="text-muted-foreground">
            View and manage your past queries, visualizations, and data exports
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-surface">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-turquoise-500" />
              <span>Search & Filter History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Activity Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="query">AI Queries</SelectItem>
                    <SelectItem value="visualization">Visualizations</SelectItem>
                    <SelectItem value="export">Exports</SelectItem>
                    <SelectItem value="download">Downloads</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Time Period</label>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-surface">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Activities</p>
                  <p className="text-2xl font-bold text-foreground">{filteredActivities.length}</p>
                </div>
                <HistoryIcon className="w-8 h-8 text-turquoise-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-surface">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Queries</p>
                  <p className="text-2xl font-bold text-coral-500">
                    {filteredActivities.filter(a => a.type === "query").length}
                  </p>
                </div>
                <MessageSquare className="w-8 h-8 text-coral-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-surface">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Visualizations</p>
                  <p className="text-2xl font-bold text-ocean-600">
                    {filteredActivities.filter(a => a.type === "visualization").length}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-ocean-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-surface">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Favorites</p>
                  <p className="text-2xl font-bold text-turquoise-600">
                    {filteredActivities.filter(a => a.isFavorite).length}
                  </p>
                </div>
                <Star className="w-8 h-8 text-turquoise-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity List */}
        <Card className="shadow-surface">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <HistoryIcon className="w-5 h-5 text-turquoise-500" />
                  <span>Recent Activities</span>
                </CardTitle>
                <CardDescription>
                  {filteredActivities.length} activities found
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export History
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivities.map((activity) => {
                const TypeIcon = getTypeIcon(activity.type);
                return (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-smooth"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-turquoise-100 flex items-center justify-center">
                        <TypeIcon className="w-5 h-5 text-turquoise-600" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {activity.title}
                        </h3>
                        {getStatusBadge(activity.status)}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{getRelativeTime(activity.timestamp)}</span>
                        </div>
                        {activity.resultCount && (
                          <div className="flex items-center space-x-1">
                            <Database className="w-3 h-3" />
                            <span>{activity.resultCount} results</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(activity.id)}
                      >
                        {activity.isFavorite ? (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        ) : (
                          <StarOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteActivity(activity.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                );
              })}

              {filteredActivities.length === 0 && (
                <div className="text-center py-12">
                  <HistoryIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No activities found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or explore some data to get started.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </OceanBackground>
  );
};

export default History;