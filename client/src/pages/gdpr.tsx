import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Trash2, Eye } from "lucide-react";

export default function GDPR() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-trust-blue mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-dark-text mb-4">GDPR & Databehandling</h1>
          <p className="text-lg text-professional-gray">
            Maksimal privatliv og GDPR-overholdelse
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <Trash2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-dark-text mb-2">Ingen Datalagring</h3>
              <p className="text-sm text-professional-gray">
                Vi gemmer INGEN dokumenter eller persondata efter analyse
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-dark-text mb-2">Øjeblikkelig Sletning</h3>
              <p className="text-sm text-professional-gray">
                Alle uploads slettes automatisk efter analyse
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Dataansvarlig</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-dark-text">Sibl Solutions ApS</p>
                <p className="text-professional-gray">CVR: 32833780</p>
                <p className="text-professional-gray">Blomsterager 201, 2980 Kokkedal</p>
                <p className="text-professional-gray">E-mail: info@assurly.io</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Hvilke Data Behandler Vi?</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-dark-text">Dokumenter (Midlertidigt)</h3>
                  <p className="text-professional-gray">
                    Forsikringsdokumenter du uploader behandles kun i hukommelsen og slettes øjeblikkeligt efter analyse. 
                    Ingen permanent lagring.
                  </p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-semibold text-dark-text">Tekniske Data</h3>
                  <p className="text-professional-gray">
                    IP-adresse, browser-type og besøgstidspunkt for sikkerhed og fejlretning. 
                    Gemmes maksimalt 30 dage.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-dark-text">E-mail Adresse</h3>
                  <p className="text-professional-gray">
                    Kun til levering af analyseresultater. Slettes automatisk efter 24 timer.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Retsgrundlag for Behandling</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-trust-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>Samtykke (Art. 6.1.a):</strong> Du giver eksplicit samtykke ved upload af dokumenter
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-trust-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>Kontraktopfyldelse (Art. 6.1.b):</strong> Nødvendig for levering af analyse service
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-trust-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>Berettiget interesse (Art. 6.1.f):</strong> Teknisk drift og sikkerhed
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Dine Rettigheder Under GDPR</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-dark-text mb-2">Ret til Indsigt</h3>
                  <p className="text-sm text-professional-gray">
                    Se hvilke data vi behandler om dig (ingen permanente data gemmes)
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <Trash2 className="h-6 w-6 text-green-600 mb-2" />
                  <h3 className="font-semibold text-dark-text mb-2">Ret til Sletning</h3>
                  <p className="text-sm text-professional-gray">
                    Anmod om sletning (data slettes automatisk efter analyse)
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <Lock className="h-6 w-6 text-yellow-600 mb-2" />
                  <h3 className="font-semibold text-dark-text mb-2">Ret til Begrænsning</h3>
                  <p className="text-sm text-professional-gray">
                    Begræns behandling af dine data
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600 mb-2" />
                  <h3 className="font-semibold text-dark-text mb-2">Ret til Indsigelse</h3>
                  <p className="text-sm text-professional-gray">
                    Gør indsigelse mod behandling
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Datadeling</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Vi deler ALDRIG dine data</h3>
                <p className="text-red-700 text-sm">
                  Dine dokumenter og analyseresultater deles ikke med tredjeparter, partnere eller andre virksomheder. 
                  Al behandling sker lokalt og sikkert.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Tredjepartstjenester</h2>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-text">OpenAI (Analysemotor)</h3>
                  <p className="text-professional-gray text-sm">
                    Dokumenttekst sendes til OpenAI for analyse. OpenAI gemmer ikke data fra vores API-kald.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-text">Stripe (Betalinger)</h3>
                  <p className="text-professional-gray text-sm">
                    Betalingsoplysninger behandles sikkert af Stripe. Vi ser ikke eller gemmer kortoplysninger.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Sikkerhedsforanstaltninger</h2>
              <ul className="space-y-2 text-professional-gray">
                <li>✓ SSL/TLS kryptering af al datatransmission</li>
                <li>✓ Øjeblikkelig sletning efter behandling</li>
                <li>✓ Ingen permanent lagring af dokumenter</li>
                <li>✓ Begrænset adgang til systemer</li>
                <li>✓ Regelmæssige sikkerhedsopdateringer</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Kontakt Omkring GDPR</h2>
              <p className="text-professional-gray mb-4">
                Har du spørgsmål til vores databehandling eller vil udøve dine rettigheder, kan du kontakte os:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-dark-text">GDPR-ansvarlig</p>
                <p className="text-professional-gray">E-mail: info@assurly.io</p>
                <p className="text-professional-gray">Emne: GDPR-forespørgsel</p>
              </div>
              <p className="text-professional-gray text-sm mt-4">
                Du kan også klage til Datatilsynet, hvis du mener, vi ikke overholder GDPR-reglerne.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}