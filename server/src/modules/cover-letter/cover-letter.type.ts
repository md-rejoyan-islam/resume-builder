import { Types } from 'mongoose';

// =============================================================================
// Field Style Interface
// =============================================================================

export interface IFieldStyle {
  fontFamily: string;
  fontSize: number;
  color: string;
  align: 'left' | 'center' | 'right';
}

// =============================================================================
// Theme Interface
// =============================================================================

export interface ITheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textLight: string;
    background: string;
    border: string;
  };
  spacing: {
    pageMargin: number;
    sectionGap: number;
    lineHeight: number;
    paragraphGap: number;
  };
  fontFamily: string;
}

// =============================================================================
// Personal Info Interface
// =============================================================================

export interface IPersonalInfo {
  fullName: string;
  jobTitle?: string;
  email: string;
  phone?: string;
  location?: string;
  profileImage?: string;
  nameStyle?: IFieldStyle;
  contactStyle?: IFieldStyle;
}

// =============================================================================
// Letter Content Interface
// =============================================================================

export interface ILetterContent {
  date: string;
  recipientName?: string;
  recipientTitle?: string;
  company?: string;
  address?: string;
  salutation?: string;
  greeting?: string;
  bodyParagraph1?: string;
  bodyParagraph2?: string;
  bodyParagraph3?: string;
  closingParagraph?: string;
  closing?: string;
  headerStyle?: IFieldStyle;
  bodyStyle?: IFieldStyle;
  closingStyle?: IFieldStyle;
}

// =============================================================================
// Main Cover Letter Interface
// =============================================================================

export interface ICoverLetter {
  userId: Types.ObjectId;
  title: string;
  isDefault?: boolean;
  status: 'draft' | 'completed';
  theme?: ITheme;
  personalInfo: IPersonalInfo;
  letterContent: ILetterContent;
}

// =============================================================================
// Cover Letter Document Type (with MongoDB fields)
// =============================================================================

export interface ICoverLetterDocument extends ICoverLetter {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
