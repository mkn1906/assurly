import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Users, Mail, Filter, Send, Eye, Calendar, Percent, Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

interface Customer {
  id: number;
  email: string;
  analysisType: string;
  createdAt: string;
  policiesUploaded: number;
  lastAnalysis: string;
}

interface EmailCampaign {
  subject: string;
  content: string;
  recipients: string[];
  insuranceType?: string;
  scheduledFor?: string;
}

interface DiscountCode {
  id: number;
  code: string;
  discountPercentage: string;
  description: string | null;
  isActive: boolean | null;
  createdAt: string;
  createdBy: number | null;
}

interface DiscountUsage {
  id: number;
  userId: number | null;
  discountCodeId: number;
  paymentId: number;
  originalAmount: string;
  discountAmount: string;
  finalAmount: string;
  usedAt: string;
  code: string;
  description?: string;
}

export default function AdminPanel() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"customers" | "discounts">("customers");
  
  // Customer and email states
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [campaign, setCampaign] = useState<EmailCampaign>({
    subject: "",
    content: "",
    recipients: []
  });

  // Discount code states
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [discountUsage, setDiscountUsage] = useState<DiscountUsage[]>([]);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [newDiscount, setNewDiscount] = useState({
    code: "",
    discountPercentage: "",
    description: ""
  });

  // Load data on component mount
  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      
      // Load customers
      const customersResponse = await apiRequest("GET", "/api/admin/customers");
      const customersData = await customersResponse.json();
      setCustomers(customersData);

      // Load discount codes
      const discountResponse = await apiRequest("GET", "/api/admin/discount-codes");
      const discountData = await discountResponse.json();
      setDiscountCodes(discountData);

      // Load discount usage
      const usageResponse = await apiRequest("GET", "/api/admin/discount-usage");
      const usageData = await usageResponse.json();
      setDiscountUsage(usageData);

    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke hente admin data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Customer filtering
  const filteredCustomers = customers.filter(customer => {
    if (filterType === "all") return true;
    return customer.analysisType === filterType;
  });

  const selectAllFiltered = () => {
    const emails = filteredCustomers.map(c => c.email);
    setSelectedCustomers(emails);
  };

  const clearSelection = () => {
    setSelectedCustomers([]);
  };

  // Send email campaign
  const sendCampaign = async () => {
    if (!campaign.subject.trim() || !campaign.content.trim()) {
      toast({
        title: "Fejl",
        description: "Emne og indhold skal udfyldes",
        variant: "destructive",
      });
      return;
    }

    if (selectedCustomers.length === 0) {
      toast({
        title: "Fejl", 
        description: "Vælg mindst én modtager",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiRequest("POST", "/api/admin/send-campaign", {
        ...campaign,
        recipients: selectedCustomers,
      });

      toast({
        title: "E-mail kampagne sendt!",
        description: `Sendt til ${selectedCustomers.length} kunder`,
      });

      // Reset form
      setCampaign({ subject: "", content: "", recipients: [] });
      setSelectedCustomers([]);
      setPreviewMode(false);
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke sende e-mail kampagne",
        variant: "destructive",
      });
    }
  };

  // Discount Code Management Functions
  const createDiscountCode = async () => {
    if (!newDiscount.code || !newDiscount.discountPercentage) {
      toast({
        title: "Fejl",
        description: "Rabatkode og procentsats er påkrævet",
        variant: "destructive",
      });
      return;
    }

    const percentage = parseFloat(newDiscount.discountPercentage);
    if (percentage <= 0 || percentage > 100) {
      toast({
        title: "Fejl",
        description: "Procentsats skal være mellem 1 og 100",
        variant: "destructive",
      });
      return;
    }

    setDiscountLoading(true);
    try {
      await apiRequest("POST", "/api/admin/discount-codes", newDiscount);
      
      toast({
        title: "Rabatkode oprettet!",
        description: `Rabatkode "${newDiscount.code}" er oprettet`,
      });

      // Reset form and reload data
      setNewDiscount({ code: "", discountPercentage: "", description: "" });
      const response = await apiRequest("GET", "/api/admin/discount-codes");
      const discountData = await response.json();
      setDiscountCodes(discountData);
    } catch (error: any) {
      toast({
        title: "Fejl",
        description: "Kunne ikke oprette rabatkode",
        variant: "destructive",
      });
    } finally {
      setDiscountLoading(false);
    }
  };

  const toggleDiscountStatus = async (id: number, isActive: boolean) => {
    try {
      await apiRequest("PATCH", `/api/admin/discount-codes/${id}/status`, { isActive });
      
      toast({
        title: "Status opdateret",
        description: `Rabatkode er nu ${isActive ? "aktiv" : "inaktiv"}`,
      });

      // Update local state
      setDiscountCodes(prev => 
        prev.map(code => 
          code.id === id ? { ...code, isActive } : code
        )
      );
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke opdatere status",
        variant: "destructive",
      });
    }
  };

  const deleteDiscountCode = async (id: number) => {
    if (!confirm("Er du sikker på at du vil slette denne rabatkode?")) {
      return;
    }

    try {
      await apiRequest("DELETE", `/api/admin/discount-codes/${id}`);
      
      toast({
        title: "Rabatkode slettet",
        description: "Rabatkoden er permanent slettet",
      });

      // Update local state
      setDiscountCodes(prev => prev.filter(code => code.id !== id));
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke slette rabatkode",
        variant: "destructive",
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-trust-blue border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-text mb-2">Admin Panel</h1>
          <p className="text-professional-gray">Administrer kunder, kampagner og rabatkoder</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === "customers" ? "default" : "ghost"}
            onClick={() => setActiveTab("customers")}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Kunder & Kampagner</span>
          </Button>
          <Button
            variant={activeTab === "discounts" ? "default" : "ghost"}
            onClick={() => setActiveTab("discounts")}
            className="flex items-center space-x-2"
          >
            <Percent className="h-4 w-4" />
            <span>Rabatkoder</span>
          </Button>
        </div>

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Customer Management */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Kunder ({filteredCustomers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Filter Controls */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrer efter type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle kunder</SelectItem>
                        <SelectItem value="bil">Bilforsikring</SelectItem>
                        <SelectItem value="hus">Husforsikring</SelectItem>
                        <SelectItem value="indbo">Indboforsikring</SelectItem>
                        <SelectItem value="rejse">Rejseforsikring</SelectItem>
                        <SelectItem value="sundhed">Sundhedsforsikring</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button onClick={selectAllFiltered} variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      Vælg alle ({filteredCustomers.length})
                    </Button>
                    
                    <Button onClick={clearSelection} variant="outline" size="sm">
                      Ryd valg
                    </Button>
                  </div>

                  {/* Selected Count */}
                  {selectedCustomers.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-blue-800 text-sm">
                        <strong>{selectedCustomers.length}</strong> kunder valgt til e-mail kampagne
                      </p>
                    </div>
                  )}

                  {/* Customer List */}
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredCustomers.map((customer) => (
                      <div key={customer.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-3"
                              checked={selectedCustomers.includes(customer.email)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCustomers([...selectedCustomers, customer.email]);
                                } else {
                                  setSelectedCustomers(selectedCustomers.filter(email => email !== customer.email));
                                }
                              }}
                            />
                            <div>
                              <p className="font-medium text-dark-text">{customer.email}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline">{customer.analysisType}</Badge>
                                <span className="text-xs text-professional-gray">
                                  {customer.policiesUploaded} dokumenter • {new Date(customer.createdAt).toLocaleDateString('da-DK')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Email Campaign Management */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    E-mail Kampagne
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Emne</Label>
                    <Input
                      id="subject"
                      placeholder="f.eks. Ny rabat på forsikringsanalyse"
                      value={campaign.subject}
                      onChange={(e) => setCampaign({...campaign, subject: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content">Indhold</Label>
                    <Textarea
                      id="content"
                      placeholder="Skriv din e-mail besked her..."
                      rows={8}
                      value={campaign.content}
                      onChange={(e) => setCampaign({...campaign, content: e.target.value})}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      onClick={sendCampaign}
                      disabled={selectedCustomers.length === 0 || !campaign.subject || !campaign.content}
                      className="flex-1"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send til {selectedCustomers.length} kunder
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Forhåndsvisning
                    </Button>
                  </div>

                  {previewMode && campaign.subject && campaign.content && (
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="font-semibold mb-2">Forhåndsvisning:</h4>
                      <div className="bg-white p-4 rounded border">
                        <h5 className="font-bold mb-2">Emne: {campaign.subject}</h5>
                        <div className="whitespace-pre-wrap text-sm">{campaign.content}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>GDPR Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-blue-800 mb-2">GDPR Information</h4>
                  <p className="text-sm text-blue-700">
                    Alle kunder har accepteret at modtage marketing e-mails som del af tjenesten. 
                    De kan til enhver tid framelde sig via linket i bunden af hver e-mail.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Discount Codes Tab */}
        {activeTab === "discounts" && (
          <div className="space-y-6">
            {/* Create New Discount Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Opret Ny Rabatkode
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="code">Rabatkode</Label>
                    <Input
                      id="code"
                      placeholder="f.eks. PARTNER20"
                      value={newDiscount.code}
                      onChange={(e) => setNewDiscount({...newDiscount, code: e.target.value.toUpperCase()})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="percentage">Rabat (%)</Label>
                    <Input
                      id="percentage"
                      type="number"
                      min="1"
                      max="100"
                      placeholder="f.eks. 15"
                      value={newDiscount.discountPercentage}
                      onChange={(e) => setNewDiscount({...newDiscount, discountPercentage: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Beskrivelse</Label>
                    <Input
                      id="description"
                      placeholder="f.eks. Partner rabat"
                      value={newDiscount.description}
                      onChange={(e) => setNewDiscount({...newDiscount, description: e.target.value})}
                    />
                  </div>
                </div>
                <Button 
                  onClick={createDiscountCode}
                  disabled={discountLoading}
                  className="w-full md:w-auto"
                >
                  {discountLoading ? "Opretter..." : "Opret Rabatkode"}
                </Button>
              </CardContent>
            </Card>

            {/* Existing Discount Codes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Percent className="h-5 w-5 mr-2" />
                  Eksisterende Rabatkoder ({discountCodes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {discountCodes.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Ingen rabatkoder oprettet endnu</p>
                  ) : (
                    discountCodes.map((code) => (
                      <div key={code.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="font-mono">{code.code}</Badge>
                            <Badge variant="secondary">{code.discountPercentage}% rabat</Badge>
                            {code.isActive ? (
                              <Badge className="bg-green-100 text-green-800">Aktiv</Badge>
                            ) : (
                              <Badge variant="destructive">Inaktiv</Badge>
                            )}
                          </div>
                          {code.description && (
                            <p className="text-sm text-gray-600 mt-1">{code.description}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            Oprettet: {new Date(code.createdAt).toLocaleDateString('da-DK')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleDiscountStatus(code.id, !code.isActive)}
                          >
                            {code.isActive ? (
                              <ToggleRight className="h-4 w-4 text-green-600" />
                            ) : (
                              <ToggleLeft className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteDiscountCode(code.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            {discountUsage.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Rabatkode Anvendelse ({discountUsage.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {discountUsage.map((usage) => (
                      <div key={usage.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <Badge variant="outline" className="font-mono mb-1">{usage.code}</Badge>
                          <p className="text-sm text-gray-600">
                            Oprindelig pris: {usage.originalAmount} DKK • 
                            Rabat: -{usage.discountAmount} DKK • 
                            Slutpris: {usage.finalAmount} DKK
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {new Date(usage.usedAt).toLocaleDateString('da-DK')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}