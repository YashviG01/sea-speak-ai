import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Database, 
  Save,
  Trash2,
  Key,
  Moon,
  Sun
} from "lucide-react";
import Navigation from "@/components/Navigation";
import OceanBackground from "@/components/OceanBackground";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Chen",
    email: "sarah.chen@oceanresearch.org",
    institution: "Marine Research Institute",
    role: "Research Scientist"
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "UTC",
    notifications: true,
    autoRefresh: true,
    dataUnits: "metric"
  });

  const [privacy, setPrivacy] = useState({
    shareData: false,
    publicProfile: false,
    analyticsConsent: true
  });

  const handleSave = () => {
    // Save settings logic
    console.log("Settings saved");
  };

  return (
    <OceanBackground>
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and application settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="shadow-surface">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-turquoise-500" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>
                Update your personal information and institutional details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={profile.institution}
                    onChange={(e) => setProfile({...profile, institution: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    onChange={(e) => setProfile({...profile, role: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Preferences */}
          <Card className="shadow-surface">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-turquoise-500" />
                <span>Application Preferences</span>
              </CardTitle>
              <CardDescription>
                Customize your SeaSpeak experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Language</Label>
                  <Select value={preferences.language} onValueChange={(value) => setPreferences({...preferences, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Timezone</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => setPreferences({...preferences, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Toggle between light and dark ocean themes</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4 text-muted-foreground" />
                    <Switch
                      checked={theme === 'dark'}
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
                    <Moon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-refresh Data</Label>
                    <p className="text-sm text-muted-foreground">Automatically update data every 15 minutes</p>
                  </div>
                  <Switch
                    checked={preferences.autoRefresh}
                    onCheckedChange={(checked) => setPreferences({...preferences, autoRefresh: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Data Units</Label>
                    <p className="text-sm text-muted-foreground">Choose measurement system</p>
                  </div>
                  <Select value={preferences.dataUnits} onValueChange={(value) => setPreferences({...preferences, dataUnits: value})}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric</SelectItem>
                      <SelectItem value="imperial">Imperial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="shadow-surface">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-turquoise-500" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>
                Control how you receive updates and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about new data and system alerts</p>
                </div>
                <Switch
                  checked={preferences.notifications}
                  onCheckedChange={(checked) => setPreferences({...preferences, notifications: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card className="shadow-surface">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-turquoise-500" />
                <span>Data & Privacy</span>
              </CardTitle>
              <CardDescription>
                Manage your data sharing and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Share Research Data</Label>
                  <p className="text-sm text-muted-foreground">Allow your queries to contribute to research datasets</p>
                </div>
                <Switch
                  checked={privacy.shareData}
                  onCheckedChange={(checked) => setPrivacy({...privacy, shareData: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Public Profile</Label>
                  <p className="text-sm text-muted-foreground">Make your profile visible to other researchers</p>
                </div>
                <Switch
                  checked={privacy.publicProfile}
                  onCheckedChange={(checked) => setPrivacy({...privacy, publicProfile: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Analytics</Label>
                  <p className="text-sm text-muted-foreground">Help improve SeaSpeak by sharing usage analytics</p>
                </div>
                <Switch
                  checked={privacy.analyticsConsent}
                  onCheckedChange={(checked) => setPrivacy({...privacy, analyticsConsent: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="shadow-surface">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-turquoise-500" />
                <span>Security</span>
              </CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Change Password</Label>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
                <Button variant="outline" size="sm">
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-destructive">Delete Account</Label>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Settings */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button variant="hero" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </OceanBackground>
  );
};

export default Settings;