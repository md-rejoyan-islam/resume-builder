import OpenAI from 'openai';
import secret from '../../app/secret';

/**
 * OpenAI Client Singleton
 * Single source of truth for OpenAI client initialization
 */
class OpenAIService {
  private static instance: OpenAI | null = null;

  /**
   * Get the OpenAI client instance
   * Creates a new instance if one doesn't exist
   */
  static getClient(): OpenAI {
    if (!this.instance) {
      if (!secret.openai.api_key) {
        throw new Error('OpenAI API key is not configured');
      }
      this.instance = new OpenAI({
        apiKey: secret.openai.api_key,
      });
    }
    return this.instance;
  }

  /**
   * Check if OpenAI is configured
   */
  static isConfigured(): boolean {
    return !!secret.openai.api_key;
  }

  /**
   * Reset the client instance (useful for testing)
   */
  static resetClient(): void {
    this.instance = null;
  }
}

export default OpenAIService;
