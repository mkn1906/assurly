import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";

interface PricingTier {
  key: string;
  name: string;
  description: string;
  features: Array<{ text: string; included: boolean }>;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    key: "free",
    name: "Gratis Sammenligning",
    description: "Se 1 vigtigste forskel",
    features: [
      { text: "Automatisk forsikring validering", included: true },
      { text: "Viser den største dækningsforskel", included: true },
      { text: "Grundlæggende prissammenligning", included: true },
      { text: "Kun skærm visning", included: true },
      { text: "E-mail rapport levering", included: false },
      { text: "PDF download", included: false },
      { text: "Alle andre sammenligninger", included: false },
    ],
  },
  {
    key: "single",
    name: "2 dækningsanalyser",
    description: "129 DKK",
    features: [
      { text: "Alle dækningssammenligninger", included: true },
      { text: "Detaljeret prisanalyse", included: true },
      { text: "Årlig besparelsesberegning", included: true },
      { text: "Skærm + e-mail + PDF rapport", included: true },
      { text: "Sammenlign op til 2 tilbud fra forsikringselskaber", included: true },
      { text: "Komplet analyserapport", included: true },
    ],
  },
  {
    key: "multiple",
    name: "Flere Dækningsanalyser",
    description: "249 DKK",
    popular: true,
    features: [
      { text: "Alle dækningssammenligninger", included: true },
      { text: "Op til 5 forsikringssammenligninger", included: true },
      { text: "Skærm + e-mail + PDF rapport", included: true },
      { text: "Detaljeret sammenligningsmatrix", included: true },
      { text: "Udvidet analyserapport", included: true },
    ],
  },

];

export function PricingCards() {
  const { formatPrice, t, currency } = useI18n();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  
  const pricing = {
    free: 0,
    single: 129,
    multiple: 249
  };

  const handleSelectPlan = (tier: string) => {
    if (tier === "free") {
      setLocation("/upload?type=free");
    } else if (user) {
      setLocation(`/checkout?plan=${tier}`);
    } else {
      setLocation("/upload?auth=required");
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {pricingTiers.map((tier) => (
        <Card
          key={tier.key}
          className={`relative hover:shadow-lg transition-shadow flex flex-col h-full ${
            tier.popular ? "border-2 border-trust-blue" : "border-2 border-gray-200"
          }`}
        >
          {tier.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-trust-blue text-white px-4 py-1">Populær</Badge>
            </div>
          )}
          
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-dark-text mb-2">
              {tier.name}
            </CardTitle>
            <div className="text-3xl font-bold text-dark-text">
              {tier.key === "free" ? "GRATIS" : formatPrice(pricing[tier.key as keyof typeof pricing] || 0)}
            </div>
            <p className="text-sm text-professional-gray mt-2">{tier.description}</p>
          </CardHeader>
          
          <CardContent className="flex flex-col h-full">
            <ul className="space-y-3 mb-8 flex-grow">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  {feature.included ? (
                    <Check className="h-4 w-4 text-success-green mr-3 flex-shrink-0" />
                  ) : (
                    <X className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${feature.included ? "" : "text-gray-400"}`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
            
            <Button
              onClick={() => handleSelectPlan(tier.key)}
              className={`w-full font-semibold transition-colors mt-auto ${
                tier.key === "free" || tier.popular
                  ? "bg-trust-blue text-white hover:bg-blue-700"
                  : "border border-trust-blue text-trust-blue hover:bg-blue-50"
              }`}
              variant={tier.key === "free" || tier.popular ? "default" : "outline"}
            >
              {tier.key === "free" ? "Start gratis analyse" : "Vælg plan"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
