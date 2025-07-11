import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Trash2 } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-trust-blue mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-dark-text mb-4">Privatlivspolitik</h1>
          <p className="text-lg text-professional-gray">
            Hvordan vi beskytter dit privatliv på Assurly.io
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <Trash2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-dark-text mb-2">Ingen Lagring</h3>
              <p className="text-sm text-professional-gray">
                Dokumenter slettes øjeblikkeligt efter analyse
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-dark-text mb-2">Krypteret</h3>
              <p className="text-sm text-professional-gray">
                Al data transmission er SSL-krypteret
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <Eye className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-dark-text mb-2">Transparent</h3>
              <p className="text-sm text-professional-gray">
                Fuld gennemsigtighed om databehandling
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Grundprincipper</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">Vores Løfte til Dig</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>✓ Vi gemmer ALDRIG dine forsikringsdokumenter</li>
                  <li>✓ Vi sælger ALDRIG dine data til tredjeparter</li>
                  <li>✓ Vi bruger kun data til det angivne formål</li>
                  <li>✓ Du har fuld kontrol over dine data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Hvilke Oplysninger Indsamler Vi?</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-red-800">Forsikringsdokumenter</h3>
                  <p className="text-red-700 text-sm mt-2">
                    <strong>Behandling:</strong> Dokumenter uploades og behandles i hukommelsen for at udtrække tekst og udføre analyse.
                  </p>
                  <p className="text-red-700 text-sm">
                    <strong>Lagring:</strong> INGEN. Dokumenter slettes øjeblikkeligt efter behandling.
                  </p>
                  <p className="text-red-700 text-sm">
                    <strong>Formål:</strong> Udelukkende til at levere forsikringsanalyse.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-yellow-800">E-mail Adresse</h3>
                  <p className="text-yellow-700 text-sm mt-2">
                    <strong>Behandling:</strong> Kun til at sende analyseresultater.
                  </p>
                  <p className="text-yellow-700 text-sm">
                    <strong>Lagring:</strong> Maksimalt 24 timer, derefter automatisk sletning.
                  </p>
                  <p className="text-yellow-700 text-sm">
                    <strong>Formål:</strong> E-mail levering af analyseresultater.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-green-800">Tekniske Data</h3>
                  <p className="text-green-700 text-sm mt-2">
                    <strong>Behandling:</strong> IP-adresse, browser-type, besøgstidspunkt.
                  </p>
                  <p className="text-green-700 text-sm">
                    <strong>Lagring:</strong> Maksimalt 30 dage for sikkerhed og fejlretning.
                  </p>
                  <p className="text-green-700 text-sm">
                    <strong>Formål:</strong> Sikkerhed, fejlretning og systemoptimering.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Hvordan Bruger Vi Dine Oplysninger?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Primære Formål</h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Udføre forsikringsanalyse</li>
                    <li>• Levere analyseresultater via e-mail</li>
                    <li>• Behandle betalinger (via Stripe)</li>
                    <li>• Kontakte dig ved tekniske problemer</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Hvad Vi IKKE Gør</h3>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Sælger data til tredjeparter</li>
                    <li>• Bruger data til markedsføring</li>
                    <li>• Gemmer dokumenter permanent</li>
                    <li>• Deler data med forsikringsselskaber</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Datadeling</h2>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Vi Deler IKKE Dine Data</h3>
                  <p className="text-red-700 text-sm">
                    Vi sælger, udlejer eller deler ikke dine personlige oplysninger eller forsikringsdokumenter 
                    med tredjeparter til markedsføringsformål.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-dark-text">Begrænsede Tredjepartstjenester:</h4>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-dark-text">OpenAI (AI-analyse)</h5>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Nødvendig</span>
                    </div>
                    <p className="text-professional-gray text-sm">
                      Dokumenttekst sendes til OpenAI for analyse. OpenAI gemmer ikke data fra vores API-kald 
                      og bruger dem ikke til træning.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-dark-text">Stripe (Betalinger)</h5>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Sikker</span>
                    </div>
                    <p className="text-professional-gray text-sm">
                      Betalingsoplysninger behandles direkte af Stripe. Vi ser ikke eller gemmer kortoplysninger.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Dine Rettigheder</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Ret til Indsigt</h3>
                  <p className="text-blue-700 text-sm">
                    Anmod om kopi af de personoplysninger vi behandler om dig.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Ret til Sletning</h3>
                  <p className="text-green-700 text-sm">
                    Anmod om sletning af dine personoplysninger (data slettes automatisk).
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Ret til Berigtigelse</h3>
                  <p className="text-yellow-700 text-sm">
                    Anmod om rettelse af ukorrekte eller ufuldstændige oplysninger.
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Ret til Indsigelse</h3>
                  <p className="text-purple-700 text-sm">
                    Gør indsigelse mod behandling af dine personoplysninger.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Sikkerhedsforanstaltninger</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-dark-text mb-2">Tekniske Sikkerhedsforanstaltninger</h4>
                    <ul className="text-professional-gray text-sm space-y-1">
                      <li>• SSL/TLS kryptering (256-bit)</li>
                      <li>• Sikre server-infrastrukturer</li>
                      <li>• Regelmæssige sikkerhedsopdateringer</li>
                      <li>• Adgangskontrol og overvågning</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-dark-text mb-2">Organisatoriske Foranstaltninger</h4>
                    <ul className="text-professional-gray text-sm space-y-1">
                      <li>• Begrænset adgang til data</li>
                      <li>• Medarbejdertræning i datasikkerhed</li>
                      <li>• Øjeblikkelig sletning af dokumenter</li>
                      <li>• Regelmæssige sikkerhedsgennemgange</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Internationale Overførsler</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">OpenAI (USA)</h3>
                <p className="text-yellow-700 text-sm mb-2">
                  Dokumenttekst behandles af OpenAI i USA. Dette sker under følgende beskyttelse:
                </p>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Standard kontraktbestemmelser (SCCs)</li>
                  <li>• Kun midlertidig behandling (ingen lagring)</li>
                  <li>• OpenAI's forpligtelse til ikke at bruge data til træning</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Kontakt Vedrørende Privatliv</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-dark-text mb-2">Dataansvarlig</h4>
                    <p className="text-professional-gray text-sm">Sibl Solutions ApS</p>
                    <p className="text-professional-gray text-sm">CVR: 32833780</p>
                    <p className="text-professional-gray text-sm">Blomsterager 201, 2980 Kokkedal</p>
                    <p className="text-professional-gray text-sm">E-mail: info@assurly.io</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-dark-text mb-2">Klager</h4>
                    <p className="text-professional-gray text-sm">
                      Du kan klage til Datatilsynet, hvis du mener, vi ikke overholder 
                      gældende databeskyttelseslovgivning.
                    </p>
                    <p className="text-professional-gray text-sm mt-2">
                      <strong>Datatilsynet:</strong> dt@datatilsynet.dk
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="text-center bg-blue-50 rounded-lg p-6">
              <p className="text-blue-800 text-sm">
                <strong>Sidst opdateret:</strong> 29. juni 2025
              </p>
              <p className="text-blue-700 text-sm mt-2">
                Vi forbeholder os ret til at opdatere denne politik. Væsentlige ændringer meddeles med 30 dages varsel.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}