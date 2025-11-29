import mongoose, { Schema } from 'mongoose';
import { IDisclosureLetter } from './disclosure-letter.type';

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

const DisclosureContentSchema = new Schema(
  {
    date: { type: String, default: '' },
    recipientName: { type: String, default: '', trim: true },
    recipientTitle: { type: String, default: '', trim: true },
    company: { type: String, default: '', trim: true },
    address: { type: String, default: '', trim: true },
    subject: { type: String, default: '', trim: true },
    salutation: { type: String, default: 'Dear', trim: true },
    introductionParagraph: { type: String, default: '' },
    disclosureDetails: { type: String, default: '' },
    relevantCircumstances: { type: String, default: '' },
    mitigatingFactors: { type: String, default: '' },
    supportingDocuments: { type: String, default: '' },
    closingStatement: { type: String, default: '' },
    closing: { type: String, default: 'Sincerely,', trim: true },
    headerStyle: FieldStyleSchema,
    bodyStyle: FieldStyleSchema,
    closingStyle: FieldStyleSchema,
  },
  { _id: false },
);

const DisclosureLetterSchema = new Schema<IDisclosureLetter>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'User ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Disclosure letter title is required'],
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
    disclosureType: {
      type: String,
      enum: ['criminal', 'financial', 'medical', 'employment', 'other'],
      default: 'other',
    },
    theme: ThemeSchema,
    personalInfo: {
      type: PersonalInfoSchema,
      required: [true, 'Personal information is required'],
    },
    disclosureContent: {
      type: DisclosureContentSchema,
      required: [true, 'Disclosure content is required'],
    },
  },
  {
    timestamps: true,
  },
);

DisclosureLetterSchema.index({ userId: 1, isDefault: 1 });
DisclosureLetterSchema.index({ userId: 1, createdAt: -1 });
DisclosureLetterSchema.index({ userId: 1, status: 1 });

DisclosureLetterSchema.pre('save', async function (next) {
  if (this.isDefault && this.isModified('isDefault')) {
    await DisclosureLetterModel.updateMany(
      { userId: this.userId, _id: { $ne: this._id } },
      { isDefault: false },
    );
  }
  next();
});

const DisclosureLetterModel = mongoose.model<IDisclosureLetter>(
  'DisclosureLetters',
  DisclosureLetterSchema,
);

export default DisclosureLetterModel;
