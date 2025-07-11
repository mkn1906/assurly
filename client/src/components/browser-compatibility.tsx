import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Smartphone, Monitor, Tablet } from "lucide-react";

// Create Alert component if it doesn't exist
const Alert = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`border rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

interface BrowserInfo {
  name: string;
  version: string;
  engine: string;
  mobile: boolean;
  os: string;
}

interface CompatibilityTest {
  feature: string;
  supported: boolean;
  required: boolean;
  description: string;
}

export function BrowserCompatibility() {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [compatibilityTests, setCompatibilityTests] = useState<CompatibilityTest[]>([]);
  const [overallCompatibility, setOverallCompatibility] = useState<'excellent' | 'good' | 'warning' | 'poor'>('good');

  useEffect(() => {
    // Detect browser information
    const detectBrowser = (): BrowserInfo => {
      const ua = navigator.userAgent;
      const mobile = /Mobi|Android/i.test(ua);
      
      let name = 'Unknown';
      let version = 'Unknown';
      let engine = 'Unknown';
      let os = 'Unknown';

      // Detect OS
      if (/Windows/i.test(ua)) os = 'Windows';
      else if (/Mac/i.test(ua)) os = 'macOS';
      else if (/Linux/i.test(ua)) os = 'Linux';
      else if (/Android/i.test(ua)) os = 'Android';
      else if (/iPhone|iPad/i.test(ua)) os = 'iOS';

      // Detect browser
      if (/Chrome/i.test(ua) && !/Edge/i.test(ua)) {
        name = 'Chrome';
        const match = ua.match(/Chrome\/(\d+)/);
        version = match ? match[1] : 'Unknown';
        engine = 'Blink';
      } else if (/Firefox/i.test(ua)) {
        name = 'Firefox';
        const match = ua.match(/Firefox\/(\d+)/);
        version = match ? match[1] : 'Unknown';
        engine = 'Gecko';
      } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
        name = 'Safari';
        const match = ua.match(/Version\/(\d+)/);
        version = match ? match[1] : 'Unknown';
        engine = 'WebKit';
      } else if (/Edge/i.test(ua)) {
        name = 'Edge';
        const match = ua.match(/Edge\/(\d+)/);
        version = match ? match[1] : 'Unknown';
        engine = 'Blink';
      }

      return { name, version, engine, mobile, os };
    };

    // Run compatibility tests
    const runCompatibilityTests = (): CompatibilityTest[] => {
      const tests: CompatibilityTest[] = [
        {
          feature: 'ES6+ Support',
          supported: (() => {
            try {
              eval('const test = () => {};');
              return true;
            } catch {
              return false;
            }
          })(),
          required: true,
          description: 'Modern JavaScript features required for payment processing'
        },
        {
          feature: 'Fetch API',
          supported: typeof fetch !== 'undefined',
          required: true,
          description: 'Required for secure payment communication'
        },
        {
          feature: 'WebCrypto API',
          supported: typeof crypto !== 'undefined' && typeof crypto.subtle !== 'undefined',
          required: true,
          description: 'Essential for secure payment encryption'
        },
        {
          feature: 'Local Storage',
          supported: (() => {
            try {
              const test = 'test';
              localStorage.setItem(test, test);
              localStorage.removeItem(test);
              return true;
            } catch {
              return false;
            }
          })(),
          required: false,
          description: 'Used for saving payment preferences'
        },
        {
          feature: 'CSS Grid',
          supported: (() => {
            const div = document.createElement('div');
            return 'grid' in div.style;
          })(),
          required: false,
          description: 'Modern layout for responsive design'
        },
        {
          feature: 'MobilePay Support',
          supported: (() => {
            // Check if we're on a supported platform for MobilePay
            const ua = navigator.userAgent;
            const mobile = /Mobi|Android/i.test(ua);
            const desktop = !mobile;
            const supportedOS = /Android|iPhone|iPad|Windows|Mac/i.test(ua);
            
            return supportedOS && (mobile || desktop);
          })(),
          required: false,
          description: 'Platform compatibility for MobilePay payments'
        },
        {
          feature: 'Stripe Elements',
          supported: (() => {
            // Basic check for features needed by Stripe Elements
            return typeof Promise !== 'undefined' && 
                   typeof fetch !== 'undefined' &&
                   'addEventListener' in document;
          })(),
          required: true,
          description: 'Required for secure payment form functionality'
        },
        {
          feature: 'Mobile Optimization',
          supported: (() => {
            // Check for mobile-specific features
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
          })(),
          required: false,
          description: 'Enhanced mobile payment experience'
        }
      ];

      return tests;
    };

    const browser = detectBrowser();
    const tests = runCompatibilityTests();
    
    setBrowserInfo(browser);
    setCompatibilityTests(tests);

    // Calculate overall compatibility
    const requiredTests = tests.filter(t => t.required);
    const requiredPassed = requiredTests.filter(t => t.supported).length;
    const totalTests = tests.filter(t => t.supported).length;
    
    if (requiredPassed === requiredTests.length && totalTests >= tests.length * 0.8) {
      setOverallCompatibility('excellent');
    } else if (requiredPassed === requiredTests.length) {
      setOverallCompatibility('good');
    } else if (requiredPassed >= requiredTests.length * 0.8) {
      setOverallCompatibility('warning');
    } else {
      setOverallCompatibility('poor');
    }
  }, []);

  if (!browserInfo) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin w-6 h-6 border-2 border-trust-blue border-t-transparent rounded-full"></div>
            <span className="ml-2">Kontrollerer browserkompatibilitet...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCompatibilityIcon = (compatibility: string) => {
    switch (compatibility) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'poor':
        return <XCircle className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getDeviceIcon = () => {
    if (browserInfo.mobile) {
      return <Smartphone className="h-5 w-5" />;
    }
    return <Monitor className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Browser Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {getDeviceIcon()}
            <span className="ml-2">Din Browser</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-600">Browser</p>
              <p className="text-dark-text">{browserInfo.name} {browserInfo.version}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Platform</p>
              <p className="text-dark-text">{browserInfo.os}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Engine</p>
              <p className="text-dark-text">{browserInfo.engine}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Type</p>
              <p className="text-dark-text">{browserInfo.mobile ? 'Mobil' : 'Desktop'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Compatibility */}
      <Alert className={getCompatibilityColor(overallCompatibility)}>
        <div className="flex items-start">
          {getCompatibilityIcon(overallCompatibility)}
          <div className="ml-3">
            <AlertDescription>
              <strong>
                {overallCompatibility === 'excellent' && 'Fremragende kompatibilitet!'}
                {overallCompatibility === 'good' && 'God kompatibilitet'}
                {overallCompatibility === 'warning' && 'Begrænset kompatibilitet'}
                {overallCompatibility === 'poor' && 'Dårlig kompatibilitet'}
              </strong>
              <div className="mt-1 text-sm">
                {overallCompatibility === 'excellent' && 'Din browser understøtter fuldt ud MobilePay og alle betalingsfunktioner.'}
                {overallCompatibility === 'good' && 'Din browser understøtter de fleste funktioner. Betalinger vil fungere korrekt.'}
                {overallCompatibility === 'warning' && 'Din browser mangler nogle funktioner. Betalinger kan fungere, men oplevelsen kan være begrænset.'}
                {overallCompatibility === 'poor' && 'Din browser understøtter ikke alle nødvendige funktioner. Betalinger fungerer muligvis ikke korrekt.'}
              </div>
            </AlertDescription>
          </div>
        </div>
      </Alert>

      {/* Feature Compatibility */}
      <Card>
        <CardHeader>
          <CardTitle>Funktionskompatibilitet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {compatibilityTests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center">
                  {test.supported ? (
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600 mr-3" />
                  )}
                  <div>
                    <p className="font-medium text-dark-text">
                      {test.feature}
                      {test.required && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Påkrævet
                        </Badge>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">{test.description}</p>
                  </div>
                </div>
                <Badge 
                  variant={test.supported ? "default" : "destructive"}
                  className="text-xs"
                >
                  {test.supported ? 'Understøttet' : 'Ikke understøttet'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* MobilePay Specific Information */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Smartphone className="h-5 w-5 mr-2" />
            MobilePay Kompatibilitet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
              <span>Understøtter alle moderne browsere (Chrome, Firefox, Safari, Edge)</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
              <span>Optimeret til både mobil og desktop betalinger</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
              <span>Automatisk app-redirect på mobile enheder</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
              <span>Sikker WebView integration for 3D Secure</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}