import mongoose, { Schema } from 'mongoose';

const LeaseSchema = new Schema(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
    },
    roomId: [{
      type: Schema.Types.ObjectId,
      ref: 'Room',
    }],
    startDate: {
      type: Date,
      required: [true, 'Lease start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'Lease end date is required']
    },
    monthlyRent: {
      type: Number,
      required: [true, 'Monthly rent amount is required']
    },
    securityDeposit: {
      type: Number,
      required: [true, 'Security deposit amount is required']
    },
    paymentSchedule: {
      type: String,
      enum: ['monthly', 'quarterly', 'biannually', 'annually', 'other'],
      default: 'monthly'
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'terminated', 'renewed'],
      default: 'active'
    },
    documents: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Lease = mongoose.models.Lease || mongoose.model('Lease', LeaseSchema);
export default Lease;