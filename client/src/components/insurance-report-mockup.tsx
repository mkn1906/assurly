import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, TrendingDown, TrendingUp } from "lucide-react";

export function InsuranceReportMockup() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Assurly.io</h1>
          <p className="text-gray-600 mt-1">Komplet Forsikringsanalyse Rapport</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Rapport dato: 1. juli 2025</p>
          <p className="text-sm text-gray-500">Kunde ID: DK-2025-7841</p>
        </div>
      </div>

      {/* Executive Summary */}
      <Card className="mb-6 border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Samlet Analyse Resultat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">23</div>
              <div className="text-sm text-gray-600">Dækningshuller</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2.847 DKK</div>
              <div className="text-sm text-gray-600">Mulig besparelse/år</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">89%</div>
              <div className="text-sm text-gray-600">Dækningsgrad</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">Høj</div>
              <div className="text-sm text-gray-600">Risiko niveau</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policy Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Indboforsikring */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🏠 Indboforsikring</CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary">Nuværende: Tryg</Badge>
              <Badge variant="outline">Markedspris: If</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Nuværende præmie:</span>
              <span className="font-semibold">3.240 DKK/år</span>
            </div>
            <div className="flex justify-between">
              <span>Markedspris:</span>
              <span className="font-semibold text-green-600">2.890 DKK/år</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Prisforskel:</span>
              <span className="font-bold text-green-600 flex items-center gap-1">
                <TrendingDown className="h-4 w-4" />
                350 DKK/år
              </span>
            </div>
            <div className="text-sm text-orange-600">
              ⚠️ Manglende dækning: Cykeltyveriforsikring
            </div>
          </CardContent>
        </Card>

        {/* Bilforsikring */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🚗 Bilforsikring</CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary">Nuværende: Alka</Badge>
              <Badge variant="outline">Markedspris: Codan</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Nuværende præmie:</span>
              <span className="font-semibold">8.920 DKK/år</span>
            </div>
            <div className="flex justify-between">
              <span>Markedspris:</span>
              <span className="font-semibold text-green-600">7.650 DKK/år</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Prisforskel:</span>
              <span className="font-bold text-green-600 flex items-center gap-1">
                <TrendingDown className="h-4 w-4" />
                1.270 DKK/år
              </span>
            </div>
            <div className="text-sm text-green-600">
              ✅ God dækning identificeret
            </div>
          </CardContent>
        </Card>

        {/* Husforsikring */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🏡 Husforsikring</CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary">Nuværende: TopDanmark</Badge>
              <Badge variant="outline">Markedspris: Tryg</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Nuværende præmie:</span>
              <span className="font-semibold">4.580 DKK/år</span>
            </div>
            <div className="flex justify-between">
              <span>Markedspris:</span>
              <span className="font-semibold text-green-600">3.850 DKK/år</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Prisforskel:</span>
              <span className="font-bold text-green-600 flex items-center gap-1">
                <TrendingDown className="h-4 w-4" />
                730 DKK/år
              </span>
            </div>
            <div className="text-sm text-red-600">
              🚨 Kritisk: Mangler rørskadedækning
            </div>
          </CardContent>
        </Card>

        {/* Ulykkeforsikring */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🩹 Ulykkeforsikring</CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary">Nuværende: GF Forsikring</Badge>
              <Badge variant="outline">Markedspris: If</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Nuværende præmie:</span>
              <span className="font-semibold">1.890 DKK/år</span>
            </div>
            <div className="flex justify-between">
              <span>Markedspris:</span>
              <span className="font-semibold text-green-600">1.393 DKK/år</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Prisforskel:</span>
              <span className="font-bold text-green-600 flex items-center gap-1">
                <TrendingDown className="h-4 w-4" />
                497 DKK/år
              </span>
            </div>
            <div className="text-sm text-orange-600">
              ⚠️ Manglende dækning: Tandskadedækning
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coverage Analysis Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-500" />
            Dækningsanalyse Oversigt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <div className="font-semibold text-red-700">Identificeret: Husforsikring</div>
                <div className="text-sm text-red-600">
                  Analyse viser manglende rørskadedækning i nuværende police.
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <TrendingDown className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <div className="font-semibold text-yellow-700">Prissammenligning: Bilforsikring</div>
                <div className="text-sm text-yellow-600">
                  Markedsanalyse viser 1.270 DKK årlig prisforskel til sammenlignelige produkter.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <div className="font-semibold text-blue-700">Markedsdata: Bundling</div>
                <div className="text-sm text-blue-600">
                  Brancheanalyse viser gennemsnitlige rabatsatser på 8% for sammenlignelige produktpakker.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="border-t pt-6 text-center text-sm text-gray-500">
        <p>Denne rapport er genereret af Assurly.io AI-analysesystem</p>
        <p>Kontakt os på info@assurly.io for spørgsmål om denne rapport</p>
        <p className="mt-2 text-xs">
          Disclaimer: Denne analyse er udelukkende til information. Assurly.io sælger ikke forsikringer og påtager sig intet ansvar for forsikringsvalg.
        </p>
      </div>
    </div>
  );
}