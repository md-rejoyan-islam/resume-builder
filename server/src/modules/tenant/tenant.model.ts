import mongoose from 'mongoose';
import { ITenant } from './tenant.type';

const TenantSchema = new mongoose.Schema<ITenant>(
  {
    name: {
      type: String,
      required: [true, 'Tenant name is required'],
      unique: [true, 'Tenant name must be unique'],
      minlength: [1, 'Tenant name cannot be empty'],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'User ID is required for tenant'],
    },
  },
  {
    timestamps: true,
  },
);

TenantSchema.index({ name: 1 });

const TenantModel = mongoose.model<ITenant>('Tenants', TenantSchema);

export default TenantModel;
