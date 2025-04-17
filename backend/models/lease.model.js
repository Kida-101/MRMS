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
      enum: ['active', 'expired', 'terminated'],
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

LeaseSchema.pre(
  'deleteOne',
  { document: false, query: true },
  async function (next) {
    try {
      // Get the lease being deleted
      const lease = await this.model.findOne(this.getFilter());
      if (!lease) return next();

      await mongoose.model('Tenant').findByIdAndDelete(lease.tenantId);
      await mongoose.model('Room').updateMany(
        { _id: { $in: lease.roomId } },
        {
          status: 'vacant',
          $pull: { leaseHistory: lease._id }
        }
      );

      next();
    } catch (error) {
      next(error);
    }
  }
);

LeaseSchema.pre(
  'updateOne',
  { document: false, query: true },
  async function (next) {
    try {
      const lease = await this.model.findOne(this.getFilter());
      if (!lease) return next();

      const data = this.getUpdate();

      if (
        (lease.status === 'active' || lease.status === 'expired') &&
        data.status === 'terminated'
      ) {
        // Mutate the update data directly — this avoids recursion
        data.roomId = null;

        // Update related Tenant
        await mongoose.model('Tenant').findByIdAndUpdate(
          lease.tenantId,
          { status: 'inactive', roomId: null },
          { new: true }
        );

        // Update related Room
        await mongoose.model('Room').findByIdAndUpdate(
          lease.roomId,
          { status: 'vacant', tenantId: null, leaseId: null },
          { new: true }
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  }
);

const Lease = mongoose.models.Lease || mongoose.model('Lease', LeaseSchema);
export default Lease;