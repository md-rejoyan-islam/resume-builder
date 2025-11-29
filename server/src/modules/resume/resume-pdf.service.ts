import { AIExtractionService, PDFService } from '../ai';
import { ResumeService } from './resume.service';

// Resume Format Schema for OpenAI

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
      "description": "string (HTML content with <p>, <ul>, <li> tags for responsibilities/achievements)",
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

const RESUME_SYSTEM_PROMPT = `You are an expert resume parser. Your task is to extract ALL information from the provided resume text and structure it according to the exact JSON schema provided.

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
10. IMPORTANT - URLs: All URLs must be returned in their complete original format including the protocol (https:// or http://). For example:
    - LinkedIn: "https://linkedin.com/in/username" (NOT just "linkedin.com/in/username" or "username")
    - GitHub: "https://github.com/username" (NOT just "github.com/username" or "username")
    - Twitter: "https://twitter.com/username" (NOT just "twitter.com/username" or "@username")
    - Website: "https://example.com" (NOT just "example.com")
    - Any other URL: preserve the full URL with protocol
    If a URL in the resume doesn't have a protocol, add "https://" prefix.`;

export class ResumePdfService {
  /**
   * Extract text from PDF buffer
   */
  static async extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
    return PDFService.extractText(pdfBuffer);
  }

  /**
   * Use OpenAI to extract structured resume data from text
   */
  static async extractResumeDataWithAI(
    pdfText: string,
  ): Promise<Record<string, unknown>> {
    const parsedData = await AIExtractionService.extractStructuredData({
      schema: RESUME_SCHEMA,
      systemPrompt: RESUME_SYSTEM_PROMPT,
      content: `Please extract all information from this resume and return it as JSON:\n\n${pdfText}`,
      maxTokens: 4096,
    });

    return this.validateAndNormalizeData(parsedData);
  }

  /**
   * Validate and normalize extracted data to ensure it matches our schema
   */
  private static validateAndNormalizeData(
    data: Record<string, unknown>,
  ): Record<string, unknown> {
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
      skills: AIExtractionService.normalizeArrayWithIds(
        data.skills as { id?: string; index?: number }[],
        'skill',
      ),
      experiences: AIExtractionService.normalizeArrayWithIds(
        data.experiences as { id?: string; index?: number }[],
        'exp',
      ),
      educations: AIExtractionService.normalizeArrayWithIds(
        data.educations as { id?: string; index?: number }[],
        'edu',
      ),
      certifications: AIExtractionService.normalizeArrayWithIds(
        data.certifications as { id?: string; index?: number }[],
        'cert',
      ),
      projects: AIExtractionService.normalizeArrayWithIds(
        data.projects as { id?: string; index?: number }[],
        'proj',
      ),
      references: AIExtractionService.normalizeArrayWithIds(
        data.references as { id?: string; index?: number }[],
        'ref',
      ),
      languages: AIExtractionService.normalizeArrayWithIds(
        data.languages as { id?: string; index?: number }[],
        'lang',
      ),
      volunteers: AIExtractionService.normalizeArrayWithIds(
        data.volunteers as { id?: string; index?: number }[],
        'vol',
      ),
      publications: AIExtractionService.normalizeArrayWithIds(
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

    // Step 2: Validate text content
    PDFService.validateTextContent(
      pdfText,
      50,
      'The PDF appears to be empty or contains too little text to extract resume data.',
    );

    // Step 3: Use AI to extract structured data
    const resumeData = await this.extractResumeDataWithAI(pdfText);

    // Step 4: Generate title from extracted data
    const contact = resumeData.contact as Record<string, string>;
    const title =
      contact.firstName && contact.lastName
        ? `${contact.firstName} ${contact.lastName}'s Resume`
        : originalFilename.replace(/\.pdf$/i, '') || 'Imported Resume';

    // Step 5: Save to database using existing ResumeService
    const result = await ResumeService.create(userId, {
      title,
      ...resumeData,
    } as Parameters<typeof ResumeService.create>[1]);

    return { _id: result._id.toString() };
  }
}
