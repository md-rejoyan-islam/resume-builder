import createError from 'http-errors';
import { PDFParse } from 'pdf-parse';

/**
 * PDF Service
 * Single source of truth for PDF text extraction
 */
class PDFService {
  /**
   * Extract text content from a PDF buffer
   * @param pdfBuffer - The PDF file as a Buffer
   * @returns The extracted text content
   */
  static async extractText(pdfBuffer: Buffer): Promise<string> {
    try {
      const parser = new PDFParse({ data: pdfBuffer });
      const result = await parser.getText();
      return result.text;
    } catch (error) {
      console.error('PDF parsing error:', error);
      throw createError.BadRequest(
        'Failed to parse PDF file. Please ensure it is a valid PDF.',
      );
    }
  }

  /**
   * Validate that the extracted text has sufficient content
   * @param text - The extracted text
   * @param minLength - Minimum required character length
   * @param errorMessage - Custom error message
   */
  static validateTextContent(
    text: string,
    minLength: number = 50,
    errorMessage?: string,
  ): void {
    if (!text || text.trim().length < minLength) {
      throw createError.BadRequest(
        errorMessage ||
          `The PDF appears to be empty or contains too little text (minimum ${minLength} characters required).`,
      );
    }
  }
}

export default PDFService;
