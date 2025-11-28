import mongoose, { Schema } from 'mongoose';
import { ICoverLetter } from './cover-letter.type';

// =============================================================================
// Sub-Schemas
// =============================================================================

const FieldStyleSchema = new Schema(
  {
    fontFamily: { type: String, default: 'Arial' },
    fontSize: { type: Number, default: 12 },
    color: { type: String, default: '#000000' },
    align: {
      type: String,
      enum: ['left', 'center', 'right'],
      default: 'left',
    },
  },
  { _id: false },
);

const ThemeSchema = new Schema(
  {
    colors: {
      primary: { type: String, default: '#3b82f6' },
      secondary: { type: String, default: '#1e3a5f' },
      accent: { type: String, default: '#10b981' },
      text: { type: String, default: '#000000' },
      textLight: { type: String, default: '#666666' },
      background: { type: String, default: '#ffffff' },
      border: { type: String, default: '#d1d5db' },
    },
    spacing: {
      pageMargin: { type: Number, default: 20 },
      sectionGap: { type: Number, default: 12 },
      lineHeight: { type: Number, default: 1.6 },
      paragraphGap: { type: Number, default: 12 },
    },
    fontFamily: {
      type: String,
      default: 'Inter, system-ui, -apple-system, sans-serif',
    },
  },
  { _id: false },
);

const PersonalInfoSchema = new Schema(
  {
    fullName: { type: String, default: '', trim: true },
    jobTitle: { type: String, default: '', trim: true },
    email: { type: String, default: '', lowercase: true, trim: true },
    phone: { type: String, default: '', trim: true },
    location: { type: String, default: '', trim: true },
    profileImage: { type: String },
    nameStyle: FieldStyleSchema,
    contactStyle: FieldStyleSchema,
  },
  { _id: false },
);

const LetterContentSchema = new Schema(
  {
    date: { type: String, default: '' },
    recipientName: { type: String, default: '', trim: true },
    recipientTitle: { type: String, default: '', trim: true },
    company: { type: String, default: '', trim: true },
    address: { type: String, default: '', trim: true },
    salutation: { type: String, default: 'Dear', trim: true },
    greeting: { type: String, default: '' },
    bodyParagraph1: { type: String, default: '' },
    bodyParagraph2: { type: String, default: '' },
    bodyParagraph3: { type: String, default: '' },
    closingParagraph: { type: String, default: '' },
    closing: { type: String, default: 'Sincerely,', trim: true },
    headerStyle: FieldStyleSchema,
    bodyStyle: FieldStyleSchema,
    closingStyle: FieldStyleSchema,
  },
  { _id: false },
);

// =============================================================================
// Main Cover Letter Schema
// =============================================================================

const CoverLetterSchema = new Schema<ICoverLetter>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'User ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Cover letter title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'completed'],
      default: 'draft',
    },
    theme: ThemeSchema,
    personalInfo: {
      type: PersonalInfoSchema,
      required: [true, 'Personal information is required'],
    },
    letterContent: {
      type: LetterContentSchema,
      required: [true, 'Letter content is required'],
    },
  },
  {
    timestamps: true,
  },
);

// =============================================================================
// Indexes
// =============================================================================

CoverLetterSchema.index({ userId: 1, isDefault: 1 });
CoverLetterSchema.index({ userId: 1, createdAt: -1 });
CoverLetterSchema.index({ userId: 1, status: 1 });

// =============================================================================
// Pre-save Hook: Ensure only one default cover letter per user
// =============================================================================

CoverLetterSchema.pre('save', async function (next) {
  if (this.isDefault && this.isModified('isDefault')) {
    await CoverLetterModel.updateMany(
      { userId: this.userId, _id: { $ne: this._id } },
      { isDefault: false },
    );
  }
  next();
});

const CoverLetterModel = mongoose.model<ICoverLetter>(
  'CoverLetters',
  CoverLetterSchema,
);

export default CoverLetterModel;
