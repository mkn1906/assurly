import { InsuranceReportMockup } from "@/components/insurance-report-mockup";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Image } from "lucide-react";
import { Link } from "wouter";
import html2canvas from "html2canvas";
import { useRef } from "react";

export default function DemoReport() {
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDownloadPNG = async () => {
    if (!reportRef.current) return;
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        height: reportRef.current.scrollHeight,
        width: reportRef.current.scrollWidth
      });
      
      const link = document.createElement('a');
      link.download = 'assurly-insurance-report.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Der opstod en fejl ved generering af billedet. Prøv venligst igen.');
    }
  };

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate a PDF
    alert("PDF download functionality would be implemented here");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm border-b print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Tilbage til forsiden
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <Button onClick={handlePrint} variant="outline" size="sm">
                Print rapport
              </Button>
              <Button onClick={handleDownloadPNG} variant="outline" size="sm" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Download PNG
              </Button>
              <Button onClick={handleDownloadPDF} size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="bg-blue-50 border-b border-blue-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center">
            <div className="bg-blue-100 border border-blue-300 rounded-lg px-4 py-2">
              <p className="text-blue-800 text-sm font-medium">
                🎬 Dette er en demo-rapport til kommerciel video - ikke en rigtig kundeanalyse
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="py-8" ref={reportRef}>
        <InsuranceReportMockup />
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { margin: 0; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}