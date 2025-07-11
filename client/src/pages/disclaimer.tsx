import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Info, Shield } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AlertTriangle className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-dark-text mb-4">Ansvarsfraskrivelse</h1>
          <p className="text-lg text-professional-gray">
            Vigtige juridiske oplysninger om brugen af Assurly.io
          </p>
        </div>

        <div className="mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-red-800 mb-2">Vigtig Meddelelse</h2>
                  <p className="text-red-700">
                    Assurly leverer kun informationsanalyse og er IKKE forsikringsrådgivning. 
                    Konsulter altid autoriserede forsikringsprofessionelle før du træffer beslutninger 
                    om din forsikringsdækning.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Tjenestens Karakter</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">Kun Informationsformål</h3>
                    <p className="text-blue-700 text-sm">
                      Assurly er et analyseværktøj, der leverer information om forsikringsdokumenter. 
                      Vi giver ikke rådgivning, anbefalinger eller professionelle forsikringsydelser.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 text-blue-700 text-sm">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Vi analyserer kun den information, der findes i uploadede dokumenter</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Vi tager ikke hensyn til din personlige situation eller behov</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Vi anbefaler ikke specifikke forsikringsselskaber eller produkter</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Ansvarsbegrænsning</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Ingen Garanti for Nøjagtighed</h3>
                  <p className="text-yellow-700 text-sm">
                    Selvom vi stræber efter nøjagtighed, kan vi ikke garantere, at vores analyser er 
                    100% præcise eller omfattende. AI-teknologi kan have begrænsninger og fejl.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Ingen Ansvar for Skader</h3>
                  <p className="text-red-700 text-sm">
                    Vi påtager os ikke ansvar for økonomiske tab, skader eller andre konsekvenser, 
                    der opstår som følge af brug af vores analyser eller beslutninger truffet på baggrund heraf.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Begrænset Ansvar</h3>
                  <p className="text-purple-700 text-sm">
                    Vores samlede ansvar er begrænset til det beløb, du har betalt for den specifikke analyse. 
                    Vi hæfter ikke for indirekte eller følgeskader.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Hvad Du Skal Gøre</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-4">Anbefalede Handlinger</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-green-800 mb-2">Før Beslutninger</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Konsulter en autoriseret forsikringsmægler</li>
                      <li>• Indhent professionel rådgivning</li>
                      <li>• Læs police betingelser grundigt</li>
                      <li>• Sammenlign tilbud fra flere udbydere</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-800 mb-2">Ved Tvivl</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Kontakt dit forsikringsselskab direkte</li>
                      <li>• Søg juridisk rådgivning ved behov</li>
                      <li>• Verificer analyseresultater selvstændigt</li>
                      <li>• Tag ikke vigtige beslutninger alene på vores grundlag</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">AI-Teknologi Begrænsninger</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-text mb-2">Tekniske Begrænsninger</h3>
                  <ul className="text-professional-gray text-sm space-y-1">
                    <li>• AI kan misfortolke komplekse forsikringsbetingelser</li>
                    <li>• Tekstgenkendelse kan have fejl i håndskrevne dokumenter</li>
                    <li>• Analysen baseres kun på tilgængelig dokumentation</li>
                    <li>• Teknologien udvikles løbende og kan have uforudsete fejl</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-dark-text mb-2">Menneskeligt Skøn Nødvendigt</h3>
                  <p className="text-professional-gray text-sm">
                    Vores AI-analyser kan ikke erstatte menneskeligt skøn, erfaring og professionel 
                    ekspertise inden for forsikring. Brug altid professionel rådgivning til vigtige beslutninger.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Forsikringslovgivning</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">Lovmæssige Krav</h3>
                    <p className="text-blue-700 text-sm mb-3">
                      I henhold til dansk forsikringslovgivning må kun autoriserede forsikringsmæglere 
                      og -selskaber yde forsikringsrådgivning.
                    </p>
                    <p className="text-blue-700 text-sm">
                      <strong>Assurly opererer under "information kun" exemption</strong> og giver 
                      derfor ikke rådgivning eller anbefalinger om forsikringsprodukter.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Brug på Eget Ansvar</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-800 mb-3">Brugerens Ansvar</h3>
                <p className="text-yellow-700 text-sm mb-4">
                  Ved at bruge Assurly accepterer du, at:
                </p>
                <ul className="text-yellow-700 text-sm space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Du bruger tjenesten på eget ansvar</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Du forstår begrænsningerne ved AI-analyse</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Du søger professionel rådgivning ved behov</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Du verificerer analyseresultater selvstændigt</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Gældende Lov</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-professional-gray text-sm mb-4">
                  Denne ansvarsfraskrivelse er underlagt dansk ret. Eventuelle tvister afgøres 
                  ved danske domstole.
                </p>
                <p className="text-professional-gray text-sm">
                  Hvis nogen dele af denne ansvarsfraskrivelse skulle være ugyldige, forbliver 
                  resten af dokumentet gældende.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">Kontakt</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-professional-gray">
                  Har du spørgsmål til denne ansvarsfraskrivelse, kan du kontakte os på info@assurly.io
                </p>
              </div>
            </section>

            <section className="text-center bg-red-50 rounded-lg p-6">
              <p className="text-red-800 text-sm font-medium">
                <strong>Husk:</strong> Denne ansvarsfraskrivelse skal læses sammen med vores 
                Handelsbetingelser og Privatlivspolitik.
              </p>
              <p className="text-red-700 text-sm mt-2">
                Sidst opdateret: 29. juni 2025
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}