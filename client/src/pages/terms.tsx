import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-trust-blue mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-dark-text mb-4">Handelsbetingelser</h1>
          <p className="text-lg text-professional-gray">
            Gældende fra 29. juni 2025
          </p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">1. Selskabsoplysninger</h2>
              <p className="text-professional-gray">
                Assurly drives af Sibl Solutions ApS, CVR: 32833780, med adresse på 
                Blomsterager 201, 2980 Kokkedal, Danmark. Kontakt: info@assurly.io
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">2. Serviceydelser</h2>
              <p className="text-professional-gray mb-4">
                Assurly leverer AI-drevne forsikringsanalyser til informationsformål. Vores service omfatter:
              </p>
              <ul className="list-disc list-inside text-professional-gray space-y-2">
                <li>Automatiseret analyse af forsikringsdokumenter</li>
                <li>Identifikation af potentielle dækningshuller</li>
                <li>Sammenligning med forsikringstilbud (ved betalt service)</li>
                <li>E-mail levering af analyseresultater</li>
              </ul>
              <p className="text-professional-gray mt-4">
                <strong>Vigtigt:</strong> Vi leverer kun information og analyse. Vi giver ikke forsikringsrådgivning, 
                anbefalinger eller formidler forsikringskøb.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">3. Priser og Betaling</h2>
              <ul className="list-disc list-inside text-professional-gray space-y-2">
                <li>Gratis analyse: Grundlæggende dækningsanalyse via e-mail</li>
                <li>Enkelt sammenligning: 129 DKK</li>
                <li>Flere sammenligninger: 249 DKK</li>
              </ul>
              <p className="text-professional-gray mt-4">
                Betalinger behandles sikkert via Stripe. Alle priser er i danske kroner inkl. moms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibent text-dark-text mb-4">4. Brug af Platformen</h2>
              <p className="text-professional-gray mb-4">Ved at bruge Assurly accepterer du:</p>
              <ul className="list-disc list-inside text-professional-gray space-y-2">
                <li>Kun at uploade dokumenter du har ret til at dele</li>
                <li>At give korrekte og sandfærdige oplysninger</li>
                <li>At følge gældende dansk og EU-lovgivning</li>
                <li>At analyseresultater kun er til informationsformål</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">5. Databehandling</h2>
              <p className="text-professional-gray">
                Vi gemmer INGEN dokumenter eller personlige data efter analyse. Alle uploads slettes 
                øjeblikkeligt efter behandling. Se vores GDPR-politik for detaljerede oplysninger.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">6. Ansvarsfraskrivelse</h2>
              <p className="text-professional-gray">
                Assurly leverer information "som den er" uden garantier. Vi påtager os ikke ansvar for 
                investeringsbeslutninger eller skader opstået som følge af brug af vores analyser. 
                Konsulter altid autoriserede forsikringsprofessionelle for rådgivning.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">7. Fortrudelelsesret</h2>
              <p className="text-professional-gray">
                I henhold til forbrugerlovgivningen har du 14 dages fortrydelsesret. Da vores service 
                leveres øjeblikkeligt via e-mail, bortfalder fortrydelsesretten efter levering.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">8. Ændringer</h2>
              <p className="text-professional-gray">
                Vi forbeholder os ret til at ændre disse vilkår med 30 dages varsel. Væsentlige ændringer 
                meddeles via e-mail til registrerede brugere.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">9. Tvister</h2>
              <p className="text-professional-gray">
                Eventuelle tvister afgøres efter dansk ret ved danske domstole. For forbrugerklager 
                kan du kontakte Forbrugerombudsmanden eller Center for Klageløsning.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dark-text mb-4">10. Kontakt</h2>
              <p className="text-professional-gray">
                Har du spørgsmål til disse vilkår, kan du kontakte os på info@assurly.io
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}