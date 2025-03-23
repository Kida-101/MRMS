import mongoose, { Schema } from 'mongoose';

const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const TenantSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validateEmail, 'Please provide a valid email address'],
    },
    phone: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, default: '' },

    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },

    emergencyContact: {
      name: { type: String, required: true },
      relationship: {
        type: String,
        enum: ['parent', 'spouse', 'sibling', 'friend', 'other'],
        required: true,
      },
      phone: { type: String, required: true },
      address: {
        street: String,
        city: String,
        country: String,
        postalCode: String,
      },
    },

    businessDetails: {
      businessName: { type: String, required: true },
      businessType: {
        type: String,
        enum: ['retail', 'food', 'services', 'office', 'other'],
        required: true,
      },
      businessPhone: { type: String, required: true },
      businessEmail: {
        type: String,
        required: true,
        validate: [validateEmail, 'Please provide a valid email address'],
      },
    },

    leaseId: { type: Schema.Types.ObjectId, ref: 'Lease' },
    roomId: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  },
  { timestamps: true }
);

const Tenant = mongoose.models.Tenant || mongoose.model('Tenant', TenantSchema);
export default Tenant;
