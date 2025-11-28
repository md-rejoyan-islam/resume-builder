import createError from 'http-errors';
import OpenAI from 'openai';
import { PDFParse } from 'pdf-parse';
import secret from '../../app/secret';
import { ResumeService } from './resume.service';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: secret.openai.api_key,
});

// =============================================================================
// Resume Format Schema for OpenAI
// =============================================================================

const RESUME_SCHEMA = `{
  "contact": {
    "firstName": "string (required)",
    "lastName": "string (required)",
    "jobTitle": "string",
    "email": "string (required)",
    "phone": "string",
    "country": "string",
    "city": "string",
    "state": "string",
    "postalCode": "string",
    "summary": "string (professional summary/objective as HTML with <p> tags)",
    "linkedinUrl": "string",
    "githubUrl": "string",
    "websiteUrl": "string",
    "twitterUrl": "string",
    "nationality": "string",
    "dateOfBirth": "string (YYYY-MM-DD format)",
    "drivingLicense": "string"
  },
  "skills": [
    {
      "id": "string (unique, format: skill-{timestamp}-{random})",
      "name": "string (skill name)",
      "level": "number (1-5, where 1=Beginner, 5=Expert)",
      "index": "number (order index)"
    }
  ],
  "experiences": [
    {
      "id": "string (unique, format: exp-{timestamp}-{random})",
      "jobTitle": "string (required)",
      "employer": "string (required)",
      "city": "string",
      "country": "string",
      "jobType": "string (one of: full-time, part-time, contract, freelance, internship, remote)",
      "startDate": "string (YYYY-MM-DD format, required)",
      "endDate": "string (YYYY-MM-DD format, optional if currently working)",
      "currentlyWorking": "boolean",
      "description": "string (HTML content with <p>, <ul>, <li> tags for responsibilities/achievements)",
      "index": "number (order index)"
    }
  ],
  "educations": [
    {
      "id": "string (unique, format: edu-{timestamp}-{random})",
      "school": "string (required)",
      "degree": "string (required)",
      "fieldOfStudy": "string",
      "location": "string",
      "startDate": "string (YYYY-MM-DD format, required)",
      "endDate": "string (YYYY-MM-DD format)",
      "currentlyStudying": "boolean",
      "index": "number (order index)"
    }
  ],
  "certifications": [
    {
      "id": "string (unique, format: cert-{timestamp}-{random})",
      "name": "string (required)",
      "issuer": "string (required)",
      "issueDate": "string (YYYY-MM-DD format, required)",
      "expirationDate": "string (YYYY-MM-DD format)",
      "noExpiration": "boolean",
      "credentialId": "string",
      "credentialUrl": "string",
      "description": "string (HTML content)",
      "index": "number (order index)"
    }
  ],
  "projects": [
    {
      "id": "string (unique, format: proj-{timestamp}-{random})",
      "name": "string (required)",
      "description": "string (HTML content with project details)",
      "githubUrl": "string",
      "liveUrl": "string",
      "otherUrl": "string",
      "index": "number (order index)"
    }
  ],
  "references": [
    {
      "id": "string (unique, format: ref-{timestamp}-{random})",
      "name": "string (required)",
      "company": "string",
      "position": "string",
      "email": "string",
      "phone": "string",
      "relationship": "string",
      "index": "number (order index)"
    }
  ],
  "languages": [
    {
      "id": "string (unique, format: lang-{timestamp}-{random})",
      "language": "string (required)",
      "proficiency": "string (one of: native, fluent, advanced, intermediate, basic)",
      "index": "number (order index)"
    }
  ],
  "volunteers": [
    {
      "id": "string (unique, format: vol-{timestamp}-{random})",
      "organization": "string (required)",
      "role": "string (required)",
      "location": "string",
      "startDate": "string (YYYY-MM-DD format, required)",
      "endDate": "string (YYYY-MM-DD format)",
      "currentlyVolunteering": "boolean",
      "description": "string (HTML content)",
      "index": "number (order index)"
    }
  ],
  "publications": [
    {
      "id": "string (unique, format: pub-{timestamp}-{random})",
      "title": "string (required)",
      "publisher": "string",
      "authors": "string",
      "publicationDate": "string (YYYY-MM-DD format)",
      "url": "string",
      "description": "string (HTML content)",
      "index": "number (order index)"
    }
  ],
  "sectionTitles": [
    { "id": "summary", "defaultTitle": "Summary" },
    { "id": "experience", "defaultTitle": "Experience" },
    { "id": "education", "defaultTitle": "Education" },
    { "id": "skills", "defaultTitle": "Skills" },
    { "id": "projects", "defaultTitle": "Projects" },
    { "id": "certifications", "defaultTitle": "Certifications" },
    { "id": "languages", "defaultTitle": "Languages" },
    { "id": "publications", "defaultTitle": "Publications" },
    { "id": "volunteer", "defaultTitle": "Volunteer" },
    { "id": "references", "defaultTitle": "References" }
  ]
}`;

// =============================================================================
// PDF Extraction Service
// =============================================================================

export class ResumePdfService {
  /**
   * Extract text from PDF buffer
   */
  static async extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
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
   * Use OpenAI to extract structured resume data from text
   */
  static async extractResumeDataWithAI(
    pdfText: string,
  ): Promise<Record<string, unknown>> {
    if (!secret.openai.api_key) {
      throw createError.InternalServerError('OpenAI API key is not configured');
    }

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert resume parser. Your task is to extract ALL information from the provided resume text and structure it according to the exact JSON schema provided.

IMPORTANT RULES:
1. Extract EVERY piece of information from the resume - do not miss anything
2. For dates, convert to YYYY-MM-DD format. If only year is given, use YYYY-01-01. If month and year, use YYYY-MM-01
3. For descriptions, format as HTML using <p> for paragraphs and <ul><li> for bullet points
4. Generate unique IDs using the format specified (e.g., skill-{timestamp}-{random6chars})
5. If a field is not present in the resume, omit it or use empty string/array as appropriate
6. For skill levels, estimate based on context (years of experience, certifications, etc.)
7. For language proficiency, infer from context or default to "intermediate" if unclear
8. Always include the sectionTitles array with default values
9. Return ONLY valid JSON, no markdown code blocks or explanations

JSON Schema to follow:
${RESUME_SCHEMA}`,
          },
          {
            role: 'user',
            content: `Please extract all information from this resume and return it as JSON:\n\n${pdfText}`,
          },
        ],
        temperature: 0.1,
        max_tokens: 4096,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw createError.InternalServerError('No response from OpenAI');
      }

      const parsedData = JSON.parse(content);

      // Validate and ensure required structure
      return this.validateAndNormalizeData(parsedData);
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
   * Validate and normalize extracted data to ensure it matches our schema
   */
  private static validateAndNormalizeData(
    data: Record<string, unknown>,
  ): Record<string, unknown> {
    const timestamp = Date.now();
    const randomId = () => Math.random().toString(36).substring(2, 8);

    // Ensure contact has required fields
    const contact = (data.contact as Record<string, unknown>) || {};
    const normalizedContact = {
      firstName: contact.firstName || '',
      lastName: contact.lastName || '',
      jobTitle: contact.jobTitle || '',
      email: contact.email || '',
      phone: contact.phone || '',
      country: contact.country || '',
      city: contact.city || '',
      state: contact.state || '',
      postalCode: contact.postalCode || '',
      summary: contact.summary || '',
      linkedinUrl: contact.linkedinUrl || undefined,
      githubUrl: contact.githubUrl || undefined,
      websiteUrl: contact.websiteUrl || undefined,
      twitterUrl: contact.twitterUrl || undefined,
      nationality: contact.nationality || undefined,
      dateOfBirth: contact.dateOfBirth || undefined,
      drivingLicense: contact.drivingLicense || undefined,
    };

    // Normalize arrays and ensure IDs
    const normalizeArray = <T extends { id?: string; index?: number }>(
      arr: T[] | undefined,
      prefix: string,
    ): T[] => {
      if (!Array.isArray(arr)) return [];
      return arr.map((item, index) => ({
        ...item,
        id: item.id || `${prefix}-${timestamp}-${randomId()}`,
        index: item.index ?? index,
      }));
    };

    // Default section titles
    const defaultSectionTitles = [
      { id: 'summary', defaultTitle: 'Summary' },
      { id: 'experience', defaultTitle: 'Experience' },
      { id: 'education', defaultTitle: 'Education' },
      { id: 'skills', defaultTitle: 'Skills' },
      { id: 'projects', defaultTitle: 'Projects' },
      { id: 'certifications', defaultTitle: 'Certifications' },
      { id: 'languages', defaultTitle: 'Languages' },
      { id: 'publications', defaultTitle: 'Publications' },
      { id: 'volunteer', defaultTitle: 'Volunteer' },
      { id: 'references', defaultTitle: 'References' },
    ];

    return {
      contact: normalizedContact,
      skills: normalizeArray(
        data.skills as { id?: string; index?: number }[],
        'skill',
      ),
      experiences: normalizeArray(
        data.experiences as { id?: string; index?: number }[],
        'exp',
      ),
      educations: normalizeArray(
        data.educations as { id?: string; index?: number }[],
        'edu',
      ),
      certifications: normalizeArray(
        data.certifications as { id?: string; index?: number }[],
        'cert',
      ),
      projects: normalizeArray(
        data.projects as { id?: string; index?: number }[],
        'proj',
      ),
      references: normalizeArray(
        data.references as { id?: string; index?: number }[],
        'ref',
      ),
      languages: normalizeArray(
        data.languages as { id?: string; index?: number }[],
        'lang',
      ),
      volunteers: normalizeArray(
        data.volunteers as { id?: string; index?: number }[],
        'vol',
      ),
      publications: normalizeArray(
        data.publications as { id?: string; index?: number }[],
        'pub',
      ),
      sectionTitles: defaultSectionTitles,
    };
  }

  /**
   * Process PDF upload: extract text, parse with AI, save to database
   */
  static async processAndCreateResume(
    userId: string,
    pdfBuffer: Buffer,
    originalFilename: string,
  ): Promise<{ _id: string }> {
    // Step 1: Extract text from PDF
    const pdfText = await this.extractTextFromPdf(pdfBuffer);

    console.log('prd', pdfText);

    if (!pdfText || pdfText.trim().length < 50) {
      throw createError.BadRequest(
        'The PDF appears to be empty or contains too little text to extract resume data.',
      );
    }

    // Step 2: Use AI to extract structured data
    const resumeData = await this.extractResumeDataWithAI(pdfText);

    // Step 3: Generate title from extracted data
    const contact = resumeData.contact as Record<string, string>;
    const title =
      contact.firstName && contact.lastName
        ? `${contact.firstName} ${contact.lastName}'s Resume`
        : originalFilename.replace(/\.pdf$/i, '') || 'Imported Resume';

    // Step 4: Save to database using existing ResumeService
    const result = await ResumeService.create(userId, {
      title,
      ...resumeData,
    } as Parameters<typeof ResumeService.create>[1]);

    return { _id: result._id.toString() };
  }
}
