import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Shield, CreditCard, Lock, CheckCircle, Info, Smartphone } from "lucide-react";

// Initialize Stripe with MobilePay support
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

interface PlanDetails {
  key: string;
  name: string;
  description: string;
  features: string[];
}

const planDetails: Record<string, PlanDetails> = {
  single: {
    key: "single",
    name: "Enkelt Dækningsanalyse",
    description: "Sammenlign din nuværende police med et forsikringstilbud",
    features: [
      "Over/under-forsikret detektion",
      "Forskelssanalyse",
      "1 forsikringstilbud",
      "E-mail rapport levering"
    ]
  },
  multiple: {
    key: "multiple",
    name: "Flere Dækningsanalyser",
    description: "Sammenlign din nuværende police med op til 3 forsikringstilbud",
    features: [
      "Over/under-forsikret detektion", 
      "Forskelssanalyse",
      "Op til 3 forsikringstilbud",
      "Detaljeret sammenligningsmatrix",
      "E-mail rapport levering"
    ]
  }
};

const CheckoutForm = ({ plan, analysisId, amount }: { plan: string, analysisId?: string, amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/analysis/${analysisId}`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Payment Successful",
          description: "Your analysis is being processed. You'll be redirected to the results.",
        });
        
        // For analysis with existing documents, redirect to analysis page
        if (analysisId) {
          setLocation(`/analysis/${analysisId}`);
        } else {
          // For subscription, redirect to upload page
          setLocation('/upload');
        }
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <PaymentElement />
      </div>
      
      <Button 
        type="submit" 
        disabled={!stripe || processing}
        className="w-full bg-trust-blue text-white py-3 text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        {processing ? (
          <div className="flex items-center">
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            Processing Payment...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Lock className="h-5 w-5 mr-2" />
            Complete Secure Payment
          </div>
        )}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Hardcoded DKK pricing
  const pricing: Record<string, number> = {
    single: 129,
    multiple: 249
  };
  
  const formatPrice = (amount: number) => `${amount} DKK`;
  
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const [discountData, setDiscountData] = useState<any>(null);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get('plan') || 'single';
  const analysisId = urlParams.get('analysisId');

  const selectedPlan = planDetails[plan];
  const amount = pricing[plan] || 0;

  // Initialize final amount
  useEffect(() => {
    setFinalAmount(amount);
  }, [amount]);

  const validateDiscountCode = async () => {
    if (!discountCode.trim()) {
      toast({
        title: "Rabatkode påkrævet",
        description: "Indtast venligst en rabatkode",
        variant: "destructive",
      });
      return;
    }

    setDiscountLoading(true);
    try {
      const response = await apiRequest("POST", "/api/validate-discount", {
        code: discountCode.trim(),
        amount: amount
      });
      const data = await response.json();
      
      setDiscountData(data);
      setFinalAmount(data.pricing.finalAmount);
      
      toast({
        title: "Rabatkode aktiveret!",
        description: `${data.pricing.discountPercentage}% rabat anvendt. Du sparer ${data.pricing.discountAmount.toFixed(2)} DKK`,
      });
    } catch (error: any) {
      const errorData = await error.response?.json();
      toast({
        title: "Ugyldig rabatkode",
        description: errorData?.message || "Rabatkoden er ikke gyldig eller er udløbet",
        variant: "destructive",
      });
      setDiscountData(null);
      setFinalAmount(amount);
    } finally {
      setDiscountLoading(false);
    }
  };

  const removeDiscount = () => {
    setDiscountCode("");
    setDiscountData(null);
    setFinalAmount(amount);
    toast({
      title: "Rabat fjernet",
      description: "Rabatkoden er blevet fjernet fra din ordre",
    });
  };

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access checkout.",
        variant: "destructive",
      });
      setLocation('/upload?auth=required');
      return;
    }

    if (!selectedPlan) {
      toast({
        title: "Invalid Plan",
        description: "The selected plan is not valid.",
        variant: "destructive",
      });
      setLocation('/pricing');
      return;
    }

    // Create PaymentIntent
    const createPaymentIntent = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", { 
          amount: finalAmount > 0 ? finalAmount : amount,
          currency: 'dkk',
          analysisType: plan,
          discountCodeId: discountData?.discountCode?.id
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error: any) {
        toast({
          title: "Payment Setup Failed",
          description: "Unable to initialize payment. Please try again.",
          variant: "destructive",
        });
        console.error('Payment intent creation failed:', error);
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [user, plan, amount, selectedPlan, setLocation, toast, finalAmount, discountData]);

  // Recreate payment intent when discount is applied
  useEffect(() => {
    if (clientSecret && discountData) {
      setClientSecret("");
      setLoading(true);
      const createUpdatedPaymentIntent = async () => {
        try {
          const response = await apiRequest("POST", "/api/create-payment-intent", { 
            amount: finalAmount,
            currency: 'dkk',
            analysisType: plan,
            discountCodeId: discountData.discountCode.id
          });
          const data = await response.json();
          setClientSecret(data.clientSecret);
        } catch (error: any) {
          toast({
            title: "Payment Update Failed", 
            description: "Unable to apply discount. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
      
      createUpdatedPaymentIntent();
    }
  }, [discountData, finalAmount]);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DisclaimerBanner />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-trust-blue border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-dark-text mb-2">Setting up payment...</h3>
              <p className="text-professional-gray">Please wait while we prepare your secure checkout.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DisclaimerBanner />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-lg font-semibold text-dark-text mb-2">Payment Setup Failed</h3>
              <p className="text-professional-gray mb-6">
                We were unable to set up your payment. Please try again.
              </p>
              <Button onClick={() => setLocation('/pricing')} className="bg-trust-blue text-white hover:bg-blue-700">
                Return to Pricing
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Make SURE to wrap the form in <Elements> which provides the stripe context.
  return (
    <div className="min-h-screen bg-gray-50">
      <DisclaimerBanner />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark-text mb-4">
            Sikker Betaling
          </h1>
          <p className="text-lg text-professional-gray">
            Gennemfør dit køb for at få adgang til professionel forsikringsanalyse
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-trust-blue" />
                  Ordreoversigt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-dark-text">{selectedPlan.name}</h3>
                      <p className="text-sm text-professional-gray">{selectedPlan.description}</p>
                    </div>
                    <Badge className="bg-trust-blue text-white">
                      {formatPrice(amount)}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-dark-text mb-3">Hvad er inkluderet:</h4>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-success-green mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-professional-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Discount Code Section */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-dark-text">Rabatkode</h4>
                  {!discountData ? (
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="Indtast rabatkode"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={validateDiscountCode}
                        disabled={discountLoading || !discountCode.trim()}
                        className="text-sm"
                      >
                        {discountLoading ? "Validerer..." : "Anvend"}
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-green-800">
                            {discountData.discountCode.code} anvendt
                          </p>
                          <p className="text-xs text-green-600">
                            {discountData.discountCode.description}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeDiscount}
                          className="text-xs text-green-700 hover:text-green-900"
                        >
                          Fjern
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-professional-gray">Subtotal</span>
                    <span className="text-dark-text">{formatPrice(amount)}</span>
                  </div>
                  
                  {discountData && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Rabat ({discountData.pricing.discountPercentage}%)</span>
                      <span>-{formatPrice(discountData.pricing.discountAmount)}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-dark-text">Total</span>
                    <span className="text-trust-blue">{formatPrice(finalAmount)}</span>
                  </div>
                </div>

                {analysisId && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-trust-blue mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-dark-text">Documents Ready</p>
                        <p className="text-xs text-professional-gray">
                          Your documents have been uploaded and are ready for analysis upon payment completion.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-success-green" />
                  Sikker Betaling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-professional-gray">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success-green mr-2" />
                    <span>256-bit SSL kryptering</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success-green mr-2" />
                    <span>PCI DSS kompatibel behandling</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success-green mr-2" />
                    <span>Ingen kortoplysninger gemt</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success-green mr-2" />
                    <span>Drevet af Stripe</span>
                  </div>
                  <div className="flex items-center">
                    <Smartphone className="h-4 w-4 text-success-green mr-2" />
                    <span>MobilePay understøttet</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  Accepterede Betalingsmetoder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center p-4">
                  <img 
                    src="/src/assets/payment-methods.png" 
                    alt="Accepterede betalingsmetoder: Dankort, MobilePay, Visa, Mastercard" 
                    className="h-10 object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-trust-blue" />
                  Betalingsoplysninger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Elements 
                  stripe={stripePromise} 
                  options={{ 
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#2563eb',
                        colorBackground: '#ffffff',
                        colorText: '#1f2937',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        borderRadius: '8px'
                      }
                    },
                    loader: 'auto'
                  }}
                >
                  <CheckoutForm plan={plan} analysisId={analysisId || undefined} amount={amount} />
                </Elements>
              </CardContent>
            </Card>

            {/* Legal Notice */}
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Vigtig Bemærkning</h4>
                    <p className="text-sm text-amber-700">
                      Ved at gennemføre dette køb, anerkender du at Assurly.io kun leverer analytiske oplysninger. 
                      Vi giver ikke forsikringsrådgivning, anbefalinger eller faciliterer forsikringskøb. 
                      Alle forsikringsbeslutninger forbliver udelukkende hos dig.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accepted Payment Methods */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-dark-text mb-4 text-center">Accepterede Betalingsmetoder</h4>
                
                {/* MobilePay Featured */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-blue-600 mr-3" />
                    <div className="text-center">
                      <p className="font-semibold text-blue-800">MobilePay & Vipps</p>
                      <p className="text-sm text-blue-600">Populær i Danmark & Norge</p>
                    </div>
                  </div>
                </div>
                
                {/* Other payment methods */}
                <div className="text-center">
                  <p className="text-sm text-professional-gray mb-2">Andre betalingsmetoder:</p>
                  <div className="flex justify-center items-center space-x-4 text-professional-gray text-sm">
                    <span>Visa</span>
                    <span>•</span>
                    <span>Mastercard</span>
                  </div>
                  <p className="text-xs text-professional-gray mt-2">
                    Alle betalinger er sikre og krypterede
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
