import mongoose, { Schema } from 'mongoose';
import { IResume } from './resume.type';

const SectionTitleSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String },
    defaultTitle: { type: String, required: true },
  },
  { _id: false },
);

const ContactSchema = new Schema(
  {
    firstName: { type: String, default: '', trim: true },
    lastName: { type: String, default: '', trim: true },
    jobTitle: { type: String, default: '', trim: true },
    email: { type: String, default: '', lowercase: true, trim: true },
    phone: { type: String, default: '', trim: true },
    country: { type: String, default: '', trim: true },
    city: { type: String, default: '', trim: true },
    state: { type: String, default: '', trim: true },
    postalCode: { type: String, default: '', trim: true },
    summary: { type: String, default: '' }, // HTML content
    photoUrl: { type: String },
    linkedinUrl: { type: String },
    githubUrl: { type: String },
    websiteUrl: { type: String },
    twitterUrl: { type: String },
    nationality: { type: String },
    dateOfBirth: { type: String },
    drivingLicense: { type: String },
  },
  { _id: false },
);

const SkillSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    level: { type: Number, min: 1, max: 5 },
    index: { type: Number },
  },
  { _id: false },
);

const ExperienceSchema = new Schema(
  {
    id: { type: String, required: true },
    jobTitle: { type: String, required: true, trim: true },
    employer: { type: String, required: true, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    jobType: {
      type: String,
      enum: [
        'full-time',
        'part-time',
        'contract',
        'freelance',
        'internship',
        'remote',
      ],
    },
    startDate: { type: String, required: true },
    endDate: { type: String },
    currentlyWorking: { type: Boolean, default: false },
    description: { type: String }, // HTML content
    index: { type: Number },
  },
  { _id: false },
);

const EducationSchema = new Schema(
  {
    id: { type: String, required: true },
    school: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    fieldOfStudy: { type: String, trim: true },
    location: { type: String, trim: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    currentlyStudying: { type: Boolean, default: false },
    index: { type: Number },
  },
  { _id: false },
);

const CertificationSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    issueDate: { type: String, required: true },
    expirationDate: { type: String },
    noExpiration: { type: Boolean, default: false },
    credentialId: { type: String },
    credentialUrl: { type: String },
    description: { type: String }, // HTML content
    index: { type: Number },
  },
  { _id: false },
);

const ProjectSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String }, // HTML content
    githubUrl: { type: String },
    liveUrl: { type: String },
    otherUrl: { type: String },
    index: { type: Number },
  },
  { _id: false },
);

const ReferenceSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    position: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    relationship: { type: String, trim: true },
    index: { type: Number },
  },
  { _id: false },
);

const LanguageSchema = new Schema(
  {
    id: { type: String, required: true },
    language: { type: String, required: true, trim: true },
    proficiency: {
      type: String,
      enum: ['native', 'fluent', 'advanced', 'intermediate', 'basic'],
    },
    index: { type: Number },
  },
  { _id: false },
);

const VolunteerSchema = new Schema(
  {
    id: { type: String, required: true },
    organization: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    currentlyVolunteering: { type: Boolean, default: false },
    description: { type: String }, // HTML content
    index: { type: Number },
  },
  { _id: false },
);

const PublicationSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    publisher: { type: String, trim: true },
    authors: { type: String, trim: true },
    publicationDate: { type: String },
    url: { type: String },
    description: { type: String }, // HTML content
    index: { type: Number },
  },
  { _id: false },
);

const TemplateSettingsSchema = new Schema(
  {
    templateId: { type: String, required: true, default: 'classic' },
    fontFamily: { type: String },
    fontSize: {
      name: { type: String },
      sectionTitle: { type: String },
      itemTitle: { type: String },
      body: { type: String },
      small: { type: String },
    },
    sectionGap: { type: Number },
    paragraphGap: { type: Number },
    lineHeight: { type: Number },
    accentColor: { type: String },
  },
  { _id: false },
);

const ResumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'User ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Resume title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },

    // Template settings
    templateSettings: TemplateSettingsSchema,

    // Section titles
    sectionTitles: [SectionTitleSchema],

    // Resume content
    contact: {
      type: ContactSchema,
      required: [true, 'Contact information is required'],
    },
    skills: [SkillSchema],
    experiences: [ExperienceSchema],
    educations: [EducationSchema],
    certifications: [CertificationSchema],
    projects: [ProjectSchema],
    references: [ReferenceSchema],
    languages: [LanguageSchema],
    volunteers: [VolunteerSchema],
    publications: [PublicationSchema],
  },
  {
    timestamps: true,
  },
);

ResumeSchema.index({ userId: 1, isDefault: 1 });
ResumeSchema.index({ userId: 1, createdAt: -1 });

ResumeSchema.pre('save', async function (next) {
  if (this.isDefault && this.isModified('isDefault')) {
    await ResumeModel.updateMany(
      { userId: this.userId, _id: { $ne: this._id } },
      { isDefault: false },
    );
  }
  next();
});

const ResumeModel = mongoose.model<IResume>('Resumes', ResumeSchema);

export default ResumeModel;
