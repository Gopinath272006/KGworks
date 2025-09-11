import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  AlertTriangle,
  Download,
  Calendar,
  Target,
  Award,
  Shield
} from "lucide-react";

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  
  // Mock data for analytics
  const attendanceTrends = [
    { date: "Mon", present: 42, total: 45, percentage: 93.3 },
    { date: "Tue", present: 40, total: 45, percentage: 88.9 },
    { date: "Wed", present: 44, total: 45, percentage: 97.8 },
    { date: "Thu", present: 38, total: 45, percentage: 84.4 },
    { date: "Fri", present: 41, total: 45, percentage: 91.1 },
    { date: "Sat", present: 35, total: 45, percentage: 77.8 },
    { date: "Sun", present: 39, total: 45, percentage: 86.7 },
  ];

  const verificationData = [
    { method: "Face Recognition", success: 98.5, failed: 1.5, count: 1200 },
    { method: "Fingerprint", success: 99.2, failed: 0.8, count: 1150 },
    { method: "NFC Presence", success: 99.8, failed: 0.2, count: 1180 },
  ];

  const riskStudents = [
    { name: "John Doe", attendance: 65, trend: "down", risk: "high" },
    { name: "Jane Smith", attendance: 72, trend: "down", risk: "medium" },
    { name: "Mike Johnson", attendance: 68, trend: "up", risk: "medium" },
    { name: "Sarah Davis", attendance: 74, trend: "stable", risk: "low" },
  ];

  const timeDistribution = [
    { time: "8:00-9:00", count: 12, color: "#3b82f6" },
    { time: "9:00-10:00", count: 28, color: "#06b6d4" },
    { time: "10:00-11:00", count: 35, color: "#10b981" },
    { time: "11:00-12:00", count: 15, color: "#f59e0b" },
  ];

  const securityMetrics = [
    { month: "Jan", incidents: 2, threats: 5, resolved: 7 },
    { month: "Feb", incidents: 1, threats: 3, resolved: 4 },
    { month: "Mar", incidents: 0, threats: 2, resolved: 2 },
    { month: "Apr", incidents: 1, threats: 4, resolved: 5 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive attendance insights and security metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">Semester</SelectItem>
              <SelectItem value="year">Academic Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="data-stream">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">91.2%</p>
                <p className="text-sm text-muted-foreground">Average Attendance</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
            <Badge variant="outline" className="mt-2 text-success border-success">
              +2.3% from last week
            </Badge>
          </CardContent>
        </Card>

        <Card className="data-stream">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">98.8%</p>
                <p className="text-sm text-muted-foreground">Verification Success</p>
              </div>
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <Badge variant="outline" className="mt-2 text-primary border-primary">
              Excellent Security
            </Badge>
          </CardContent>
        </Card>

        <Card className="data-stream">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">4</p>
                <p className="text-sm text-muted-foreground">At-Risk Students</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
            <Badge variant="outline" className="mt-2 text-warning border-warning">
              Needs Attention
            </Badge>
          </CardContent>
        </Card>

        <Card className="data-stream">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-secondary">1.8s</p>
                <p className="text-sm text-muted-foreground">Avg Verification Time</p>
              </div>
              <Clock className="w-8 h-8 text-secondary" />
            </div>
            <Badge variant="outline" className="mt-2 text-secondary border-secondary">
              Fast Processing
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Attendance Trends</TabsTrigger>
          <TabsTrigger value="verification">Verification Analytics</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="security">Security Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Attendance Trends</CardTitle>
                <CardDescription>Daily attendance percentages over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={attendanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="percentage" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary) / 0.1)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Check-in Time Distribution</CardTitle>
                <CardDescription>When students typically arrive</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={timeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {timeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>3-Phase Verification Performance</CardTitle>
              <CardDescription>Success rates for each verification method</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={verificationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="method" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="success" fill="hsl(var(--success))" name="Success Rate %" />
                  <Bar dataKey="failed" fill="hsl(var(--destructive))" name="Failure Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            {verificationData.map((method, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-foreground">{method.method}</h3>
                    <div className="text-2xl font-bold text-success">{method.success}%</div>
                    <p className="text-sm text-muted-foreground">
                      {method.count} total verifications
                    </p>
                    <Badge variant="outline" className="text-success border-success">
                      High Reliability
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>At-Risk Students Alert System</CardTitle>
              <CardDescription>Students with attendance below 75% threshold</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskStudents.map((student, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      student.risk === 'high' 
                        ? 'bg-destructive-light border-destructive' 
                        : student.risk === 'medium'
                        ? 'bg-warning-light border-warning'
                        : 'bg-success-light border-success'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        student.risk === 'high' ? 'bg-destructive' :
                        student.risk === 'medium' ? 'bg-warning' : 'bg-success'
                      }`} />
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Attendance: {student.attendance}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={student.risk === 'high' ? 'destructive' : 
                                student.risk === 'medium' ? 'secondary' : 'default'}
                      >
                        {student.risk.charAt(0).toUpperCase() + student.risk.slice(1)} Risk
                      </Badge>
                      {student.trend === 'down' ? (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      ) : student.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <div className="w-4 h-4 bg-muted rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex space-x-4">
                <Button>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Send Alerts
                </Button>
                <Button variant="outline">
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Incident Tracking</CardTitle>
              <CardDescription>Monthly security metrics and threat analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={securityMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="incidents" stroke="hsl(var(--destructive))" name="Security Incidents" />
                  <Line type="monotone" dataKey="threats" stroke="hsl(var(--warning))" name="Threats Detected" />
                  <Line type="monotone" dataKey="resolved" stroke="hsl(var(--success))" name="Issues Resolved" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Shield className="w-8 h-8 text-success mx-auto" />
                  <div className="text-2xl font-bold text-success">99.8%</div>
                  <p className="text-sm text-muted-foreground">System Uptime</p>
                  <Badge variant="outline" className="text-success border-success">
                    Excellent
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <AlertTriangle className="w-8 h-8 text-warning mx-auto" />
                  <div className="text-2xl font-bold text-warning">14</div>
                  <p className="text-sm text-muted-foreground">Threats Blocked</p>
                  <Badge variant="outline" className="text-warning border-warning">
                    Active Defense
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Award className="w-8 h-8 text-primary mx-auto" />
                  <div className="text-2xl font-bold text-primary">A+</div>
                  <p className="text-sm text-muted-foreground">Security Rating</p>
                  <Badge variant="outline" className="text-primary border-primary">
                    Top Tier
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}