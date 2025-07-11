
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { PricingCards } from "@/components/pricing-cards";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { 
  Shield, 
  Check, 
  CreditCard,
  Globe,
  Lock,
  FileText,
  Clock,
  Users,
  Zap
} from "lucide-react";

export default function Pricing() {

  const features = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "GDPR Overholdelse",
      description: "Fuld overholdelse af europæiske databeskyttelsesregler"
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Sikre Servere",
      description: "Sikre servere og sikre forbindelser med krypteret dokumentbehandling"
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Professionel Analyse",
      description: "AI-drevet analyse trænet på tusindvis af forsikringspolicer"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Hurtig Behandling",
      description: "De fleste analyser gennemført inden for minutter"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Flersproget Support",
      description: "Support til nordiske lande og Tyskland"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Øjeblikkelige Rapporter",
      description: "Øjeblikkelige resultater med valgfri e-mail levering"
    },
  ];

  const comparisonFeatures = [
    { feature: "Forsikringsdækning analyse", free: true, single: true, multiple: true },
    { feature: "Over/under-forsikret detektion", free: true, single: true, multiple: true },
    { feature: "E-mail rapport levering", free: true, single: true, multiple: true },
    { feature: "Forskelssanalyse", free: false, single: true, multiple: true },
    { feature: "Konkurrentanalyse", free: false, single: "1 tilbud", multiple: "3 tilbud" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DisclaimerBanner />
      
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-6">
            Gennemsigtige <span className="text-trust-blue">Priser</span>
          </h1>
          <p className="text-xl text-professional-gray mb-8 max-w-3xl mx-auto">
            Professionelle forsikringsanalyse værktøjer med klare, forudgående priser. 
            Betal kun for det du har brug for, når du har brug for det.
          </p>


        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingCards />
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Funktionssammenligning</h2>
            <p className="text-lg text-professional-gray">
              Sammenlign funktioner på tværs af alle prisniveauer for at finde den rigtige plan til dine behov.
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-text">Funktioner</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-dark-text">Gratis</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-dark-text">Enkelt</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-dark-text bg-blue-50">Flere</th>

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-dark-text font-medium">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-sm">
                        {typeof row.free === 'boolean' ? (
                          row.free ? <Check className="h-4 w-4 text-success-green mx-auto" /> : <span className="text-gray-400">—</span>
                        ) : (
                          <span className="text-professional-gray">{row.free}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        {typeof row.single === 'boolean' ? (
                          row.single ? <Check className="h-4 w-4 text-success-green mx-auto" /> : <span className="text-gray-400">—</span>
                        ) : (
                          <span className="text-professional-gray">{row.single}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm bg-blue-50">
                        {typeof row.multiple === 'boolean' ? (
                          row.multiple ? <Check className="h-4 w-4 text-success-green mx-auto" /> : <span className="text-gray-400">—</span>
                        ) : (
                          <span className="text-professional-gray">{row.multiple}</span>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Hvad er Inkluderet</h2>
            <p className="text-lg text-professional-gray">
              Alle planer inkluderer vores kernefunktioner til professionel forsikringsanalyse.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-trust-blue text-white p-2 rounded-lg mr-4 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-text mb-2">{feature.title}</h3>
                      <p className="text-sm text-professional-gray">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark-text mb-8">Sikker Betalingsbehandling</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <CreditCard className="h-12 w-12 text-trust-blue mb-4" />
              <h3 className="font-semibold text-dark-text mb-2">Stripe Betalinger</h3>
              <p className="text-sm text-professional-gray">
                Sikker betalingsbehandling med branchens højeste sikkerhedsstandarder
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Lock className="h-12 w-12 text-trust-blue mb-4" />
              <h3 className="font-semibold text-dark-text mb-2">SSL Krypteret</h3>
              <p className="text-sm text-professional-gray">
                Alle betalingsdata er krypterede og gemmes aldrig på vores servere
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-trust-blue mb-4" />
              <h3 className="font-semibold text-dark-text mb-2">PCI Compliant</h3>
              <p className="text-sm text-professional-gray">
                Opfylder alle betalingskortindustriens sikkerhedsstandarder
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-dark-text mb-4">Accepterede Betalingsmetoder</h3>
            <div className="flex justify-center items-center space-x-8 flex-wrap">
              <span className="text-professional-gray">MobilePay</span>
              <span className="text-professional-gray">Vipps</span>
              <span className="text-professional-gray">Visa</span>
              <span className="text-professional-gray">Mastercard</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Ofte Stillede Spørgsmål</h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-dark-text mb-2">Hvad sker der med mine dokumenter efter analyse?</h3>
                <p className="text-professional-gray">
                  Vi gemmer INGEN dokumenter. Alle analyser leveres kun via e-mail, og ingen data opbevares på vores servere. 
                  Maksimal privatliv og GDPR-overholdelse.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-dark-text mb-2">Er dette forsikringsrådgivning?</h3>
                <p className="text-professional-gray">
                  Nej. Assurly leverer kun faktuel analyse og information. Vi giver ikke forsikringsrådgivning, 
                  anbefalinger eller formidler forsikringskøb. Kontakt autoriserede forsikringsprofessionelle for rådgivning.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-dark-text mb-2">Kan jeg få refundering?</h3>
                <p className="text-professional-gray">
                  Vi tilbyder enkeltanalyser uden abonnement. Betalinger er endelige efter analyse er leveret via e-mail. 
                  Ingen abonnementer at annullere - betal kun for det du bruger.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-dark-text mb-2">Hvilke filformater understøttes?</h3>
                <p className="text-professional-gray">
                  Vi understøtter PDF, DOC, DOCX og TXT filer op til 10MB hver. Dokumenter behandles med automatisk 
                  GDPR-datatkortning for at fjerne følsomme personlige oplysninger.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
