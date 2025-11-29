import { AIExtractionService, PDFService } from '../ai';
import { DisclosureLetterService } from './disclosure-letter.service';

// Disclosure Letter Format Schema for OpenAI

const DISCLOSURE_LETTER_SCHEMA = `{
  "disclosureType": "string (one of: 'criminal', 'financial', 'medical', 'employment', 'other' - determine based on content)",
  "personalInfo": {
    "fullName": "string (required - full name of the person making the disclosure)",
    "jobTitle": "string (professional title/position if mentioned)",
    "email": "string (email address)",
    "phone": "string (phone number)",
    "location": "string (address or city, state/country)"
  },
  "disclosureContent": {
    "date": "string (date of the letter, format: Month Day, Year)",
    "recipientName": "string (name of the person/organization receiving the disclosure)",
    "recipientTitle": "string (title/position of the recipient)",
    "company": "string (organization/company name)",
    "address": "string (recipient's address)",
    "subject": "string (subject line of the disclosure)",
    "salutation": "string (e.g., 'Dear', 'To Whom It May Concern')",
    "introductionParagraph": "string (introduction explaining purpose of disclosure)",
    "disclosureDetails": "string (main content detailing what is being disclosed)",
    "relevantCircumstances": "string (context or explanation for the disclosure)",
    "mitigatingFactors": "string (steps taken to address/resolve the issue if applicable)",
    "closingStatement": "string (closing remarks, availability for questions)",
    "closing": "string (e.g., 'Sincerely,' or 'Respectfully,')",
    "supportingDocuments": "string (list of any attached documents mentioned)"
  }
}`;

const DISCLOSURE_LETTER_SYSTEM_PROMPT = `You are an expert disclosure letter parser. Your task is to extract ALL information from the provided disclosure letter text and structure it according to the exact JSON schema provided.

IMPORTANT RULES:
1. Extract EVERY piece of information from the disclosure letter - do not miss anything
2. For the date, use the format "Month Day, Year" (e.g., "January 15, 2024")
3. Keep paragraphs as plain text, preserving the original content
4. If a field is not present in the disclosure letter, use an empty string
5. Determine the disclosureType based on the content:
   - 'criminal' for criminal record, conviction, arrest disclosures
   - 'financial' for bankruptcy, debt, credit history disclosures
   - 'medical' for health conditions, disability disclosures
   - 'employment' for previous employment issues, terminations
   - 'other' for any other type of disclosure
6. The opening paragraph should explain why the disclosure is being made
7. Disclosure details should contain the main facts being disclosed
8. Context paragraph provides background or circumstances
9. Mitigation paragraph describes any remediation or lessons learned
10. Return ONLY valid JSON, no markdown code blocks or explanations`;

export class DisclosureLetterPdfService {
  /**
   * Extract text from PDF buffer
   */
  static async extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
    return PDFService.extractText(pdfBuffer);
  }

  /**
   * Use OpenAI to extract structured disclosure letter data from text
   */
  static async extractDisclosureLetterDataWithAI(
    pdfText: string,
  ): Promise<Record<string, unknown>> {
    const parsedData = await AIExtractionService.extractStructuredData({
      schema: DISCLOSURE_LETTER_SCHEMA,
      systemPrompt: DISCLOSURE_LETTER_SYSTEM_PROMPT,
      content: `Please extract all information from this disclosure letter and return it as JSON:\n\n${pdfText}`,
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
    // Validate disclosure type
    const validTypes = ['criminal', 'financial', 'medical', 'employment', 'other'];
    const disclosureType = validTypes.includes(data.disclosureType as string)
      ? data.disclosureType
      : 'other';

    // Ensure personalInfo has required fields
    const personalInfo = (data.personalInfo as Record<string, unknown>) || {};
    const normalizedPersonalInfo = {
      fullName: personalInfo.fullName || '',
      jobTitle: personalInfo.jobTitle || '',
      email: personalInfo.email || '',
      phone: personalInfo.phone || '',
      location: personalInfo.location || '',
    };

    // Ensure disclosureContent has required fields
    const disclosureContent =
      (data.disclosureContent as Record<string, unknown>) || {};
    const normalizedDisclosureContent = {
      date:
        disclosureContent.date ||
        new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      recipientName: disclosureContent.recipientName || '',
      recipientTitle: disclosureContent.recipientTitle || '',
      company: disclosureContent.company || '',
      address: disclosureContent.address || '',
      subject: disclosureContent.subject || '',
      salutation: disclosureContent.salutation || 'Dear',
      introductionParagraph: disclosureContent.introductionParagraph || '',
      disclosureDetails: disclosureContent.disclosureDetails || '',
      relevantCircumstances: disclosureContent.relevantCircumstances || '',
      mitigatingFactors: disclosureContent.mitigatingFactors || '',
      closingStatement: disclosureContent.closingStatement || '',
      closing: disclosureContent.closing || 'Sincerely,',
      supportingDocuments: disclosureContent.supportingDocuments || '',
    };

    return {
      disclosureType,
      personalInfo: normalizedPersonalInfo,
      disclosureContent: normalizedDisclosureContent,
    };
  }

  /**
   * Process PDF upload: extract text, parse with AI, save to database
   */
  static async processAndCreateDisclosureLetter(
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
      'The PDF appears to be empty or contains too little text to extract disclosure letter data.',
    );

    // Step 3: Use AI to extract structured data
    const disclosureLetterData =
      await this.extractDisclosureLetterDataWithAI(pdfText);

    // Step 4: Generate title from extracted data
    const personalInfo = disclosureLetterData.personalInfo as Record<
      string,
      string
    >;
    const disclosureContent = disclosureLetterData.disclosureContent as Record<
      string,
      string
    >;
    const disclosureType = disclosureLetterData.disclosureType as string;

    const typeLabel =
      disclosureType.charAt(0).toUpperCase() + disclosureType.slice(1);
    const title =
      personalInfo.fullName && disclosureContent.company
        ? `${personalInfo.fullName} - ${typeLabel} Disclosure to ${disclosureContent.company}`
        : personalInfo.fullName
          ? `${personalInfo.fullName} - ${typeLabel} Disclosure`
          : originalFilename.replace(/\.pdf$/i, '') ||
            'Imported Disclosure Letter';

    // Step 5: Determine status based on content
    const hasContent =
      disclosureContent.introductionParagraph &&
      disclosureContent.disclosureDetails &&
      disclosureContent.closingStatement;
    const status = hasContent ? 'completed' : 'draft';

    // Step 6: Save to database using existing DisclosureLetterService
    const result = await DisclosureLetterService.create(userId, {
      title,
      status,
      ...disclosureLetterData,
    } as Parameters<typeof DisclosureLetterService.create>[1]);

    return { _id: result._id.toString() };
  }
}
