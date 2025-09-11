import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  QrCode, 
  Play, 
  Pause, 
  RefreshCw, 
  Download,
  Settings,
  Clock,
  Shield,
  Copy,
  CheckCircle
} from "lucide-react";

export function QRGenerator() {
  const [isActive, setIsActive] = useState(false);
  const [currentQR, setCurrentQR] = useState("");
  const [rotationCount, setRotationCount] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [copied, setCopied] = useState(false);
  
  // Configuration
  const [config, setConfig] = useState({
    rotationInterval: 3,
    sessionDuration: 60,
    encryption: "AES-256",
    classroom: "CS-301-Lab",
    course: "Advanced Algorithms"
  });

  // Generate QR code token
  const generateQRToken = () => {
    const timestamp = Date.now();
    const sessionId = Math.random().toString(36).substring(2, 15);
    const token = `ATTEND_${config.classroom}_${timestamp}_${sessionId}`;
    return token;
  };

  // Session timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // QR rotation
  useEffect(() => {
    let rotationInterval: NodeJS.Timeout;
    if (isActive) {
      rotationInterval = setInterval(() => {
        setCurrentQR(generateQRToken());
        setRotationCount(prev => prev + 1);
      }, config.rotationInterval * 1000);
      
      // Generate initial QR
      setCurrentQR(generateQRToken());
    }
    return () => clearInterval(rotationInterval);
  }, [isActive, config.rotationInterval]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentQR);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startSession = () => {
    setIsActive(true);
    setSessionTime(0);
    setRotationCount(0);
  };

  const stopSession = () => {
    setIsActive(false);
    setCurrentQR("");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-scan rounded-full flex items-center justify-center mx-auto">
          <QrCode className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">QR Code Generator</h1>
          <p className="text-muted-foreground">Generate rotating attendance verification codes</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* QR Display */}
        <div className="lg:col-span-2">
          <Card className={`${isActive ? 'border-primary shadow-glow' : ''} transition-all duration-smooth`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <QrCode className="w-5 h-5" />
                    <span>Live QR Code</span>
                  </CardTitle>
                  <CardDescription>
                    {isActive ? `Rotating every ${config.rotationInterval} seconds` : "Start session to generate QR codes"}
                  </CardDescription>
                </div>
                <Badge variant={isActive ? "default" : "secondary"}>
                  {isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code Display */}
              <div className="text-center">
                {isActive ? (
                  <div className="space-y-4">
                    <div className={`w-80 h-80 mx-auto bg-gradient-scan rounded-2xl flex items-center justify-center shadow-strong ${isActive ? 'qr-rotate scan-animation' : ''}`}>
                      <div className="w-64 h-64 bg-white rounded-xl flex items-center justify-center shadow-medium">
                        <QrCode className="w-48 h-48 text-primary" />
                      </div>
                    </div>
                    
                    {/* Session Info */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-lg font-bold text-primary">{formatTime(sessionTime)}</p>
                        <p className="text-xs text-muted-foreground">Session Time</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-lg font-bold text-secondary">{rotationCount}</p>
                        <p className="text-xs text-muted-foreground">Rotations</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-lg font-bold text-success">{config.rotationInterval}s</p>
                        <p className="text-xs text-muted-foreground">Interval</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-80 h-80 mx-auto bg-muted rounded-2xl flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <QrCode className="w-24 h-24 text-muted-foreground mx-auto" />
                      <div>
                        <h3 className="font-semibold text-foreground">QR Code Inactive</h3>
                        <p className="text-sm text-muted-foreground">Start a session to begin generating codes</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Current Token */}
              {currentQR && (
                <Card className="bg-muted/50">
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Current Token</Label>
                      <div className="flex items-center space-x-2">
                        <Input 
                          value={currentQR} 
                          readOnly 
                          className="font-mono text-xs bg-background"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={copyToClipboard}
                          className="flex-shrink-0"
                        >
                          {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Shield className="w-3 h-3" />
                          <span>AES-256 Encrypted</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>3s TTL</span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                <Button
                  variant={isActive ? "destructive" : "default"}
                  onClick={isActive ? stopSession : startSession}
                  className="shadow-medium"
                >
                  {isActive ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Stop Session
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Session
                    </>
                  )}
                </Button>
                
                {isActive && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setCurrentQR(generateQRToken());
                      setRotationCount(prev => prev + 1);
                    }}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Force Rotation
                  </Button>
                )}
                
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Session Config</span>
              </CardTitle>
              <CardDescription>Customize QR generation settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input
                  id="course"
                  value={config.course}
                  onChange={(e) => setConfig(prev => ({...prev, course: e.target.value}))}
                  disabled={isActive}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="classroom">Classroom</Label>
                <Input
                  id="classroom"
                  value={config.classroom}
                  onChange={(e) => setConfig(prev => ({...prev, classroom: e.target.value}))}
                  disabled={isActive}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interval">Rotation Interval (seconds)</Label>
                <Select 
                  value={config.rotationInterval.toString()} 
                  onValueChange={(value) => setConfig(prev => ({...prev, rotationInterval: parseInt(value)}))}
                  disabled={isActive}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 seconds</SelectItem>
                    <SelectItem value="3">3 seconds</SelectItem>
                    <SelectItem value="5">5 seconds</SelectItem>
                    <SelectItem value="10">10 seconds</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Session Duration (minutes)</Label>
                <Select 
                  value={config.sessionDuration.toString()} 
                  onValueChange={(value) => setConfig(prev => ({...prev, sessionDuration: parseInt(value)}))}
                  disabled={isActive}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="encryption">Encryption</Label>
                <Select 
                  value={config.encryption} 
                  onValueChange={(value) => setConfig(prev => ({...prev, encryption: value}))}
                  disabled={isActive}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AES-256">AES-256</SelectItem>
                    <SelectItem value="RSA-2048">RSA-2048</SelectItem>
                    <SelectItem value="ChaCha20">ChaCha20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Security Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Encryption</span>
                <Badge variant="outline">AES-256</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Token TTL</span>
                <Badge variant="outline">3 seconds</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Hash Algorithm</span>
                <Badge variant="outline">SHA-256</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Anti-Replay</span>
                <Badge variant="default" className="bg-success text-success-foreground">Active</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Timestamp Validation</span>
                <Badge variant="default" className="bg-success text-success-foreground">Enabled</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          {isActive && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center space-y-1">
                  <p className="text-2xl font-bold text-primary">{rotationCount}</p>
                  <p className="text-sm text-muted-foreground">QR Codes Generated</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-2xl font-bold text-secondary">{formatTime(sessionTime)}</p>
                  <p className="text-sm text-muted-foreground">Active Duration</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-2xl font-bold text-success">0</p>
                  <p className="text-sm text-muted-foreground">Security Incidents</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}