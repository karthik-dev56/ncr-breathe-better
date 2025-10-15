import { useState } from "react";
import Navigation from "@/components/Navigation";
import AQIBanner from "@/components/AQIBanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateAverageAQI, mockStations } from "@/utils/aqiUtils";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Shield, Users, FileText, Database, TrendingUp, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const Admin = () => {
  const averageAQI = calculateAverageAQI(mockStations);
  const [activeTab, setActiveTab] = useState("overview");

  const userStats = [
    { name: "Total Users", value: "2,847", change: "+12%", icon: Users, color: "text-primary" },
    { name: "Active Today", value: "1,234", change: "+8%", icon: TrendingUp, color: "text-aqi-good" },
    { name: "Reports Submitted", value: "847", change: "+23%", icon: FileText, color: "text-aqi-moderate" },
    { name: "Data Points", value: "45.2K", change: "+5%", icon: Database, color: "text-primary-light" },
  ];

  const reportData = [
    { category: "Construction", count: 234, verified: 198, pending: 36 },
    { category: "Waste Burning", count: 189, verified: 156, pending: 33 },
    { category: "Industrial", count: 167, verified: 145, pending: 22 },
    { category: "Traffic", count: 145, verified: 132, pending: 13 },
    { category: "Stubble", count: 112, verified: 98, pending: 14 },
  ];

  const userActivityData = [
    { time: "00:00", users: 145 },
    { time: "04:00", users: 89 },
    { time: "08:00", users: 456 },
    { time: "12:00", users: 678 },
    { time: "16:00", users: 834 },
    { time: "20:00", users: 723 },
    { time: "Now", users: 567 },
  ];

  const recentReports = [
    { id: "REP-2025-1045", user: "Rahul K.", location: "Dwarka", status: "pending", time: "5 min ago" },
    { id: "REP-2025-1044", user: "Priya S.", location: "RK Puram", status: "verified", time: "12 min ago" },
    { id: "REP-2025-1043", user: "Amit M.", location: "Noida", status: "verified", time: "25 min ago" },
    { id: "REP-2025-1042", user: "Sneha R.", location: "Gurugram", status: "action-taken", time: "1 hour ago" },
  ];

  const COLORS = ["hsl(var(--aqi-poor))", "hsl(var(--aqi-moderate))", "hsl(var(--primary))", "hsl(var(--aqi-satisfactory))", "hsl(var(--muted-foreground))"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AQIBanner aqi={averageAQI} location="Delhi-NCR Average" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary animate-pulse-glow" />
            <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">System overview and data management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.name} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in border-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                    {stat.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <Badge variant="outline" className="text-aqi-good border-aqi-good">
                      {stat.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in-up">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="data">Data Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* User Activity Chart */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>User Activity - Last 24 Hours</CardTitle>
                <CardDescription>Real-time platform usage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Report Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Report Categories</CardTitle>
                  <CardDescription>Breakdown by pollution type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={reportData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, count }) => `${category}: ${count}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {reportData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Report Verification Status</CardTitle>
                  <CardDescription>Verified vs Pending</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={reportData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Bar dataKey="verified" fill="hsl(var(--aqi-good))" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="pending" fill="hsl(var(--aqi-moderate))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Recent Reports Queue</CardTitle>
                <CardDescription>Pending moderation and verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report, index) => (
                    <div 
                      key={report.id} 
                      className="flex items-center justify-between p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors animate-slide-in-right"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        {report.status === "pending" ? (
                          <Clock className="w-5 h-5 text-aqi-moderate animate-pulse" />
                        ) : report.status === "verified" ? (
                          <CheckCircle2 className="w-5 h-5 text-aqi-good" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-primary" />
                        )}
                        <div>
                          <p className="font-semibold">{report.id}</p>
                          <p className="text-sm text-muted-foreground">{report.user} • {report.location} • {report.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {report.status === "pending" && (
                          <>
                            <Button variant="outline" size="sm">Review</Button>
                            <Button size="sm">Verify</Button>
                          </>
                        )}
                        {report.status === "verified" && (
                          <Badge className="bg-aqi-good text-white">Verified</Badge>
                        )}
                        {report.status === "action-taken" && (
                          <Badge className="bg-primary text-white">Action Taken</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Platform user overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Rahul Kumar", email: "rahul@example.com", role: "Citizen", reports: 23, joined: "2024-01-15" },
                    { name: "Priya Sharma", email: "priya@cpcb.gov.in", role: "Data Manager", reports: 0, joined: "2023-11-20" },
                    { name: "Amit Patel", email: "amit@example.com", role: "Citizen", reports: 47, joined: "2024-02-10" },
                    { name: "Rajesh Verma", email: "rajesh@delhi.gov.in", role: "Policy Maker", reports: 0, joined: "2023-09-05" },
                  ].map((user, index) => (
                    <div 
                      key={user.email}
                      className="flex items-center justify-between p-4 bg-accent rounded-lg hover:shadow-md transition-all animate-scale-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{user.reports} reports</p>
                          <p className="text-xs text-muted-foreground">Joined {user.joined}</p>
                        </div>
                        <Badge variant={user.role === "Citizen" ? "outline" : "default"}>
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all hover:scale-105 duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary" />
                    Upload Sensor Data
                  </CardTitle>
                  <CardDescription>Batch import from monitoring stations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    Select CSV File
                  </Button>
                  <Button className="w-full">
                    Process & Upload
                  </Button>
                  <div className="p-3 bg-accent rounded text-sm">
                    <p className="text-muted-foreground">Last upload: 2 hours ago</p>
                    <p className="text-muted-foreground">12,547 data points processed</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all hover:scale-105 duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-aqi-good" />
                    Retrain ML Models
                  </CardTitle>
                  <CardDescription>Update forecasting algorithms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    Configure Parameters
                  </Button>
                  <Button className="w-full">
                    Start Training
                  </Button>
                  <div className="p-3 bg-accent rounded text-sm">
                    <p className="text-muted-foreground">Model accuracy: 87%</p>
                    <p className="text-muted-foreground">Last trained: 3 days ago</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
