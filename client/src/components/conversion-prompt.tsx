import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { TrendingUp, Eye, Lock, ArrowRight, Zap } from "lucide-react";

interface ConversionPromptProps {
  analysisData: {
    selectedPolicy?: string;
    totalPoliciesUploaded?: number;
    conversionMessage?: string;
    impactScore?: number;
    issueCount?: number;
    severity?: 'low' | 'medium' | 'high' | 'critical';
  };
  className?: string;
}

export function ConversionPrompt({ analysisData, className = "" }: ConversionPromptProps) {
  const [, setLocation] = useLocation();

  if (!analysisData.totalPoliciesUploaded || analysisData.totalPoliciesUploaded <= 1) {
    return null; // Don't show for single policies
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high': return <Zap className="h-4 w-4" />;
      case 'medium': return <TrendingUp className="h-4 w-4" />;
      case 'low': return <Eye className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  return (
    <Card className={`border-2 border-trust-blue bg-gradient-to-r from-blue-50 to-indigo-50 ${className}`}>
      <CardContent className="p-6">
        {/* Header with stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-trust-blue rounded-full p-2">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-dark-text">Gratis Analyse Fuldført</h3>
              <p className="text-sm text-gray-600">
                Analyseret 1 af {analysisData.totalPoliciesUploaded} police
              </p>
            </div>
          </div>
          
          {analysisData.severity && (
            <Badge className={`${getSeverityColor(analysisData.severity)} border`}>
              <div className="flex items-center space-x-1">
                {getSeverityIcon(analysisData.severity)}
                <span className="capitalize">{analysisData.severity}</span>
              </div>
            </Badge>
          )}
        </div>

        {/* Impact stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/60 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-trust-blue">
              {analysisData.issueCount || 0}
            </div>
            <div className="text-xs text-gray-600">Problemer fundet</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {analysisData.impactScore || 0}
            </div>
            <div className="text-xs text-gray-600">Impact score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {(analysisData.totalPoliciesUploaded || 1) - 1}
            </div>
            <div className="text-xs text-gray-600">Police tilbage</div>
          </div>
        </div>

        {/* Conversion message */}
        <div className="mb-6">
          <div className="bg-white/80 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 text-trust-blue mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-dark-text font-medium mb-1">Interessant opdagelse!</p>
                <p className="text-gray-700 text-sm">
                  {analysisData.conversionMessage || 
                   "Vi fandt flere interessante områder der kan optimeres i denne police. Hvad mon der gemmer sig i dine andre forsikringer?"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-trust-blue text-white hover:bg-blue-700 font-semibold py-3"
            onClick={() => setLocation('/pricing')}
          >
            <div className="flex items-center justify-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Analyser alle dine forsikringer</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-gray-600">
              Fra kun {129} DKK - Analyser alle police og få fuldstændig sammenligning
            </p>
          </div>
        </div>

        {/* What you get with paid */}
        <div className="mt-6 pt-4 border-t border-blue-200">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-trust-blue rounded-full mr-2"></div>
              Alle {analysisData.totalPoliciesUploaded} police analyseret
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-trust-blue rounded-full mr-2"></div>
              Detaljeret sammenligning
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-trust-blue rounded-full mr-2"></div>
              Konkurrent analyse
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-trust-blue rounded-full mr-2"></div>
              Prioriteret support
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}