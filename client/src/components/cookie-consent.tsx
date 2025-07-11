import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Cookie, Settings, X } from "lucide-react";
import { Link } from "wouter";

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Show banner after a brief delay to avoid disrupting page load
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
    };
    setPreferences(allPreferences);
    saveCookiePreferences(allPreferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      functional: false,
      analytics: false,
    };
    setPreferences(necessaryOnly);
    saveCookiePreferences(necessaryOnly);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSaveCustom = () => {
    saveCookiePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveCookiePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      preferences: prefs,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }));

    // Set the actual cookie for backend recognition
    document.cookie = `cookie_consent=${JSON.stringify(prefs)}; max-age=31536000; path=/; secure; samesite=strict`;
  };

  const handlePreferenceChange = (type: keyof CookiePreferences, checked: boolean) => {
    if (type === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({ ...prev, [type]: checked }));
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          {!showSettings ? (
            // Basic consent banner
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Cookie className="h-8 w-8 text-trust-blue flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-dark-text mb-2">
                    Vi Bruger Cookies
                  </h3>
                  <p className="text-sm text-professional-gray mb-4">
                    Vi bruger cookies til at sikre, at vores hjemmeside fungerer korrekt og for at forbedre din oplevelse. 
                    Du kan vælge hvilke cookies du accepterer.
                  </p>
                  <p className="text-xs text-professional-gray">
                    Ved at fortsætte accepterer du vores brug af nødvendige cookies. 
                    Læs mere i vores{" "}
                    <Link href="/cookies" className="text-trust-blue hover:underline">
                      Cookie Politik
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAcceptAll}
                  className="bg-trust-blue text-white hover:bg-blue-700 flex-1"
                >
                  Accepter Alle Cookies
                </Button>
                
                <Button
                  onClick={handleAcceptNecessary}
                  variant="outline"
                  className="flex-1"
                >
                  Kun Nødvendige
                </Button>
                
                <Button
                  onClick={() => setShowSettings(true)}
                  variant="ghost"
                  size="sm"
                  className="sm:w-auto"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Indstillinger
                </Button>
              </div>
            </div>
          ) : (
            // Detailed settings
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Cookie className="h-6 w-6 text-trust-blue" />
                  <h3 className="text-lg font-semibold text-dark-text">
                    Cookie Indstillinger
                  </h3>
                </div>
                <Button
                  onClick={() => setShowSettings(false)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-800">Nødvendige Cookies</h4>
                    <p className="text-sm text-green-700">
                      Sikrer grundlæggende funktionalitet og sikkerhed. Kan ikke deaktiveres.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.necessary}
                    disabled={true}
                    className="bg-green-600"
                  />
                </div>

                {/* Functional Cookies */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-800">Funktionelle Cookies</h4>
                    <p className="text-sm text-blue-700">
                      Husker dine præferencer og forbedrer din brugeroplevelse.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.functional}
                    onCheckedChange={(checked) => handlePreferenceChange('functional', checked)}
                  />
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex-1">
                    <h4 className="font-semibold text-yellow-800">Analytiske Cookies</h4>
                    <p className="text-sm text-yellow-700">
                      Hjælper os med at forstå hvordan hjemmesiden bruges (anonymt).
                    </p>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={(checked) => handlePreferenceChange('analytics', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAcceptAll}
                  className="bg-trust-blue text-white hover:bg-blue-700 flex-1"
                >
                  Accepter Alle
                </Button>
                
                <Button
                  onClick={handleSaveCustom}
                  variant="outline"
                  className="flex-1"
                >
                  Gem Indstillinger
                </Button>
              </div>

              <p className="text-xs text-professional-gray text-center">
                Du kan ændre disse indstillinger når som helst via vores{" "}
                <Link href="/cookies" className="text-trust-blue hover:underline">
                  Cookie Politik
                </Link>
                .
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Component to manage cookie settings from footer
export function CookieSettingsButton() {
  const [showSettings, setShowSettings] = useState(false);

  const openCookieSettings = () => {
    // Remove existing consent to show settings
    localStorage.removeItem('cookie_consent');
    // Reload page to trigger banner
    window.location.reload();
  };

  return (
    <button
      onClick={openCookieSettings}
      className="text-gray-300 hover:text-white text-sm transition-colors"
    >
      Cookie-indstillinger
    </button>
  );
}