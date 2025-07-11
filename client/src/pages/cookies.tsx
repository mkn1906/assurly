import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Shield, Settings, BarChart3 } from "lucide-react";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Cookie className="h-16 w-16 text-trust-blue mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-dark-text mb-4">Cookie Politik</h1>
          <p className="text-lg text-professional-gray">
            Hvordan vi bruger cookies på Assurly.io
          </p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Hvad Er Cookies?</h2>
              <p className="text-professional-gray mb-4">
                Cookies er små tekstfiler, der gemmes på din enhed, når du besøger vores hjemmeside. 
                De hjælper os med at gøre din oplevelse bedre og sikre, at hjemmesiden fungerer korrekt.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Bemærk:</strong> Vi bruger et minimum af cookies og gemmer ingen personlige data i cookies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Hvilke Cookies Bruger Vi?</h2>
              
              <div className="space-y-6">
                <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                  <div className="flex items-start mb-3">
                    <Shield className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-800 text-lg">Nødvendige Cookies</h3>
                      <p className="text-green-700 text-sm">Kræves for at hjemmesiden kan fungere</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-dark-text">session_id</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Nødvendig</span>
                      </div>
                      <p className="text-sm text-professional-gray">Sikrer session-kontinuitet under din besøg</p>
                      <p className="text-xs text-professional-gray mt-1">Udløber: Ved session afslutning</p>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-dark-text">csrf_token</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Nødvendig</span>
                      </div>
                      <p className="text-sm text-professional-gray">Beskytter mod sikkerhedstrusler</p>
                      <p className="text-xs text-professional-gray mt-1">Udløber: Ved session afslutning</p>
                    </div>
                  </div>
                </div>

                <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                  <div className="flex items-start mb-3">
                    <Settings className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-800 text-lg">Funktionelle Cookies</h3>
                      <p className="text-blue-700 text-sm">Forbedrer din brugeroplevelse</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-dark-text">cookie_consent</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Funktionel</span>
                      </div>
                      <p className="text-sm text-professional-gray">Husker dine cookie-præferencer</p>
                      <p className="text-xs text-professional-gray mt-1">Udløber: 1 år</p>
                    </div>
                    
                    <div className="bg-white rounded p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-dark-text">language_pref</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Funktionel</span>
                      </div>
                      <p className="text-sm text-professional-gray">Gemmer dit foretrukne sprog</p>
                      <p className="text-xs text-professional-gray mt-1">Udløber: 1 år</p>
                    </div>
                  </div>
                </div>

                <div className="border border-yellow-200 rounded-lg p-6 bg-yellow-50">
                  <div className="flex items-start mb-3">
                    <BarChart3 className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 text-lg">Analytiske Cookies</h3>
                      <p className="text-yellow-700 text-sm">Hjælper os med at forbedre hjemmesiden</p>
                    </div>
                  </div>
                  <div className="bg-white rounded p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-dark-text">_analytics</span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Analytisk</span>
                    </div>
                    <p className="text-sm text-professional-gray">Anonyme besøgsstatistikker</p>
                    <p className="text-xs text-professional-gray mt-1">Udløber: 2 år</p>
                  </div>
                  <p className="text-xs text-yellow-700 mt-3">
                    <strong>Bemærk:</strong> Analytiske cookies er deaktiveret som standard og kræver dit samtykke.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Tredjeparters Cookies</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-text mb-2">Stripe (Betalinger)</h3>
                  <p className="text-professional-gray text-sm mb-2">
                    Stripe kan sætte cookies for at håndtere sikre betalinger. Disse cookies er nødvendige 
                    for betalingsfunktionaliteten.
                  </p>
                  <p className="text-xs text-professional-gray">
                    Læs mere: <a href="https://stripe.com/cookies-policy/legal" className="text-trust-blue hover:underline">
                      Stripe Cookie Politik
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Administrer Dine Cookie-præferencer</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-dark-text mb-3">Du har følgende muligheder:</h3>
                <ul className="space-y-2 text-professional-gray">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-trust-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Accepter alle cookies for den bedste oplevelse</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-trust-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Kun nødvendige cookies (begrænset funktionalitet)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-trust-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Tilpas dine præferencer kategori for kategori</span>
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-blue-800 text-sm">
                    <strong>Ændre præferencer:</strong> Du kan til enhver tid ændre dine cookie-præferencer 
                    ved at klikke på "Cookie-indstillinger" i bunden af hjemmesiden.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Browser-indstillinger</h2>
              <p className="text-professional-gray mb-4">
                Du kan også administrere cookies direkte i din browser:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-semibold text-dark-text mb-2">Chrome</h4>
                  <p className="text-professional-gray">Indstillinger → Avanceret → Privatliv og sikkerhed → Cookies</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-semibold text-dark-text mb-2">Firefox</h4>
                  <p className="text-professional-gray">Indstillinger → Privatliv og sikkerhed → Cookies og webstedsdata</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-semibold text-dark-text mb-2">Safari</h4>
                  <p className="text-professional-gray">Præferencer → Privatliv → Administrer webstedsdata</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-semibold text-dark-text mb-2">Edge</h4>
                  <p className="text-professional-gray">Indstillinger → Cookies og webstedsrettigheder</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Kontakt</h2>
              <p className="text-professional-gray">
                Har du spørgsmål til vores brug af cookies, kan du kontakte os på info@assurly.io
              </p>
            </section>

            <section className="text-center bg-blue-50 rounded-lg p-6">
              <p className="text-blue-800 text-sm">
                <strong>Sidst opdateret:</strong> 29. juni 2025
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}