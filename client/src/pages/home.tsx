import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { DemoVideo } from "@/components/demo-video";
import { PricingCards } from "@/components/pricing-cards";
import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { 
  Shield, 
  UploadCloud, 
  Cpu, 
  BarChart2, 
  ShieldCheck, 
  Lock, 
  FileText,
  Info,
  FileMinus,
  Award,
  CheckCircle,
  Play
} from "lucide-react";

export default function Home() {
  const { t } = useI18n();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DisclaimerBanner />
      
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-6">
              Stop Med at Spilde Timer på Forsikringssammenligning
            </h1>
            <p className="text-xl text-professional-gray mb-8 max-w-3xl mx-auto">
              Lad vores AI finde forskelle mellem din nuværende forsikring og nye tilbud på få minutter. 
              Som en god ven der hjælper dig med at spotte hvad du ellers ville overse.
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-success-green mr-2" />
                <span className="text-sm text-professional-gray">GDPR Fokus</span>
              </div>
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-success-green mr-2" />
                <span className="text-sm text-professional-gray">Sikre Servere og Forbindelse</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-success-green mr-2" />
                <span className="text-sm text-professional-gray">Kun Analyseværktøj</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <Button className="bg-trust-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                  <UploadCloud className="h-5 w-5 mr-2" />
                  Start gratis analyse
                </Button>
              </Link>
              <Link href="/demo-report">
                <Button variant="outline" className="border-trust-blue text-trust-blue px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
                  <FileText className="h-5 w-5 mr-2" />
                  Se Eksempel Rapport
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Se hvordan det fungerer</h2>
            <p className="text-lg text-professional-gray max-w-2xl mx-auto">
              Få en hurtig introduktion til hvordan Assurly.io hjælper dig med at optimere dine forsikringer
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <DemoVideo 
              title="Assurly.io Demo - Optimal forsikringsdækning på få minutter"
              description="Se hvordan du nemt kan analysere dine forsikringer og spare penge"
              className="shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Example Report CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Se hvordan din rapport vil se ud
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Tænk dig at bruge timer på at sammenligne forsikringsvilkår og forsikringspolicer manuelt. 
              Få i stedet en objektiv analyse der peger på de vigtigste forskelle - som en god ven der hjælper dig se klart.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mb-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Eksempel: Bilforsikring Analyse</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Se en komplet sammenligning mellem nuværende police og konkurrenttilbud
                </p>
                <div className="bg-green-50 p-3 rounded mb-4">
                  <p className="text-green-800 font-semibold">Potentiel besparelse: 2.847 DKK/år</p>
                  <p className="text-sm text-green-700">Ved skift til konkurrent tilbud</p>
                </div>
                <Link href="/demo-report">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full">
                    <FileText className="h-5 w-5 mr-2" />
                    Se Den Komplette Rapport
                  </Button>
                </Link>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              Dette eksempel viser værdien af vores analyse - se selv hvad du kan spare
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-dark-text mb-2">Sparer dig for timer</h3>
              <p className="text-sm text-professional-gray">
                Undgå manuel sammenligning af forsikringspolicer og vilkår
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-dark-text mb-2">100% Sikker</h3>
              <p className="text-sm text-professional-gray">
                Sikker servers og GDPR-kompatibel
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-dark-text mb-2">Som en god ven</h3>
              <p className="text-sm text-professional-gray">
                Objektiv analyse uden salg - vi hjælper bare med at spotte forskelle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="py-16 bg-red-50 border-y border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-900 mb-4">
              Genkender Du Denne Situation?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
                <div className="text-red-600 mb-4">😤</div>
                <h3 className="font-semibold text-red-900 mb-2">Timer Spildt på Vilkår</h3>
                <p className="text-sm text-red-700">
                  Sidder og læser forsikringspolicer i timevis for at sammenligne dækning mellem forsikringer
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
                <div className="text-red-600 mb-4">🤔</div>
                <h3 className="font-semibold text-red-900 mb-2">Stoler Blindt på Sælger</h3>
                <p className="text-sm text-red-700">
                  Lytter bare til hvad forsikringsselskabet påstår om deres "bedre" dækning
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
                <div className="text-red-600 mb-4">🤷</div>
                <h3 className="font-semibold text-red-900 mb-2">Overser Vigtige Detaljer</h3>
                <p className="text-sm text-red-700">
                  Misser skjulte forskelle i selvrisiko, dækning eller vilkår fordi det er for komplekst
                </p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                Der Findes en Bedre Måde
              </h3>
              <p className="text-green-800">
                Lad Assurly.io gøre det hårde arbejde - vi scanner hver detalje og peger på de vigtigste forskelle. 
                Som en god ven der hjælper dig se klart uden at sælge dig noget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Sådan fungerer ForsikringsAnalyse</h2>
            <p className="text-lg text-professional-gray max-w-2xl mx-auto">
              Professionel dokumentanalyse i tre enkle trin. Al behandling overholder GDPR-reglerne.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-trust-blue rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <UploadCloud className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-4">1. Upload Dokumenter</h3>
              <p className="text-professional-gray">
                Upload sikkert dine nuværende forsikringsdokumenter (PDF/DOC). 
                GDPR-følsomme data skjules automatisk under behandling og slettes efter behandling.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-trust-blue rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-4">2. AI Analyse</h3>
              <p className="text-professional-gray">
                Avanceret AI analyserer forsikringsdækning, præmieoptimeringmuligheder, 
                og identificerer områder for potentiel forbedring.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-trust-blue rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <BarChart2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-4">3. Objektiv Rapport</h3>
              <p className="text-professional-gray">
                Modtag detaljeret analyse med faktuelle sammenligninger. 
                Sammenlign flere tilbud med objektiv datapræsentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section - Temporarily Disabled */}
      {/* 
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Hvad Siger Vores Kunder</h2>
            <p className="text-lg text-professional-gray max-w-2xl mx-auto">
              Læs ægte anmeldelser fra danske familier der har brugt vores analyseservice
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Review 1 - Free version */}
            {/*
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-lg">{star}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">5/5</span>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  "Den gratis analyse viste mig områder hvor jeg var overforsikret. Sparede allerede penge ved at justere min dækning!"
                </p>
                <div className="text-sm">
                  <p className="font-medium text-dark-text">Heidi Mogensen</p>
                  <p className="text-gray-500">Århus</p>
                </div>
              </CardContent>
            </Card>

            {/* Review 2 - Paid version */}
            {/*
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-lg">{star}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">5/5</span>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  "Betalte for konkurrentsammenligningen - fantastisk værdi! Fandt en bedre police og sparede 3.000 kr årligt."
                </p>
                <div className="text-sm">
                  <p className="font-medium text-dark-text">Ahmed Al-Hassan</p>
                  <p className="text-gray-500">København</p>
                </div>
              </CardContent>
            </Card>

            {/* Review 3 - Free version */}
            {/*
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {"★★★★☆".split("").map((star, i) => (
                      <span key={i} className="text-lg">{star}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4/5</span>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  "Super nemt at bruge. Den gratis rapport gav mig god indsigt i min nuværende dækning. Kan varmt anbefales!"
                </p>
                <div className="text-sm">
                  <p className="font-medium text-dark-text">Mette L. Sørensen</p>
                  <p className="text-gray-500">Odense</p>
                </div>
              </CardContent>
            </Card>

            {/* Review 4 - Paid version */}
            {/*
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-lg">{star}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">5/5</span>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  "Købte den fulde sammenligning med flere tilbud. Detaljeret analyse hjalp mig med at vælge den rigtige forsikring."
                </p>
                <div className="text-sm">
                  <p className="font-medium text-dark-text">Christian S. H. Jørgensen</p>
                  <p className="text-gray-500">Aalborg</p>
                </div>
              </CardContent>
            </Card>

            {/* Review 5 - Free version */}
            {/*
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-lg">{star}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">5/5</span>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  "Brugervenlig platform. Den gratis analyse identificerede forsikringsdækning problemer jeg ikke vidste jeg havde. Takker!"
                </p>
                <div className="text-sm">
                  <p className="font-medium text-dark-text">Ellen Karsby</p>
                  <p className="text-gray-500">Esbjerg</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Google Reviews Link Simulation */}
          {/*
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
              <span>Verificerede anmeldelser fra</span>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-blue-600">Google</span>
                <div className="flex text-yellow-400">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i} className="text-xs">{star}</span>
                  ))}
                </div>
                <span className="text-xs">(4.8/5 fra 127 anmeldelser)</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Gennemsigtig Prissætning</h2>
            <p className="text-lg text-professional-gray max-w-2xl mx-auto">
              Professionelle analyseværktøjer med klar prissætning. Betal kun for det du har brug for.
            </p>
          </div>

          <PricingCards />


        </div>
      </section>

      {/* Upload Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Prøv Upload Oplevelsen</h2>
            <p className="text-lg text-professional-gray">
              Oplev vores sikre dokumentupload proces. Start med en gratis analyse af din nuværende dækning.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-trust-blue transition-colors">
                <UploadCloud className="h-12 w-12 text-professional-gray mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-dark-text mb-2">Upload Forsikringsdokumenter</h3>
                <p className="text-professional-gray mb-6">
                  Træk og slip dine PDF eller DOC filer her, eller klik for at browse
                </p>
                <Link href="/upload">
                  <Button className="bg-trust-blue text-white hover:bg-blue-700">
                    Vælg Filer
                  </Button>
                </Link>
                <p className="text-sm text-professional-gray mt-4">
                  Maks. filstørrelse: 10MB • Understøttede formater: PDF, DOC, DOCX
                </p>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <h4 className="font-semibold text-dark-text mb-4">Vælg Analysetype</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="radio" name="analysis-type" value="free" defaultChecked className="mr-3" />
                    <span className="text-dark-text">Gratis Sammenligning (Se 1 vigtigste forskel)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="analysis-type" value="single" className="mr-3" />
                    <span className="text-dark-text">2 dækningsanalyser (129 DKK)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="analysis-type" value="multiple" className="mr-3" />
                    <span className="text-dark-text">Flere Dækningsanalyser (249 DKK)</span>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Link href="/upload">
                  <Button className="bg-trust-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                    <Play className="h-5 w-5 mr-2" />
                    Start Analyse
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-dark-text mb-4">Accepterede Betalingsmetoder</h2>
            <p className="text-professional-gray">Sikker og hurtig betaling med dine foretrukne metoder</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <img 
                src="/src/assets/payment-methods.png" 
                alt="Accepterede betalingsmetoder: Dankort, MobilePay, Visa, Mastercard" 
                className="h-12 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Sikkerhed & Overholdelse</h2>
            <p className="text-lg text-professional-gray max-w-2xl mx-auto">
              Kun brug af sikre servere og sikre forbindelser med fuld GDPR overholdelse. Dine dokumenter er beskyttet og automatisk slettet efter e-mail levering.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-success-green rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-4">GDPR Fokus</h3>
              <p className="text-professional-gray">
                Automatisk datasletning under behandling. Klare opbevaringsregler. 
                Ret til sletning og dataportabilitet fuldt understøttet.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-success-green rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-4">Krypteret Opbevaring</h3>
              <p className="text-professional-gray">
                End-to-end kryptering for alle dokumenter. Sikker behandling 
                med automatisk sletning efter e-mail levering.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-success-green rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <FileMinus className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-4">Automatisk Sletning</h3>
              <p className="text-professional-gray">
                Ingen dataopbevaring - kun e-mail levering. Automatisk sletning 
                efter behandling for maksimal privatlivsbeskyttelse.
              </p>
            </div>
          </div>


        </div>
      </section>

      {/* Legal Disclaimer Section */}
      <section className="py-16 bg-gray-100 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-dark-text mb-4">Vigtige Juridiske Oplysninger</h2>
          </div>
          
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6 text-sm text-professional-gray">
                <div>
                  <h4 className="font-semibold text-dark-text mb-2">Kun Analyseværktøj</h4>
                  <p>Assurly leverer kun faktuel analyse og information. Vi rangerer ikke, sælger ikke, anbefaler ikke eller faciliterer forsikringskøb. Alle forsikringsbeslutninger forbliver helt hos dig.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-dark-text mb-2">Ingen Finansiel Rådgivning</h4>
                  <p>Vores service er et analyseværktøj, ikke finansiel eller forsikringsrådgivning. Vi er ikke licenserede forsikringsmæglere og giver ikke anbefalinger eller vejledning om forsikringskøbsbeslutninger.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-dark-text mb-2">Uafhængig Beslutningstagning</h4>
                  <p>Du er eneansvarlig for alle forsikringsbeslutninger. Vi anbefaler at konsultere licenserede forsikringsprofessionelle for rådgivning tilpasset dine specifikke omstændigheder.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-dark-text mb-2">Databehandling</h4>
                  <p>Dokumentbehandling overholder GDPR-regler. Følsomme personlige data skjules automatisk under behandling og slettes efter behandling. Fulde databehandlingsdetaljer tilgængelige i vores Privatlivspolitik.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-text text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-trust-blue mr-2" />
                <span className="text-xl font-bold">Assurly</span>
              </div>
              <p className="text-gray-300 text-sm">
                Professionel forsikringsdokumentanalyse til informeret beslutningstagning. Kun analyseværktøj - ingen salg eller anbefalinger.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Service</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Sådan Fungerer Det</a></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Priser</Link></li>
                <li><a href="#security" className="hover:text-white transition-colors">Sikkerhed</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Juridisk</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Privatlivspolitik</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Servicevilkår</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR Fokus</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Databehandleraftale</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Kontakt Os</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dokumentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Systemstatus</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">
              © 2025 Assurly.io. All rights reserved. Professional analysis tool only.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-xs text-gray-400">Powered by Stripe Payments</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
