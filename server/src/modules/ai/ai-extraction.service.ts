import createError from 'http-errors';
import OpenAIService from './openai.service';

/**
 * AI Extraction Options
 */
export interface AIExtractionOptions {
  /** The schema for the expected JSON output */
  schema: string;
  /** System prompt instructions for the AI */
  systemPrompt: string;
  /** The text content to extract data from */
  content: string;
  /** Model to use (default: gpt-4o-mini) */
  model?: string;
  /** Temperature for response (default: 0.1 for consistency) */
  temperature?: number;
  /** Maximum tokens for response */
  maxTokens?: number;
}

/**
 * AI Extraction Service
 * Single source of truth for AI-powered data extraction
 */
class AIExtractionService {
  /**
   * Extract structured data from text using OpenAI
   * @param options - Extraction options
   * @returns Parsed JSON data from AI response
   */
  static async extractStructuredData<T = Record<string, unknown>>(
    options: AIExtractionOptions,
  ): Promise<T> {
    const {
      schema,
      systemPrompt,
      content,
      model = 'gpt-4o-mini',
      temperature = 0.1,
      maxTokens = 4096,
    } = options;

    if (!OpenAIService.isConfigured()) {
      throw createError.InternalServerError('OpenAI API key is not configured');
    }

    try {
      const openai = OpenAIService.getClient();

      const response = await openai.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content: `${systemPrompt}\n\nJSON Schema to follow:\n${schema}`,
          },
          {
            role: 'user',
            content,
          },
        ],
        temperature,
        max_tokens: maxTokens,
        response_format: { type: 'json_object' },
      });

      const responseContent = response.choices[0]?.message?.content;
      if (!responseContent) {
        throw createError.InternalServerError('No response from OpenAI');
      }

      return JSON.parse(responseContent) as T;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw createError.InternalServerError(
          'Failed to parse AI response as JSON',
        );
      }
      console.error('OpenAI extraction error:', error);
      throw error;
    }
  }

  /**
   * Generate unique ID with prefix
   * @param prefix - ID prefix (e.g., 'skill', 'exp', 'edu')
   * @returns Unique ID string
   */
  static generateId(prefix: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}-${timestamp}-${random}`;
  }

  /**
   * Normalize an array of items with IDs and indexes
   * @param arr - Array to normalize
   * @param prefix - ID prefix for generating IDs
   * @returns Normalized array with IDs and indexes
   */
  static normalizeArrayWithIds<T extends { id?: string; index?: number }>(
    arr: T[] | undefined,
    prefix: string,
  ): T[] {
    if (!Array.isArray(arr)) return [];
    return arr.map((item, index) => ({
      ...item,
      id: item.id || this.generateId(prefix),
      index: item.index ?? index,
    }));
  }
}

export default AIExtractionService;
