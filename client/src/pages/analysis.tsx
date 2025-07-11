import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/navigation";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { ConversionPrompt } from "@/components/conversion-prompt";
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Download,
  Mail,
  BarChart3,
  Shield,
  Info
} from "lucide-react";

interface CoverageAnalysis {
  coverageGaps: string[];
  overInsurance: string[];
  improvements: string[];
  premiumOptimization: string[];
  riskAssessment: string;
  summary: string;
  impactScore?: number;
  issueCount?: number;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  selectedPolicy?: string;
  totalPoliciesUploaded?: number;
  conversionMessage?: string;
}

interface CompetitorComparison {
  priceComparison: {
    currentPremium: number;
    competitorPremium: number;
    difference: number;
    percentageDifference: number;
  };
  coverageComparison: {
    betterCoverage: string[];
    worseCoverage: string[];
    similarCoverage: string[];
  };
  termComparison: {
    betterTerms: string[];
    worseTerms: string[];
    similarTerms: string[];
  };
  recommendation: string;
}

interface AnalysisData {
  id: number;
  analysisType: string;
  status: string;
  analysisData: CoverageAnalysis;
  comparisonData: CompetitorComparison[] | null;
  createdAt: string;
}

export default function Analysis() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const analysisId = params.id;

  const { data: analysis, isLoading, error } = useQuery<AnalysisData>({
    queryKey: ['/api/analysis', analysisId],
    enabled: !!analysisId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <DisclaimerBanner />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-trust-blue border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-dark-text mb-2">Analyzing Your Documents</h3>
              <p className="text-professional-gray">Please wait while we process your insurance documents...</p>
              <Progress value={65} className="mt-4 max-w-md mx-auto" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <DisclaimerBanner />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-warning-red mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-dark-text mb-2">Analysis Not Found</h3>
              <p className="text-professional-gray mb-6">
                The requested analysis could not be found or may have expired.
              </p>
              <Button onClick={() => setLocation('/upload')} className="bg-trust-blue text-white hover:bg-blue-700">
                Start New Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (analysis.status === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <DisclaimerBanner />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-trust-blue border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-dark-text mb-2">Processing Analysis</h3>
              <p className="text-professional-gray">Your analysis is being processed. Please check back in a few minutes.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAnalysisTypeLabel = (type: string) => {
    switch (type) {
      case 'free': return 'Free Coverage Analysis';
      case 'single': return 'Single Competitor Comparison';
      case 'multiple': return 'Multiple Competitor Comparison';
      default: return 'Analysis';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <DisclaimerBanner />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-trust-blue mr-3" />
            <h1 className="text-4xl font-bold text-dark-text">Analysis Report</h1>
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm text-professional-gray">
            <Badge variant="outline" className="text-trust-blue border-trust-blue">
              {getAnalysisTypeLabel(analysis.analysisType)}
            </Badge>
            <span>•</span>
            <span>Generated: {formatDate(analysis.createdAt)}</span>
          </div>
        </div>

        {/* Conversion Prompt for Free Tier Multi-Policy */}
        {analysis.analysisType === 'free' && analysis.analysisData?.totalPoliciesUploaded && analysis.analysisData.totalPoliciesUploaded > 1 && (
          <ConversionPrompt 
            analysisData={analysis.analysisData}
            className="mb-8"
          />
        )}

        {/* Important Notice */}
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Analysis Information Only</h4>
                <p className="text-sm text-amber-700">
                  This report provides factual analysis for informational purposes only. We do not provide insurance advice, 
                  recommendations, or facilitate insurance purchases. All insurance decisions remain entirely with you. 
                  Consult licensed insurance professionals for advice tailored to your specific circumstances.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analysis */}
          <div className="lg:col-span-2 space-y-8">
            {/* Risk Assessment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-trust-blue" />
                  Risk Assessment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-dark-text mb-2">Overall Risk Profile</h4>
                    <p className="text-professional-gray">{analysis.analysisData.riskAssessment}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-text mb-2">Analysis Summary</h4>
                    <p className="text-professional-gray">{analysis.analysisData.summary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coverage Gaps */}
            {analysis.analysisData.coverageGaps && analysis.analysisData.coverageGaps.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-warning-red">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Potential Coverage Gaps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis.analysisData.coverageGaps.map((gap, index) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-warning-red mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-professional-gray">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Over Insurance */}
            {analysis.analysisData.overInsurance && analysis.analysisData.overInsurance.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-600">
                    <TrendingDown className="h-5 w-5 mr-2" />
                    Potential Over-Insurance Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis.analysisData.overInsurance.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <TrendingDown className="h-4 w-4 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-professional-gray">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Improvement Opportunities */}
            {analysis.analysisData.improvements && analysis.analysisData.improvements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-success-green">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Improvement Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis.analysisData.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-success-green mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-professional-gray">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Competitor Comparisons */}
            {analysis.comparisonData && analysis.comparisonData.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-dark-text">Competitor Comparisons</h2>
                {analysis.comparisonData.map((comparison, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>Competitor Quote #{index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Price Comparison */}
                      <div>
                        <h4 className="font-semibold text-dark-text mb-3">Price Comparison</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-professional-gray mb-1">Current Premium</p>
                            <p className="text-xl font-bold text-dark-text">
                              ${comparison.priceComparison.currentPremium.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-professional-gray mb-1">Competitor Premium</p>
                            <p className="text-xl font-bold text-dark-text">
                              ${comparison.priceComparison.competitorPremium.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-professional-gray mb-1">Difference</p>
                            <p className={`text-xl font-bold ${comparison.priceComparison.difference < 0 ? 'text-success-green' : 'text-warning-red'}`}>
                              {comparison.priceComparison.difference > 0 ? '+' : ''}
                              ${comparison.priceComparison.difference.toLocaleString()} 
                              ({comparison.priceComparison.percentageDifference.toFixed(1)}%)
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Coverage Comparison */}
                      <div className="grid md:grid-cols-3 gap-6">
                        {comparison.coverageComparison.betterCoverage.length > 0 && (
                          <div>
                            <h5 className="font-semibold text-success-green mb-3">Better Coverage</h5>
                            <ul className="space-y-2">
                              {comparison.coverageComparison.betterCoverage.map((item, i) => (
                                <li key={i} className="text-sm text-professional-gray flex items-start">
                                  <CheckCircle className="h-3 w-3 text-success-green mr-2 flex-shrink-0 mt-0.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {comparison.coverageComparison.worseCoverage.length > 0 && (
                          <div>
                            <h5 className="font-semibold text-warning-red mb-3">Worse Coverage</h5>
                            <ul className="space-y-2">
                              {comparison.coverageComparison.worseCoverage.map((item, i) => (
                                <li key={i} className="text-sm text-professional-gray flex items-start">
                                  <AlertTriangle className="h-3 w-3 text-warning-red mr-2 flex-shrink-0 mt-0.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {comparison.coverageComparison.similarCoverage.length > 0 && (
                          <div>
                            <h5 className="font-semibold text-professional-gray mb-3">Similar Coverage</h5>
                            <ul className="space-y-2">
                              {comparison.coverageComparison.similarCoverage.map((item, i) => (
                                <li key={i} className="text-sm text-professional-gray flex items-start">
                                  <CheckCircle className="h-3 w-3 text-professional-gray mr-2 flex-shrink-0 mt-0.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <Separator />

                      {/* Factual Summary */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-semibold text-dark-text mb-2">Factual Analysis</h5>
                        <p className="text-professional-gray">{comparison.recommendation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Print Report
                </Button>
              </CardContent>
            </Card>

            {/* Premium Optimization */}
            {analysis.analysisData.premiumOptimization && analysis.analysisData.premiumOptimization.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-success-green" />
                    Premium Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis.analysisData.premiumOptimization.map((insight, index) => (
                      <li key={index} className="text-sm text-professional-gray">
                        • {insight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-professional-gray">
                  <div>
                    <h5 className="font-semibold text-dark-text mb-1">1. Review Analysis</h5>
                    <p>Carefully review all identified areas and comparisons.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-dark-text mb-1">2. Consult Professionals</h5>
                    <p>Discuss findings with licensed insurance professionals.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-dark-text mb-1">3. Make Informed Decisions</h5>
                    <p>Use this analysis to guide your insurance decisions.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <Card className="mt-12 border-gray-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h4 className="font-semibold text-dark-text mb-2">Important Disclaimer</h4>
              <p className="text-sm text-professional-gray max-w-4xl mx-auto">
                This analysis is provided for informational purposes only and does not constitute insurance advice, 
                recommendations, or solicitation. Assurly.io is an analytical tool only. We do not rank, sell, 
                recommend, or facilitate insurance purchases. All insurance decisions remain entirely with you. 
                Please consult with licensed insurance professionals for advice tailored to your specific circumstances.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
