import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export interface CoverageAnalysis {
  coverageGaps: string[];
  improvements: string[];
  premiumOptimization: string[];
  riskAssessment: string;
  summary: string;
  impactScore?: number; // 0-100 score for conversion optimization
  issueCount?: number; // Total number of significant issues found
  severity?: 'low' | 'medium' | 'high' | 'critical'; // Overall severity level
}

export interface ExtractedInsuranceData {
  insuranceType: string; // bil, hus, indbo, rejse, sundhed
  insuranceCompany?: string;
  productName?: string;
  annualPremium?: number;
  coverageLevel?: string; // basis, medium, comprehensive
  extractedData?: any; // Additional anonymous policy details
}

export interface PolicyComparison {
  policyName: string;
  comparisonResult: {
    coverageDifferences: string[];
    priceDifference: {
      amount: number;
      percentage: number;
      description: string;
    };
    recommendation: string;
    impactScore: number; // For free tier selection
  };
}

export interface CompetitorComparison {
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

export async function analyzeInsuranceDocument(documentText: string): Promise<CoverageAnalysis> {
  try {
    const prompt = `You are a professional insurance analyst. Analyze the following insurance policy document and provide a comprehensive analysis. Focus on factual, objective analysis only - do not provide recommendations or advice.

Document text: ${documentText}

Please analyze and return a JSON response with the following structure:
{
  "coverageGaps": ["list of potential coverage gaps found"],
  "overInsurance": ["areas where coverage might be excessive"],
  "improvements": ["factual areas that could be reviewed"],
  "premiumOptimization": ["objective premium-related observations"],
  "riskAssessment": "overall risk profile assessment",
  "summary": "concise factual summary of the policy",
  "impactScore": 85,
  "issueCount": 7,
  "severity": "high"
}

Rate the "impactScore" from 0-100 based on:
- Number of significant issues (gaps, overinsurance, optimization opportunities)  
- Financial impact potential (premium savings, coverage inadequacies)
- Risk exposure level (critical gaps that could be costly)
- Customer surprise factor (issues they likely don't know about)

Set "issueCount" as total number of significant issues found.
Set "severity" as: low (0-2 issues), medium (3-5 issues), high (6-8 issues), critical (9+ issues).

Higher impact scores indicate policies that would create the most "wow" moments for customers.
Focus on factual analysis only. Do not provide advice, recommendations, or suggest specific actions.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are a professional insurance analyst providing factual document analysis only. Do not provide advice or recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result as CoverageAnalysis;
  } catch (error) {
    console.error("OpenAI analysis error:", error);
    throw new Error("Failed to analyze insurance document");
  }
}

export async function compareInsurancePolicies(
  currentPolicyText: string, 
  competitorQuoteText: string
): Promise<CompetitorComparison> {
  try {
    const prompt = `You are a professional insurance analyst. Compare these two insurance documents and provide an objective comparison. Provide factual analysis only - do not make recommendations.

Current Policy: ${currentPolicyText}

Competitor Quote: ${competitorQuoteText}

Please analyze and return a JSON response with the following structure:
{
  "priceComparison": {
    "currentPremium": number,
    "competitorPremium": number,
    "difference": number,
    "percentageDifference": number
  },
  "coverageComparison": {
    "betterCoverage": ["areas where competitor has better coverage"],
    "worseCoverage": ["areas where competitor has worse coverage"],
    "similarCoverage": ["areas with similar coverage"]
  },
  "termComparison": {
    "betterTerms": ["where competitor has better terms"],
    "worseTerms": ["where competitor has worse terms"],
    "similarTerms": ["where terms are similar"]
  },
  "recommendation": "objective factual summary of differences - no advice"
}

Provide factual comparison only. Do not suggest which policy to choose or provide purchasing advice.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are a professional insurance analyst providing objective policy comparison. Do not provide advice on which policy to select."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result as CompetitorComparison;
  } catch (error) {
    console.error("OpenAI comparison error:", error);
    throw new Error("Failed to compare insurance policies");
  }
}

export async function extractTextFromPDF(base64Data: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all text content from this insurance document. Remove any GDPR-sensitive personal information like names, addresses, phone numbers, and personal identification numbers. Return only the policy terms, coverage details, and premium information."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:application/pdf;base64,${base64Data}`
              }
            }
          ]
        }
      ],
      max_tokens: 4000
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("PDF text extraction error:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

// Multi-document comparison with strategic free tier reveal
export async function analyzeMultiplePolicies(
  documents: Array<{text: string, filename: string}>, 
  analysisType: 'free' | 'single' | 'multiple'
): Promise<{
  comparisons: PolicyComparison[];
  freePreview?: PolicyComparison; // Only the highest impact comparison for free
  conversionMessage?: string;
  hiddenCount?: number; // Number of comparisons hidden for free users
}> {
  try {
    if (!openai) {
      throw new Error("OpenAI API key is required for multi-policy analysis");
    }

    if (documents.length < 2) {
      throw new Error("At least 2 documents required for comparison");
    }

    // Assume first document is current policy, rest are offers/competitors
    const currentPolicy = documents[0];
    const competitorPolicies = documents.slice(1);

    const comparisons: PolicyComparison[] = [];

    // Analyze each competitor against current policy
    for (const competitor of competitorPolicies) {
      const comparison = await compareInsurancePolicies(currentPolicy.text, competitor.text);
      
      // Calculate impact score for conversion optimization
      const impactScore = calculateImpactScore(comparison);
      
      comparisons.push({
        policyName: competitor.filename,
        comparisonResult: {
          coverageDifferences: comparison.coverageComparison.betterCoverage.concat(
            comparison.coverageComparison.worseCoverage
          ),
          priceDifference: {
            amount: comparison.priceComparison.difference,
            percentage: comparison.priceComparison.percentageDifference,
            description: `${comparison.priceComparison.difference > 0 ? 'Dyrere' : 'Billigere'} med ${Math.abs(comparison.priceComparison.percentageDifference)}%`
          },
          analysisResult: comparison.recommendation,
          impactScore: impactScore
        }
      });
    }

    // Sort by impact score for strategic reveal
    comparisons.sort((a, b) => b.comparisonResult.impactScore - a.comparisonResult.impactScore);

    if (analysisType === 'free') {
      const topComparison = comparisons[0];
      const hiddenCount = comparisons.length - 1;
      
      const conversionMessage = generateConversionMessage(topComparison, hiddenCount);
      
      return {
        comparisons: [], // Don't return full list for free
        freePreview: topComparison,
        conversionMessage,
        hiddenCount
      };
    }

    // For paid tiers, return appropriate number of comparisons
    const maxComparisons = analysisType === 'single' ? 2 : 5;
    return {
      comparisons: comparisons.slice(0, maxComparisons)
    };

  } catch (error) {
    console.error("Multi-policy analysis error:", error);
    throw new Error("Failed to analyze multiple policies");
  }
}

function calculateImpactScore(comparison: CompetitorComparison): number {
  let score = 50; // Base score
  
  // Price impact (higher percentage difference = higher score)
  score += Math.min(Math.abs(comparison.priceComparison.percentageDifference) * 2, 30);
  
  // Coverage differences impact
  const totalDifferences = comparison.coverageComparison.betterCoverage.length + 
                          comparison.coverageComparison.worseCoverage.length;
  score += Math.min(totalDifferences * 5, 20);
  
  return Math.min(Math.round(score), 100);
}

function generateConversionMessage(topComparison: PolicyComparison, hiddenCount: number): string {
  const savingsText = topComparison.comparisonResult.priceDifference.amount < 0 
    ? `spare ${Math.abs(topComparison.comparisonResult.priceDifference.amount)} DKK årligt`
    : `undgå at betale ${topComparison.comparisonResult.priceDifference.amount} DKK ekstra`;
    
  return `Vi analyserede din ${topComparison.policyName} og fandt du kan ${savingsText}. ` +
         `Vi fandt også ${hiddenCount} andre vigtige sammenligninger - se alle for at få det komplette overblik.`;
}

// Strategic policy selection for free tier conversion optimization (legacy function - kept for compatibility)
export async function selectHighestImpactPolicyForFree(documents: Array<{text: string, filename: string}>): Promise<{
  selectedDocument: {text: string, filename: string};
  analysis: CoverageAnalysis;
  conversionMessage: string;
}> {
  try {
    if (!openai) {
      throw new Error("OpenAI API key is required for impact analysis");
    }

    // Analyze all documents to get impact scores
    const analyses = await Promise.all(
      documents.map(async (doc) => {
        const analysis = await analyzeInsuranceDocument(doc.text);
        return {
          document: doc,
          analysis,
          impactScore: analysis.impactScore || 0
        };
      })
    );

    // Sort by impact score and select the highest
    const sortedByImpact = analyses.sort((a, b) => b.impactScore - a.impactScore);
    const highestImpact = sortedByImpact[0];
    
    // Generate strategic conversion message based on findings
    const conversionPrompt = `Based on this insurance analysis with ${highestImpact.analysis.issueCount} issues found and impact score ${highestImpact.analysis.impactScore}, generate a compelling Danish conversion message that:

1. Highlights the surprising findings without being salesy
2. Creates curiosity about other policies  
3. Positions the paid analysis as valuable
4. Maintains professional tone
5. Maximum 2 sentences

Analysis summary: ${highestImpact.analysis.summary}
Issues found: ${highestImpact.analysis.issueCount}
Severity: ${highestImpact.analysis.severity}

Return JSON: {"message": "your conversion message in Danish"}`;

    const conversionResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: conversionPrompt }],
      response_format: { type: "json_object" },
    });

    const conversionResult = JSON.parse(conversionResponse.choices[0].message.content || '{}');

    return {
      selectedDocument: highestImpact.document,
      analysis: highestImpact.analysis,
      conversionMessage: conversionResult.message || "Vi fandt flere interessante områder der kan optimeres i denne police. Hvad mon der gemmer sig i dine andre forsikringer?"
    };

  } catch (error: any) {
    console.error("Impact selection error:", error);
    throw new Error("Failed to select highest impact policy: " + error.message);
  }
}

// Extract GDPR-compliant anonymous insurance data from document text
export async function extractInsuranceData(documentText: string): Promise<ExtractedInsuranceData> {
  try {
    if (!openai) {
      console.warn("OpenAI not available - returning default insurance data");
      return {
        insuranceType: "bil", // Default fallback
        insuranceCompany: undefined,
        productName: undefined,
        annualPremium: undefined,
        coverageLevel: undefined,
        extractedData: undefined
      };
    }

    const prompt = `Ekstrahér anonyme forsikringsdata fra denne forsikringsdokument tekst. Returner KUN datastrukturen uden personlige oplysninger.

VIGTIG: Medtag IKKE navn, adresse, telefonnummer, fødselsdato eller andre personlige identifikatorer.

Tekst: ${documentText}

Returner JSON i dette format:
{
  "insuranceType": "bil|hus|indbo|rejse|sundhed",
  "insuranceCompany": "selskabsnavn (hvis synligt)",
  "productName": "produktnavn (hvis synligt)",
  "annualPremium": nummer_eller_null,
  "coverageLevel": "basis|medium|comprehensive|null",
  "extractedData": {
    "deductible": "selvrisiko beløb",
    "coverageDetails": ["dækningsområder"],
    "policyFeatures": ["specielle features"]
  }
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Du er en ekspert i forsikringsdata extraction. Ekstrahér kun anonyme, strukturerede data. Inkludér ALDRIG personlige identifikatorer."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000
    });

    const extractedData = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      insuranceType: extractedData.insuranceType || "bil",
      insuranceCompany: extractedData.insuranceCompany || undefined,
      productName: extractedData.productName || undefined,
      annualPremium: extractedData.annualPremium || undefined,
      coverageLevel: extractedData.coverageLevel || undefined,
      extractedData: extractedData.extractedData || undefined
    };

  } catch (error) {
    console.error("Insurance data extraction error:", error);
    // Return safe fallback data
    return {
      insuranceType: "bil",
      insuranceCompany: undefined,
      productName: undefined,
      annualPremium: undefined,
      coverageLevel: undefined,
      extractedData: undefined
    };
  }
}
