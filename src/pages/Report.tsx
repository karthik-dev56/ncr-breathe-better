import { useState } from "react";
import Navigation from "@/components/Navigation";
import AQIBanner from "@/components/AQIBanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateAverageAQI, mockStations } from "@/utils/aqiUtils";
import { Camera, MapPin, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Report = () => {
  const averageAQI = calculateAverageAQI(mockStations);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    location: "",
    category: "",
    description: "",
    photo: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reportId = `REP-2025-${Math.floor(Math.random() * 10000)}`;
    toast({
      title: "Report Submitted Successfully!",
      description: `Your report ID: ${reportId}. Thank you for helping monitor air quality.`,
    });
    setFormData({ location: "", category: "", description: "", photo: null });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AQIBanner aqi={averageAQI} location="Delhi-NCR Average" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Report Pollution Incident</h1>
          <p className="text-muted-foreground">Help us track pollution sources in your area</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Submit a Report
            </CardTitle>
            <CardDescription>All fields are required for accurate monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g., Dwarka Sector 10, Delhi"
                    className="pl-10"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Auto-detected: 28.5921°N, 77.0460°E</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Pollution Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="construction">Construction Dust</SelectItem>
                    <SelectItem value="waste-burning">Waste Burning</SelectItem>
                    <SelectItem value="industrial">Industrial Emissions</SelectItem>
                    <SelectItem value="traffic">Traffic Congestion</SelectItem>
                    <SelectItem value="stubble">Stubble Burning</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you're seeing (smoke, dust, unusual smell, etc.)"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Upload Photo (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline" className="w-full">
                    <Camera className="w-4 h-4 mr-2" />
                    Choose Photo
                  </Button>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit Report
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Reports in Your Area</CardTitle>
            <CardDescription>Community-submitted pollution incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "REP-2025-1015", location: "Dwarka Sector 8", category: "Construction Dust", time: "2 hours ago", status: "Under Review" },
                { id: "REP-2025-1012", location: "RK Puram", category: "Waste Burning", time: "5 hours ago", status: "Verified" },
                { id: "REP-2025-1008", location: "Gurugram Sec 29", category: "Industrial", time: "1 day ago", status: "Action Taken" },
              ].map((report) => (
                <div key={report.id} className="p-4 bg-accent rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{report.location}</p>
                      <p className="text-sm text-muted-foreground">{report.category} • {report.time}</p>
                      <p className="text-xs text-muted-foreground mt-1">ID: {report.id}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      report.status === "Action Taken" ? "bg-aqi-good text-white" :
                      report.status === "Verified" ? "bg-aqi-moderate text-white" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Report;
