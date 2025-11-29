import { Types } from 'mongoose';

export interface IFieldStyle {
  fontFamily: string;
  fontSize: number;
  color: string;
  align: 'left' | 'center' | 'right';
}

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

export interface IDisclosureContent {
  date: string;
  recipientName?: string;
  recipientTitle?: string;
  company?: string;
  address?: string;
  subject?: string;
  salutation?: string;
  introductionParagraph?: string;
  disclosureDetails?: string;
  relevantCircumstances?: string;
  mitigatingFactors?: string;
  supportingDocuments?: string;
  closingStatement?: string;
  closing?: string;
  headerStyle?: IFieldStyle;
  bodyStyle?: IFieldStyle;
  closingStyle?: IFieldStyle;
}

export interface IDisclosureLetter {
  userId: Types.ObjectId;
  title: string;
  isDefault?: boolean;
  status: 'draft' | 'completed';
  disclosureType?: 'criminal' | 'financial' | 'medical' | 'employment' | 'other';
  theme?: ITheme;
  personalInfo: IPersonalInfo;
  disclosureContent: IDisclosureContent;
}

export interface IDisclosureLetterDocument extends IDisclosureLetter {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
