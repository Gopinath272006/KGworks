import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  QrCode, 
  Camera, 
  Fingerprint, 
  Wifi,
  CheckCircle,
  Clock,
  AlertTriangle,
  Smartphone,
  Shield,
  MapPin,
  User,
  Calendar
} from "lucide-react";

export function StudentInterface() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [studentData] = useState({
    name: "Alice Johnson",
    id: "CS21B1001",
    course: "CS-301: Advanced Algorithms",
    time: new Date().toLocaleTimeString()
  });

  const verificationSteps = [
    {
      id: 1,
      title: "Scan QR Code",
      description: "Point camera at faculty's rotating QR code",
      icon: QrCode,
      status: "pending",
      color: "primary"
    },
    {
      id: 2,
      title: "Face Verification",
      description: "AI facial recognition with liveness detection",
      icon: Camera,
      status: "pending", 
      color: "primary"
    },
    {
      id: 3,
      title: "Fingerprint Auth",
      description: "Biometric authentication on your device",
      icon: Fingerprint,
      status: "pending",
      color: "success"
    },
    {
      id: 4,
      title: "NFC Presence",
      description: "Tap classroom beacon to verify location",
      icon: Wifi,
      status: "pending",
      color: "secondary"
    }
  ];

  // Simulate verification process
  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setVerificationProgress(prev => {
          if (prev >= 100) {
            setScanning(false);
            setCurrentStep(prev => Math.min(prev + 1, verificationSteps.length));
            return 0;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [scanning, verificationSteps.length]);

  const startVerification = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setScanning(true);
    setVerificationProgress(0);
  };

  const getStepStatus = (index: number) => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return scanning ? "processing" : "active";
    return "pending";
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
      {/* Mobile App Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-scan rounded-full flex items-center justify-center mx-auto">
          <Smartphone className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Attendance App</h1>
          <p className="text-muted-foreground">3-Phase Biometric Verification</p>
        </div>
      </div>

      {/* Student Info Card */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{studentData.name}</h3>
              <p className="text-sm text-muted-foreground">{studentData.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{studentData.course}</p>
              <p className="text-xs text-muted-foreground flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {studentData.time}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Verification Process</h2>
          <p className="text-muted-foreground">Complete all phases to mark attendance</p>
        </div>

        <div className="grid gap-4">
          {verificationSteps.map((step, index) => {
            const Icon = step.icon;
            const status = getStepStatus(index);
            
            return (
              <Card 
                key={step.id}
                className={`transition-all duration-smooth ${
                  status === "completed" 
                    ? "border-success bg-success-light verify-success" 
                    : status === "processing" 
                    ? "border-primary bg-primary/5 scan-animation shadow-glow"
                    : status === "active"
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      status === "completed" 
                        ? "bg-success text-success-foreground"
                        : status === "processing" || status === "active"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {status === "completed" ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : status === "processing" ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      
                      {status === "processing" && (
                        <div className="mt-2 space-y-1">
                          <Progress value={verificationProgress} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            Processing... {Math.round(verificationProgress)}%
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <Badge 
                        variant={
                          status === "completed" ? "default" :
                          status === "processing" ? "default" :
                          status === "active" ? "secondary" : "outline"
                        }
                        className="text-xs"
                      >
                        {status === "completed" ? "Verified" :
                         status === "processing" ? "Processing" :
                         status === "active" ? "Ready" : "Pending"}
                      </Badge>
                      
                      {status === "active" && !scanning && (
                        <Button 
                          size="sm"
                          onClick={() => startVerification(index)}
                          className="text-xs"
                        >
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Current Action Panel */}
      <Card className={`${scanning ? 'border-primary shadow-glow' : ''}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Current Action</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 0 && (
            <div className="text-center space-y-4">
              <QrCode className="w-16 h-16 text-muted-foreground mx-auto" />
              <div>
                <h3 className="font-semibold text-foreground">Ready to Scan</h3>
                <p className="text-sm text-muted-foreground">
                  Point your camera at the faculty's QR code to begin verification
                </p>
              </div>
              <Button onClick={() => startVerification(0)} className="w-full">
                <QrCode className="w-4 h-4 mr-2" />
                Start QR Scan
              </Button>
            </div>
          )}
          
          {currentStep === 1 && !scanning && (
            <div className="text-center space-y-4">
              <Camera className="w-16 h-16 text-primary mx-auto" />
              <div>
                <h3 className="font-semibold text-foreground">Face Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Look directly at the camera for AI facial recognition
                </p>
              </div>
              <Button onClick={() => startVerification(1)} className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Capture Face
              </Button>
            </div>
          )}
          
          {currentStep === 2 && !scanning && (
            <div className="text-center space-y-4">
              <Fingerprint className="w-16 h-16 text-success mx-auto" />
              <div>
                <h3 className="font-semibold text-foreground">Fingerprint Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Use your device's biometric authentication
                </p>
              </div>
              <Button onClick={() => startVerification(2)} className="w-full bg-success hover:bg-success/90">
                <Fingerprint className="w-4 h-4 mr-2" />
                Authenticate
              </Button>
            </div>
          )}
          
          {currentStep === 3 && !scanning && (
            <div className="text-center space-y-4">
              <MapPin className="w-16 h-16 text-secondary mx-auto" />
              <div>
                <h3 className="font-semibold text-foreground">NFC Presence Check</h3>
                <p className="text-sm text-muted-foreground">
                  Tap your phone on the classroom NFC beacon
                </p>
              </div>
              <Button onClick={() => startVerification(3)} className="w-full bg-secondary hover:bg-secondary/90">
                <Wifi className="w-4 h-4 mr-2" />
                Tap NFC Beacon
              </Button>
            </div>
          )}
          
          {currentStep >= 4 && (
            <div className="text-center space-y-4 verify-success">
              <CheckCircle className="w-16 h-16 text-success mx-auto" />
              <div>
                <h3 className="font-semibold text-success">Attendance Verified!</h3>
                <p className="text-sm text-muted-foreground">
                  All verification phases completed successfully
                </p>
              </div>
              <Badge variant="default" className="bg-success text-success-foreground">
                <CheckCircle className="w-4 h-4 mr-2" />
                Present - Verified
              </Badge>
            </div>
          )}
          
          {scanning && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h3 className="font-semibold text-foreground">Processing...</h3>
                <p className="text-sm text-muted-foreground">
                  {verificationSteps[currentStep]?.title} in progress
                </p>
              </div>
              <Progress value={verificationProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-muted bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="text-sm space-y-1">
              <p className="font-medium text-foreground">Security & Privacy</p>
              <p className="text-muted-foreground">
                • No raw biometric data is stored on servers<br />
                • Face embeddings are encrypted and anonymized<br />
                • Fingerprint data never leaves your device<br />
                • All communications use end-to-end encryption
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}