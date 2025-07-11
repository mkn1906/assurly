import { MailService } from '@sendgrid/mail';

const mailService = process.env.SENDGRID_API_KEY ? new MailService() : null;
if (mailService && process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!mailService) {
    console.warn('SendGrid not configured - email sending disabled');
    return false;
  }
  
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendAnalysisReport(
  email: string, 
  analysisData: any, 
  comparisonData?: any
): Promise<boolean> {
  const subject = "Your Insurance Policy Analysis Report - Assurly.io";
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Insurance Analysis Report</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
            .disclaimer { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .section { margin: 20px 0; padding: 15px; border-left: 4px solid #1e40af; }
            .footer { font-size: 12px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Insurance Policy Analysis Report</h1>
                <p>Professional Document Analysis • Information Only</p>
            </div>
            
            <div class="disclaimer">
                <strong>Important Legal Notice:</strong> This report provides analytical information only. We do not rank, sell, recommend, or facilitate insurance purchases. All insurance decisions remain entirely with you. Consult licensed insurance professionals for advice.
            </div>

            <div class="section">
                <h2>Coverage Analysis Summary</h2>
                <p><strong>Risk Assessment:</strong> ${analysisData?.riskAssessment || 'N/A'}</p>
                <p>${analysisData?.summary || 'Analysis not available'}</p>
            </div>

            ${analysisData?.coverageGaps?.length > 0 ? `
            <div class="section">
                <h3>Potential Coverage Gaps</h3>
                <ul>
                    ${analysisData.coverageGaps.map((gap: string) => `<li>${gap}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            ${analysisData?.overInsurance?.length > 0 ? `
            <div class="section">
                <h3>Potential Over-Insurance Areas</h3>
                <ul>
                    ${analysisData.overInsurance.map((item: string) => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            ${comparisonData ? `
            <div class="section">
                <h2>Competitor Comparison</h2>
                <p><strong>Premium Difference:</strong> ${comparisonData.priceComparison?.difference || 'N/A'} (${comparisonData.priceComparison?.percentageDifference || 'N/A'}%)</p>
                <p><strong>Analysis:</strong> ${comparisonData.recommendation || 'No comparison data available'}</p>
            </div>
            ` : ''}

            <div class="footer">
                <p><strong>Assurly.io</strong> - Professional Insurance Document Analysis</p>
                <p>This is an automated analysis tool. Results are for informational purposes only.</p>
                <p>We do not provide insurance advice or facilitate insurance sales.</p>
                <p>© 2025 Assurly.io. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;

  const textContent = `
    INSURANCE POLICY ANALYSIS REPORT
    ================================
    
    IMPORTANT: This report provides analytical information only. We do not provide insurance advice.
    
    Coverage Analysis Summary:
    ${analysisData?.summary || 'Analysis not available'}
    
    Risk Assessment: ${analysisData?.riskAssessment || 'N/A'}
    
    ${analysisData?.coverageGaps?.length > 0 ? `
    Potential Coverage Gaps:
    ${analysisData.coverageGaps.map((gap: string) => `- ${gap}`).join('\n')}
    ` : ''}
    
    ${comparisonData ? `
    Competitor Comparison:
    Premium Difference: ${comparisonData.priceComparison?.difference || 'N/A'} (${comparisonData.priceComparison?.percentageDifference || 'N/A'}%)
    Analysis: ${comparisonData.recommendation || 'No comparison data available'}
    ` : ''}
    
    ---
    Assurly.io - Professional Insurance Document Analysis
    This is an automated analysis tool. Results are for informational purposes only.
    © 2025 Assurly.io. All rights reserved.
  `;

  return await sendEmail({
    to: email,
    from: "reports@assurly.io",
    subject,
    html: htmlContent,
    text: textContent
  });
}
