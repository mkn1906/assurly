import { extractTextFromPDF } from './openai.js';

export interface ProcessedDocument {
  text: string;
  documentType: 'current_policy' | 'competitor_quote';
  metadata: {
    filename: string;
    size: number;
    pageCount?: number;
  };
}

export async function processDocument(
  buffer: Buffer, 
  filename: string, 
  mimeType: string
): Promise<ProcessedDocument> {
  try {
    let text = "";
    
    if (mimeType === 'application/pdf') {
      const base64Data = buffer.toString('base64');
      text = await extractTextFromPDF(base64Data);
    } else if (mimeType.includes('text/') || mimeType.includes('document')) {
      text = buffer.toString('utf-8');
    } else {
      throw new Error(`Unsupported file type: ${mimeType}`);
    }

    // Determine document type based on content
    const documentType = detectDocumentType(text, filename);

    return {
      text,
      documentType,
      metadata: {
        filename,
        size: buffer.length,
      }
    };
  } catch (error) {
    console.error("Document processing error:", error);
    throw new Error(`Failed to process document: ${filename}`);
  }
}

function detectDocumentType(text: string, filename: string): 'current_policy' | 'competitor_quote' {
  const lowerText = text.toLowerCase();
  const lowerFilename = filename.toLowerCase();
  
  // Keywords that might indicate a competitor quote
  const quoteKeywords = ['quote', 'quotation', 'estimate', 'proposal', 'offer'];
  const policyKeywords = ['policy', 'certificate', 'coverage', 'current'];
  
  // Check filename first
  if (quoteKeywords.some(keyword => lowerFilename.includes(keyword))) {
    return 'competitor_quote';
  }
  
  if (policyKeywords.some(keyword => lowerFilename.includes(keyword))) {
    return 'current_policy';
  }
  
  // Check content
  if (quoteKeywords.some(keyword => lowerText.includes(keyword))) {
    return 'competitor_quote';
  }
  
  // Default to current policy
  return 'current_policy';
}

export function validateFileUpload(file: Express.Multer.File): boolean {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

  if (file.size > maxSize) {
    throw new Error('File size exceeds 10MB limit');
  }

  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error('File type not supported. Please upload PDF, DOC, DOCX, or TXT files.');
  }

  return true;
}

export function calculateRetentionDate(subscriptionTier: string): Date | null {
  const now = new Date();
  
  switch (subscriptionTier) {
    case 'free':
      return null; // Session only - no retention
    case 'single':
    case 'multiple':
      // 30 days retention
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    case 'annual':
      return null; // Permanent storage while subscription active
    default:
      return null;
  }
}
