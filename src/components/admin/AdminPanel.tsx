import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Users, 
  Shield, 
  Database,
  Bell,
  Trash2,
  Edit,
  Plus,
  Search,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserPlus
} from "lucide-react";

export function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data
  const students = [
    { id: 1, name: "Alice Johnson", email: "alice@university.edu", status: "active", enrollment: "2021-09-01", attendance: 94 },
    { id: 2, name: "Bob Smith", email: "bob@university.edu", status: "active", enrollment: "2021-09-01", attendance: 87 },
    { id: 3, name: "Carol Davis", email: "carol@university.edu", status: "inactive", enrollment: "2020-09-01", attendance: 72 },
    { id: 4, name: "David Wilson", email: "david@university.edu", status: "active", enrollment: "2022-01-15", attendance: 96 },
    { id: 5, name: "Emma Brown", email: "emma@university.edu", status: "active", enrollment: "2021-09-01", attendance: 89 },
  ];

  const faculty = [
    { id: 1, name: "Dr. Sarah Miller", email: "s.miller@university.edu", department: "Computer Science", courses: 3, status: "active" },
    { id: 2, name: "Prof. John Anderson", email: "j.anderson@university.edu", department: "Mathematics", courses: 2, status: "active" },
    { id: 3, name: "Dr. Lisa Wong", email: "l.wong@university.edu", department: "Computer Science", courses: 4, status: "inactive" },
  ];

  const systemSettings = {
    attendance: {
      verificationThreshold: 0.85,
      livenessThreshold: 0.80,
      qrRotationInterval: 3,
      sessionTimeout: 120,
      antiSpoofingEnabled: true,
      realTimeUpdates: true
    },
    security: {
      encryptionLevel: "AES-256",
      tokenExpiry: 3,
      maxFailedAttempts: 3,
      ipWhitelisting: false,
      auditLogging: true,
      twoFactorAuth: true
    },
    notifications: {
      lowAttendanceAlerts: true,
      securityIncidents: true,
      systemMaintenance: true,
      weeklyReports: true
    }
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground">System management and configuration</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-success border-success bg-success-light">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
            System Healthy
          </Badge>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* User Management */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Student Management</span>
                    </CardTitle>
                    <CardDescription>Manage student accounts and enrollments</CardDescription>
                  </div>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Student List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredStudents.map((student) => (
                    <div 
                      key={student.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground font-medium">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Enrolled: {new Date(student.enrollment).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">{student.attendance}%</p>
                          <p className="text-xs text-muted-foreground">Attendance</p>
                        </div>
                        <Badge 
                          variant={student.status === 'active' ? 'default' : 'secondary'}
                        >
                          {student.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Faculty Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Faculty</span>
                </CardTitle>
                <CardDescription>Manage faculty accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faculty.map((member) => (
                    <div key={member.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-foreground">{member.name}</p>
                        <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                          {member.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{member.department}</p>
                      <p className="text-xs text-muted-foreground">{member.courses} courses</p>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Faculty
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Attendance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Attendance Settings</span>
                </CardTitle>
                <CardDescription>Configure verification parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Face Verification Threshold</Label>
                  <div className="flex items-center space-x-3">
                    <Input 
                      type="number" 
                      value={systemSettings.attendance.verificationThreshold} 
                      min="0.5" 
                      max="1.0" 
                      step="0.01"
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Liveness Detection Threshold</Label>
                  <div className="flex items-center space-x-3">
                    <Input 
                      type="number" 
                      value={systemSettings.attendance.livenessThreshold} 
                      min="0.5" 
                      max="1.0" 
                      step="0.01"
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">80%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>QR Rotation Interval (seconds)</Label>
                  <Input 
                    type="number" 
                    value={systemSettings.attendance.qrRotationInterval} 
                    min="1" 
                    max="60"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input 
                    type="number" 
                    value={systemSettings.attendance.sessionTimeout} 
                    min="5" 
                    max="300"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Anti-Spoofing Detection</Label>
                    <Switch checked={systemSettings.attendance.antiSpoofingEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Real-time Updates</Label>
                    <Switch checked={systemSettings.attendance.realTimeUpdates} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </CardTitle>
                <CardDescription>Configure alert preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Low Attendance Alerts</Label>
                      <p className="text-sm text-muted-foreground">Notify when attendance drops below 75%</p>
                    </div>
                    <Switch checked={systemSettings.notifications.lowAttendanceAlerts} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Security Incidents</Label>
                      <p className="text-sm text-muted-foreground">Immediate alerts for security issues</p>
                    </div>
                    <Switch checked={systemSettings.notifications.securityIncidents} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Maintenance</Label>
                      <p className="text-sm text-muted-foreground">Scheduled maintenance notifications</p>
                    </div>
                    <Switch checked={systemSettings.notifications.systemMaintenance} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Automated attendance summaries</p>
                    </div>
                    <Switch checked={systemSettings.notifications.weeklyReports} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Security Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Configuration</span>
                </CardTitle>
                <CardDescription>Advanced security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Encryption Level</Label>
                  <Input value={systemSettings.security.encryptionLevel} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>Token Expiry (seconds)</Label>
                  <Input 
                    type="number" 
                    value={systemSettings.security.tokenExpiry}
                    min="1"
                    max="300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Max Failed Attempts</Label>
                  <Input 
                    type="number" 
                    value={systemSettings.security.maxFailedAttempts}
                    min="1"
                    max="10"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>IP Whitelisting</Label>
                    <Switch checked={systemSettings.security.ipWhitelisting} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Audit Logging</Label>
                    <Switch checked={systemSettings.security.auditLogging} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Two-Factor Authentication</Label>
                    <Switch checked={systemSettings.security.twoFactorAuth} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Security Status</span>
                </CardTitle>
                <CardDescription>Current security metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-success-light rounded-lg">
                    <p className="text-lg font-bold text-success">0</p>
                    <p className="text-xs text-muted-foreground">Active Threats</p>
                  </div>
                  <div className="text-center p-3 bg-warning-light rounded-lg">
                    <p className="text-lg font-bold text-warning">3</p>
                    <p className="text-xs text-muted-foreground">Blocked Attempts</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Firewall Status</span>
                    <Badge variant="default" className="bg-success text-success-foreground">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>SSL Certificate</span>
                    <Badge variant="default" className="bg-success text-success-foreground">Valid</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Last Security Scan</span>
                    <Badge variant="outline">2 hours ago</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Vulnerability Score</span>
                    <Badge variant="default" className="bg-success text-success-foreground">A+</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* System Maintenance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Database Management</span>
                </CardTitle>
                <CardDescription>Database operations and maintenance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Restore Database
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Optimize Database
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clean Old Records
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Database Size</p>
                      <p className="font-medium">2.4 GB</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Records</p>
                      <p className="font-medium">45,234</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Backup</p>
                      <p className="font-medium">2 hours ago</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-medium text-success">Healthy</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>System Health</span>
                </CardTitle>
                <CardDescription>Monitor system performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm font-medium">23%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex items-center justify-between">  
                    <span className="text-sm">Disk Usage</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Network I/O</span>
                    <span className="text-sm font-medium">12 MB/s</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    System Diagnostics
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}