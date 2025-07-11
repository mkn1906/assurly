import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navigation } from "@/components/navigation";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { 
  FileText, 
  Calendar, 
  Eye, 
  Download, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  Shield,
  User,
  CreditCard,
  Settings
} from "lucide-react";

interface Analysis {
  id: number;
  analysisType: string;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const { data: analyses, isLoading } = useQuery<Analysis[]>({
    queryKey: ['/api/analyses'],
    enabled: !!user,
  });

  if (!user) {
    setLocation('/');
    return null;
  }

  const getAnalysisTypeLabel = (type: string) => {
    switch (type) {
      case 'free': return 'Free Analysis';
      case 'single': return 'Single Comparison';
      case 'multiple': return 'Multiple Comparison';
      case 'annual': return 'Annual Account';
      default: return 'Analysis';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success-green" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-amber-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-warning-red" />;
      default:
        return <Clock className="h-4 w-4 text-professional-gray" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success-green text-white">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-amber-600 text-white">Processing</Badge>;
      case 'error':
        return <Badge className="bg-warning-red text-white">Error</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSubscriptionStatus = () => {
    switch (user.subscriptionTier) {
      case 'free':
        return { label: 'Free Plan', color: 'text-professional-gray' };
      case 'single':
        return { label: 'Single Comparison', color: 'text-trust-blue' };
      case 'multiple':
        return { label: 'Multiple Comparison', color: 'text-trust-blue' };
      case 'annual':
        return { label: 'Annual Account', color: 'text-success-green' };
      default:
        return { label: 'Free Plan', color: 'text-professional-gray' };
    }
  };

  const subscriptionStatus = getSubscriptionStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <DisclaimerBanner />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-dark-text mb-2">Dashboard</h1>
            <p className="text-lg text-professional-gray">
              Manage your insurance analyses and account settings
            </p>
          </div>
          <Button 
            onClick={() => setLocation('/upload')}
            className="bg-trust-blue text-white hover:bg-blue-700 mt-4 md:mt-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Analysis
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-trust-blue" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-professional-gray">Email</p>
                  <p className="font-medium text-dark-text">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-professional-gray">Plan</p>
                  <p className={`font-medium ${subscriptionStatus.color}`}>
                    {subscriptionStatus.label}
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={logout}
                    className="w-full justify-start"
                  >
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setLocation('/upload')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Analysis
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setLocation('/pricing')}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Reports
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-professional-gray">Total Analyses</p>
                      <p className="text-2xl font-bold text-dark-text">
                        {analyses?.length || 0}
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-trust-blue" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-professional-gray">Completed</p>
                      <p className="text-2xl font-bold text-dark-text">
                        {analyses?.filter(a => a.status === 'completed').length || 0}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-success-green" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-professional-gray">This Month</p>
                      <p className="text-2xl font-bold text-dark-text">
                        {analyses?.filter(a => {
                          const analysisDate = new Date(a.createdAt);
                          const now = new Date();
                          return analysisDate.getMonth() === now.getMonth() && 
                                 analysisDate.getFullYear() === now.getFullYear();
                        }).length || 0}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-trust-blue" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Analyses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-trust-blue" />
                  Recent Analyses
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-6 h-6 border-4 border-trust-blue border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-professional-gray">Loading analyses...</p>
                  </div>
                ) : analyses && analyses.length > 0 ? (
                  <div className="space-y-4">
                    {analyses.map((analysis) => (
                      <div 
                        key={analysis.id} 
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(analysis.status)}
                          <div>
                            <h4 className="font-medium text-dark-text">
                              {getAnalysisTypeLabel(analysis.analysisType)}
                            </h4>
                            <p className="text-sm text-professional-gray">
                              Created: {formatDate(analysis.createdAt)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(analysis.status)}
                          {analysis.status === 'completed' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setLocation(`/analysis/${analysis.id}`)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-professional-gray mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-dark-text mb-2">No Analyses Yet</h3>
                    <p className="text-professional-gray mb-6">
                      Start your first insurance document analysis to see it here.
                    </p>
                    <Button 
                      onClick={() => setLocation('/upload')}
                      className="bg-trust-blue text-white hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Start First Analysis
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subscription Info */}
            {user.subscriptionTier !== 'free' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-success-green" />
                    Subscription Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-professional-gray">Current Plan</span>
                      <Badge className="bg-success-green text-white">
                        {subscriptionStatus.label}
                      </Badge>
                    </div>
                    
                    {user.subscriptionTier === 'annual' && (
                      <div className="flex justify-between items-center">
                        <span className="text-professional-gray">Status</span>
                        <span className="text-success-green font-medium">Active</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-professional-gray">Document Storage</span>
                      <span className="text-dark-text font-medium">
                        {user.subscriptionTier === 'annual' ? 'Permanent' : '30 days'}
                      </span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Manage Billing
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Invoices
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Legal Notice */}
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-amber-800 mb-2">Data Retention Notice</h4>
                <p className="text-sm text-amber-700">
                  Your documents and analyses are stored according to your subscription tier. 
                  Free analyses are session-only, paid comparisons are stored for 30 days, 
                  and annual accounts maintain documents while your subscription is active. 
                  All data is processed in compliance with GDPR regulations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
