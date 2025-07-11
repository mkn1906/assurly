import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { FileUpload } from "@/components/ui/file-upload";

import { useToast } from "@/hooks/use-toast";

import { Play, Info } from "lucide-react";

export default function Upload() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Hardcoded DKK pricing
  const pricing = {
    single: 129,
    multiple: 249
  };
  
  const formatPrice = (amount: number) => `${amount} DKK`;
  
  const [analysisType, setAnalysisType] = useState("free");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [emailReports, setEmailReports] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [processing, setProcessing] = useState(false);


  const analysisOptions = [
    {
      value: "free",
      label: "Gratis Sammenligning",
      description: "Se 1 vigtigste forskel",
      price: 0,
    },
    {
      value: "single",
      label: "2 dækningsanalyser",
      description: "Sammenlign op til 2 tilbud fra forsikringselskaber",
      price: pricing.single,
    },
    {
      value: "multiple",
      label: "Flere Dækningsanalyser",
      description: "Op til 5 forsikringssammenligninger",
      price: pricing.multiple,
    },
  ];

  const selectedOption = analysisOptions.find(opt => opt.value === analysisType);

  const handleFilesUploaded = (files: File[]) => {
    setUploadedFiles(files);
  };

  const handleStartAnalysis = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "Ingen Filer Valgt",
        description: "Upload venligst mindst ét forsikringsdokument til analyse.",
        variant: "destructive",
      });
      return;
    }

    // Direct to checkout for paid options
    if (analysisType !== "free") {
      // This will be handled by the checkout flow
    }

    setProcessing(true);

    try {
      // Upload files
      const formData = new FormData();
      uploadedFiles.forEach(file => {
        formData.append('documents', file);
      });
      formData.append('analysisType', analysisType);
      if (postcode) {
        formData.append('postcode', postcode);
      }

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const uploadData = await uploadResponse.json();

      // For paid analysis, redirect to checkout
      if (analysisType !== 'free') {
        setLocation(`/checkout?plan=${analysisType}&analysisId=${uploadData.analysisId}`);
        return;
      }

      // For free analysis, start processing immediately
      const analysisResponse = await fetch(`/api/analyze/${uploadData.analysisId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailReports ? email : null
        }),
        credentials: 'include',
      });

      if (!analysisResponse.ok) {
        throw new Error('Analysis failed');
      }

      const analysisData = await analysisResponse.json();
      setLocation(`/analysis/${analysisData.analysisId}`);

    } catch (error: any) {
      console.error('Analysis error:', error);
      toast({
        title: "Analyse Fejlede",
        description: error.message || "Der opstod en fejl under analysen. Prøv venligst igen.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DisclaimerBanner />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark-text mb-4">
            Upload Forsikringsdokumenter
          </h1>
          <p className="text-lg text-professional-gray max-w-2xl mx-auto">
            Upload dine forsikringsdokumenter sikkert til professionel analyse. 
            Al data behandles i overensstemmelse med GDPR-reglerne.
          </p>
        </div>

        <div className="space-y-8">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2 text-trust-blue" />
                Dokument Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload onFilesUploaded={handleFilesUploaded} />
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-dark-text mb-2">Sådan Fungerer Sammenligningen</h4>
                <ul className="text-sm text-professional-gray space-y-1">
                  <li>• <strong>1. Upload:</strong> Din nuværende forsikring + nye tilbud fra konkurrenter</li>
                  <li>• <strong>2. Gratis Preview:</strong> Se den vigtigste sammenligning med størst impact</li>
                  <li>• <strong>3. Opgrader:</strong> Få adgang til alle sammenligninger og besparelsesanalyse</li>
                </ul>
                <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Tip:</strong> Upload mindst 2 dokumenter for sammenligning - din nuværende forsikring og minimum 1 konkurrenttilbud.
                  </p>
                </div>
                <div className="mt-3 p-3 bg-orange-50 rounded border border-orange-200">
                  <p className="text-sm text-orange-800">
                    <strong>Gratis version:</strong> Kun skærmvisning af 1 sammenligning. 
                    <strong>Betalt version:</strong> Skærm + e-mail + PDF download af alle sammenligninger.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Vælg Analysetype</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={analysisType} onValueChange={setAnalysisType}>
                {analysisOptions.map((option) => (
                  <div key={option.value} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={option.value} className="text-base font-medium cursor-pointer">
                        {option.label}
                        {option.price > 0 && (
                          <span className="ml-2 text-trust-blue font-semibold">
                            {formatPrice(option.price)}
                          </span>
                        )}
                      </Label>
                      <p className="text-sm text-professional-gray mt-1">{option.description}</p>

                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Postcode for Price Comparison Data */}
          <Card>
            <CardHeader>
              <CardTitle>Postnummer (Valgfrit)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="postcode">Postnummer</Label>
                <Input
                  id="postcode"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="1000"
                  maxLength={4}
                  className="w-32"
                />
                <p className="text-xs text-professional-gray">
                  Hjælper os med at bygge anonymous prissammenligninger for fremtidige brugere. 
                  Vi gemmer kun postnummer - ingen andre personoplysninger.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Email Options */}
          <Card>
            <CardHeader>
              <CardTitle>E-mail Levering</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="email-reports" 
                  checked={emailReports}
                  onCheckedChange={(checked) => setEmailReports(!!checked)}
                />
                <Label htmlFor="email-reports">Send analyserapport via e-mail</Label>
              </div>
              
              {emailReports && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">E-mail Adresse</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="din@email.dk"
                      className="mt-1"
                    />
                    <p className="text-xs text-professional-gray mt-1">
                      Rapporten sendes til denne e-mail adresse når analysen er færdig
                    </p>
                  </div>

                  {/* Marketing Consent */}
                  <div className="border-t pt-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="marketing-consent" 
                        checked={marketingConsent}
                        onCheckedChange={(checked) => setMarketingConsent(!!checked)}
                      />
                      <div className="flex-1">
                        <Label htmlFor="marketing-consent" className="text-sm">
                          Ja tak, tilmeld mig nyhedsbrev, så jeg kan besked om tilbud på gennemgang af mine forsikringspolicer. Max et par gange om året.
                        </Label>
                        <p className="text-xs text-professional-gray mt-1">
                          Du kan altid framelde dig. Se vores <a href="/privacy" className="text-trust-blue hover:underline">privatlivspolitik</a>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="text-center">
            <Button
              onClick={handleStartAnalysis}
              disabled={processing || uploadedFiles.length === 0}
              className="bg-trust-blue text-white px-8 py-4 text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {processing ? (
                "Behandler..."
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  {selectedOption?.price === 0 ? "Start Gratis Analyse" : `Fortsæt til Betaling (${formatPrice(selectedOption?.price || 0)})`}
                </>
              )}
            </Button>
            
            {uploadedFiles.length === 0 && (
              <p className="text-sm text-professional-gray mt-2">
                Upload venligst mindst ét dokument for at fortsætte
              </p>
            )}
          </div>

          {/* Legal Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">Vigtig Juridisk Meddelelse</h4>
            <p className="text-sm text-amber-700">
              Ved at fortsætte anerkender du, at Assurly kun leverer analytisk information. 
              Vi giver ikke forsikringsrådgivning, anbefalinger eller faciliterer forsikringskøb. 
              Alle forsikringsbeslutninger forbliver udelukkende hos dig.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
}
