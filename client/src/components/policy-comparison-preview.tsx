import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, TrendingUp, Eye, Lock } from "lucide-react";
import { useLocation } from "wouter";

interface PolicyComparisonPreviewProps {
  freePreview: {
    policyName: string;
    comparisonResult: {
      coverageDifferences: string[];
      priceDifference: {
        amount: number;
        percentage: number;
        description: string;
      };
      analysisResult: string;
      impactScore: number;
    };
  };
  conversionMessage: string;
  hiddenCount: number;
  className?: string;
}

export function PolicyComparisonPreview({ 
  freePreview, 
  conversionMessage, 
  hiddenCount, 
  className = "" 
}: PolicyComparisonPreviewProps) {
  const [, setLocation] = useLocation();

  const isPositiveSavings = freePreview.comparisonResult.priceDifference.amount < 0;
  const PriceIcon = isPositiveSavings ? TrendingDown : TrendingUp;
  const priceColor = isPositiveSavings ? "text-green-600" : "text-red-600";
  const priceBgColor = isPositiveSavings ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200";

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Free Preview - Highest Impact Comparison */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-blue-900">
              <Eye className="h-5 w-5 inline mr-2" />
              Gratis Indsigt: {freePreview.policyName.replace('policy', 'forsikring')}
            </CardTitle>
            <Badge className="bg-blue-600 text-white">
              Impact Score: {freePreview.comparisonResult.impactScore}/100
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Price Comparison */}
          <div className={`p-4 rounded-lg border ${priceBgColor}`}>
            <div className="flex items-center space-x-3">
              <PriceIcon className={`h-6 w-6 ${priceColor}`} />
              <div>
                <h4 className="font-semibold text-gray-900">Prissammenligning</h4>
                <p className={`text-lg font-bold ${priceColor}`}>
                  {freePreview.comparisonResult.priceDifference.description}
                </p>
                <p className="text-sm text-gray-600">
                  {isPositiveSavings ? 'Potentiel årlig besparelse' : 'Årlig meromkostning'}
                </p>
              </div>
            </div>
          </div>

          {/* Coverage Differences Preview */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
              Vigtigste Dækningsforskelle
            </h4>
            <ul className="space-y-1 text-sm text-gray-700">
              {freePreview.comparisonResult.coverageDifferences.slice(0, 2).map((diff, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                  {diff}
                </li>
              ))}
              {freePreview.comparisonResult.coverageDifferences.length > 2 && (
                <li className="text-blue-600 font-medium">
                  +{freePreview.comparisonResult.coverageDifferences.length - 2} flere forskelle...
                </li>
              )}
            </ul>
          </div>

          {/* Recommendation Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">AI Anbefaling</h4>
            <p className="text-sm text-gray-700">
              {freePreview.comparisonResult.recommendation.substring(0, 150)}...
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Section */}
      <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <Lock className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <h3 className="text-xl font-bold text-orange-900">
                  {hiddenCount} Andre Vigtige Sammenligninger Låst
                </h3>
                <p className="text-orange-700">
                  Få adgang til alle analyser og se det komplette billede
                </p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <p className="text-gray-700 mb-4">
                {conversionMessage}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => setLocation('/pricing#single')}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Se Alle Sammenligninger (129 DKK)
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setLocation('/pricing#multiple')}
                  className="border-orange-600 text-orange-600 hover:bg-orange-50"
                >
                  Premium Analyse (249 DKK)
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center text-sm text-orange-700 pt-4 border-t border-orange-200">
              <div>
                <div className="font-semibold">Alle Forskelle</div>
                <div>Komplet dækningsoverblik</div>
              </div>
              <div>
                <div className="font-semibold">E-mail + PDF</div>
                <div>Send & download rapport</div>
              </div>
              <div>
                <div className="font-semibold">Besparelsesanalyse</div>
                <div>Årlig opsparingsberegning</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}