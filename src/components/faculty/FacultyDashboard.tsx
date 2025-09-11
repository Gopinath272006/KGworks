import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  QrCode,
  RefreshCw,
  Download,
  Eye,
  UserCheck,
  UserX,
  TrendingUp,
  Play,
  Pause
} from "lucide-react";

export function FacultyDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionActive, setSessionActive] = useState(false);
  const [qrRotation, setQrRotation] = useState(0);
  const [attendanceData, setAttendanceData] = useState({
    present: 0,
    total: 45,
    pending: 0,
    verified: 0
  });

  // Mock real-time updates
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // QR rotation simulation
  useEffect(() => {
    if (sessionActive) {
      const qrInterval = setInterval(() => {
        setQrRotation(prev => prev + 1);
        // Simulate attendance updates
        setAttendanceData(prev => {
          const newPresent = Math.min(prev.total, prev.present + Math.floor(Math.random() * 3));
          const newVerified = Math.min(newPresent, prev.verified + Math.floor(Math.random() * 2));
          return {
            ...prev,
            present: newPresent,
            verified: newVerified,
            pending: newPresent - newVerified
          };
        });
      }, 3000);

      return () => clearInterval(qrInterval);
    }
  }, [sessionActive]);

  const mockStudents = [
    { id: 1, name: "Alice Johnson", status: "verified", time: "09:02:15", confidence: 0.92 },
    { id: 2, name: "Bob Smith", status: "verified", time: "09:01:43", confidence: 0.89 },
    { id: 3, name: "Carol Davis", status: "pending", time: "09:03:01", confidence: 0.87 },
    { id: 4, name: "David Wilson", status: "verified", time: "08:59:32", confidence: 0.94 },
    { id: 5, name: "Emma Brown", status: "pending", time: "09:02:58", confidence: 0.91 },
  ];

  const generateQRCode = () => {
    // Mock QR code generation
    const timestamp = Date.now();
    const token = `ATTEND_${timestamp}_${qrRotation}`;
    return token;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Dashboard</h1>
          <p className="text-muted-foreground">CS-301: Advanced Algorithms</p>
          <p className="text-sm text-muted-foreground">
            {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant={sessionActive ? "destructive" : "default"}
            onClick={() => setSessionActive(!sessionActive)}
            className="shadow-medium"
          >
            {sessionActive ? <Pause className="mr-2 w-4 h-4" /> : <Play className="mr-2 w-4 h-4" />}
            {sessionActive ? "End Session" : "Start Session"}
          </Button>
          <Badge variant={sessionActive ? "default" : "secondary"}>
            {sessionActive ? "Live Session" : "Session Inactive"}
          </Badge>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="data-stream">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">{attendanceData.present}</p>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
              <UserCheck className="w-8 h-8 text-success" />
            </div>
            <Progress 
              value={(attendanceData.present / attendanceData.total) * 100} 
              className="mt-3"
            />
          </CardContent>
        </Card>

        <Card className="data-stream">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{attendanceData.verified}</p>
                <p className="text-sm text-muted-foreground">Verified</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <Progress 
              value={(attendanceData.verified / attendanceData.present) * 100} 
              className="mt-3"
            />
          </CardContent>
        </Card>

        <Card className="data-stream">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">{attendanceData.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
            <Progress 
              value={(attendanceData.pending / attendanceData.total) * 100} 
              className="mt-3"
            />
          </CardContent>
        </Card>

        <Card className="data-stream">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-muted-foreground">{attendanceData.total - attendanceData.present}</p>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
              <UserX className="w-8 h-8 text-muted-foreground" />
            </div>
            <Progress 
              value={((attendanceData.total - attendanceData.present) / attendanceData.total) * 100} 
              className="mt-3"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* QR Code Generator */}
        <div className="lg:col-span-1">
          <Card className={`${sessionActive ? 'border-primary shadow-glow' : ''} transition-all duration-smooth`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <QrCode className="w-5 h-5" />
                <span>Live QR Code</span>
              </CardTitle>
              <CardDescription>
                {sessionActive ? "Rotating every 3 seconds" : "Start session to generate QR"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sessionActive ? (
                <div className="space-y-4">
                  <div className={`w-full h-48 bg-gradient-scan rounded-lg flex items-center justify-center ${sessionActive ? 'qr-rotate scan-animation' : ''}`}>
                    <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                      <QrCode className="w-20 h-20 text-primary" />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="font-mono text-sm bg-muted p-2 rounded">
                      {generateQRCode()}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      Rotation #{qrRotation}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <QrCode className="w-16 h-16 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">QR Code Inactive</p>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Attendance Feed */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Live Attendance Feed</span>
              </CardTitle>
              <CardDescription>Real-time verification status updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {mockStudents.map((student) => (
                  <div 
                    key={student.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-smooth ${
                      student.status === 'verified' 
                        ? 'bg-success-light border-success verify-success' 
                        : 'bg-warning-light border-warning'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        student.status === 'verified' ? 'bg-success animate-pulse' : 'bg-warning'
                      }`} />
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Confidence: {(student.confidence * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={student.status === 'verified' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {student.status === 'verified' ? 'Verified' : 'Pending'}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{student.time}</p>
                    </div>
                  </div>
                ))}
                
                {sessionActive && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span>Monitoring for new check-ins...</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Session Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Session Management</span>
          </CardTitle>
          <CardDescription>Control attendance session and export data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Send Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}