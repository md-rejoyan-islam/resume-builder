import mongoose from 'mongoose';
import { comparePassword, hashPassword } from '../../utils/password';
import { IUser } from './user.type';

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      require: [1, 'Name is required'],
      minlength: [1, 'Name cannot be empty'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email must be unique'],
      lowercase: true,
      trim: true,
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    phone: { type: String },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    avatar: { type: String, default: null },
    is_active: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'user'],
      default: 'user',
    },
    last_login: { type: Date },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  const user = this as unknown as IUser & mongoose.Document;

  if (!user.isModified('password')) return next();

  user.password = await hashPassword(user.password);

  next();
});

UserSchema.methods.comparePassword = function (entirePassword: string) {
  const user = this as unknown as IUser & mongoose.Document;
  return comparePassword(entirePassword, user.password);
};

UserSchema.index({ role: 1 });

const UserModel = mongoose.model<IUser>('Users', UserSchema);

export default UserModel;
