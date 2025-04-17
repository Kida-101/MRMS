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
        enum: ['parent', 'spouse', 'sibling', 'friend', 'colleague', 'other'],
        required: true,
      },
      phone: { type: String, required: true },
      email: {
        type: String,
        required: true,
        validate: [validateEmail, 'Please provide a valid email address'],
      },
      address: {
        street: String,
        city: String,
        country: String,
        postalCode: String,
      },
    },

    businessInfo: {
      businessName: { type: String, required: true },
      businessType: {
        type: String,
        enum: ['retail', 'food', 'services', 'office', 'commercial', 'other'],
        required: true,
      },
      businessPhone: { type: String, required: true },
      businessEmail: {
        type: String,
        required: true,
        validate: [validateEmail, 'Please provide a valid email address'],
      },
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    leaseId: {
      type: Schema.Types.ObjectId,
      ref: 'Lease',
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
  },
  { timestamps: true }
);

TenantSchema.pre('deleteOne',
  { document: false, query: true },
  async function (next) {
    try {
      const tenant = await this.model.findOne(this.getFilter());
      if (!tenant) return next();

      await mongoose.model('Lease').findByIdAndDelete(tenant.leaseId);

      await mongoose.model('Room').updateMany(
        { _id: { $in: tenant.roomId } }
        , {
          status: 'vacant',
          $pull: { leaseHistory: tenant._id }
        }
      );
      next();
    } catch (error) {
      next(error);
    }
  }
)

const Tenant = mongoose.models.Tenant || mongoose.model('Tenant', TenantSchema);
export default Tenant;
