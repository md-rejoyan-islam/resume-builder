import { AIExtractionService, PDFService } from '../ai';
import { CoverLetterService } from './cover-letter.service';

// Cover Letter Format Schema for OpenAI

const COVER_LETTER_SCHEMA = `{
  "personalInfo": {
    "fullName": "string (required - full name of the applicant)",
    "jobTitle": "string (professional title/position)",
    "email": "string (required - email address)",
    "phone": "string (phone number)",
    "location": "string (city, state/country)"
  },
  "letterContent": {
    "date": "string (date of the letter, format: Month Day, Year)",
    "recipientName": "string (name of the hiring manager or recipient)",
    "recipientTitle": "string (title/position of the recipient)",
    "company": "string (company name)",
    "address": "string (company address)",
    "salutation": "string (e.g., 'Dear')",
    "greeting": "string (opening line expressing interest in position)",
    "bodyParagraph1": "string (first body paragraph - qualifications and interest)",
    "bodyParagraph2": "string (second body paragraph - relevant experience and skills)",
    "bodyParagraph3": "string (third body paragraph - specific achievements or fit)",
    "closingParagraph": "string (closing paragraph - call to action, thank you)",
    "closing": "string (e.g., 'Sincerely,' or 'Best regards,')"
  }
}`;

const COVER_LETTER_SYSTEM_PROMPT = `You are an expert cover letter parser. Your task is to extract ALL information from the provided cover letter text and structure it according to the exact JSON schema provided.

IMPORTANT RULES:
1. Extract EVERY piece of information from the cover letter - do not miss anything
2. For the date, use the format "Month Day, Year" (e.g., "January 15, 2024")
3. Keep paragraphs as plain text, preserving the original content
4. If a field is not present in the cover letter, use an empty string
5. The greeting should be the opening sentence/line after the salutation
6. Body paragraphs should be the main content paragraphs
7. Closing paragraph is typically the thank you/call to action before the sign-off
8. Return ONLY valid JSON, no markdown code blocks or explanations`;

export class CoverLetterPdfService {
  /**
   * Extract text from PDF buffer
   */
  static async extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
    return PDFService.extractText(pdfBuffer);
  }

  /**
   * Use OpenAI to extract structured cover letter data from text
   */
  static async extractCoverLetterDataWithAI(
    pdfText: string,
  ): Promise<Record<string, unknown>> {
    const parsedData = await AIExtractionService.extractStructuredData({
      schema: COVER_LETTER_SCHEMA,
      systemPrompt: COVER_LETTER_SYSTEM_PROMPT,
      content: `Please extract all information from this cover letter and return it as JSON:\n\n${pdfText}`,
      maxTokens: 2048,
    });

    return this.validateAndNormalizeData(parsedData);
  }

  /**
   * Validate and normalize extracted data to ensure it matches our schema
   */
  private static validateAndNormalizeData(
    data: Record<string, unknown>,
  ): Record<string, unknown> {
    // Ensure personalInfo has required fields
    const personalInfo = (data.personalInfo as Record<string, unknown>) || {};
    const normalizedPersonalInfo = {
      fullName: personalInfo.fullName || '',
      jobTitle: personalInfo.jobTitle || '',
      email: personalInfo.email || '',
      phone: personalInfo.phone || '',
      location: personalInfo.location || '',
    };

    // Ensure letterContent has required fields
    const letterContent = (data.letterContent as Record<string, unknown>) || {};
    const normalizedLetterContent = {
      date:
        letterContent.date ||
        new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      recipientName: letterContent.recipientName || '',
      recipientTitle: letterContent.recipientTitle || '',
      company: letterContent.company || '',
      address: letterContent.address || '',
      salutation: letterContent.salutation || 'Dear',
      greeting: letterContent.greeting || '',
      bodyParagraph1: letterContent.bodyParagraph1 || '',
      bodyParagraph2: letterContent.bodyParagraph2 || '',
      bodyParagraph3: letterContent.bodyParagraph3 || '',
      closingParagraph: letterContent.closingParagraph || '',
      closing: letterContent.closing || 'Sincerely,',
    };

    return {
      personalInfo: normalizedPersonalInfo,
      letterContent: normalizedLetterContent,
    };
  }

  /**
   * Process PDF upload: extract text, parse with AI, save to database
   */
  static async processAndCreateCoverLetter(
    userId: string,
    pdfBuffer: Buffer,
    originalFilename: string,
  ): Promise<{ _id: string }> {
    // Step 1: Extract text from PDF
    const pdfText = await this.extractTextFromPdf(pdfBuffer);

    // Step 2: Validate text content
    PDFService.validateTextContent(
      pdfText,
      30,
      'The PDF appears to be empty or contains too little text to extract cover letter data.',
    );

    // Step 3: Use AI to extract structured data
    const coverLetterData = await this.extractCoverLetterDataWithAI(pdfText);

    // Step 4: Generate title from extracted data
    const personalInfo = coverLetterData.personalInfo as Record<string, string>;
    const letterContent = coverLetterData.letterContent as Record<
      string,
      string
    >;
    const title =
      personalInfo.fullName && letterContent.company
        ? `${personalInfo.fullName} - ${letterContent.company}`
        : originalFilename.replace(/\.pdf$/i, '') || 'Imported Cover Letter';

    // Step 5: Determine status based on content
    const hasContent =
      letterContent.greeting &&
      letterContent.bodyParagraph1 &&
      letterContent.closingParagraph;
    const status = hasContent ? 'completed' : 'draft';

    // Step 6: Save to database using existing CoverLetterService
    const result = await CoverLetterService.create(userId, {
      title,
      status,
      ...coverLetterData,
    } as Parameters<typeof CoverLetterService.create>[1]);

    return { _id: result._id.toString() };
  }
}
