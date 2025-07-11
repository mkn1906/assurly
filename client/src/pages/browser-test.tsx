import { Navigation } from "@/components/navigation";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { BrowserCompatibility } from "@/components/browser-compatibility";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Monitor, Smartphone, Tablet, CheckCircle } from "lucide-react";

export default function BrowserTest() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <DisclaimerBanner />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark-text mb-4">
            Browser Kompatibilitetstest
          </h1>
          <p className="text-lg text-professional-gray">
            Verificer at din browser understøtter MobilePay og alle betalingsfunktioner
          </p>
        </div>

        {/* Quick compatibility overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="h-5 w-5 mr-2 text-trust-blue" />
              Anbefalet Browser Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Monitor className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <h3 className="font-semibold mb-2">Desktop</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    Chrome 88+
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    Firefox 85+
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    Safari 14+
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    Edge 88+
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Smartphone className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <h3 className="font-semibold mb-2">Mobil</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    iOS Safari 14+
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    Chrome Mobile 88+
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    Samsung Internet 14+
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    Android WebView 88+
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Tablet className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <h3 className="font-semibold mb-2">Tablet</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    iPad Safari 14+
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    Android Chrome 88+
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    Samsung Tablet 14+
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    Surface Pro Edge 88+
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MobilePay specific information */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Smartphone className="h-5 w-5 mr-2" />
              MobilePay Browser Krav
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-blue-700 space-y-2">
              <p><strong>Mobile Enheder:</strong> MobilePay app skal være installeret for optimal oplevelse</p>
              <p><strong>Desktop:</strong> Browser redirect til MobilePay.dk for sikker betalingsforløb</p>
              <p><strong>Sikkerhed:</strong> SSL/TLS support påkrævet for alle betalinger</p>
              <p><strong>JavaScript:</strong> Modern ES6+ support nødvendig for payment elements</p>
              <p><strong>3D Secure:</strong> WebView support til bankautorisation (1-7% af betalinger)</p>
            </div>
          </CardContent>
        </Card>

        {/* Browser compatibility component */}
        <BrowserCompatibility />

        {/* Action buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button 
            onClick={() => setLocation('/upload')}
            className="bg-trust-blue text-white hover:bg-blue-700"
          >
            Test MobilePay Betaling
          </Button>
          <Button 
            variant="outline"
            onClick={() => setLocation('/pricing')}
          >
            Se Priser
          </Button>
        </div>

        {/* Additional technical information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tekniske Detaljer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2 text-dark-text">Påkrævet Features:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• ES6+ JavaScript support</li>
                  <li>• Fetch API for HTTPS kommunikation</li>
                  <li>• WebCrypto API for kryptering</li>
                  <li>• CSS Grid/Flexbox for layout</li>
                  <li>• Touch events (mobil)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-dark-text">Anbefalede Features:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• LocalStorage for præferencer</li>
                  <li>• ServiceWorker for offline support</li>
                  <li>• Push notifications</li>
                  <li>• WebAuthn for biometrik</li>
                  <li>• PWA installation support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}