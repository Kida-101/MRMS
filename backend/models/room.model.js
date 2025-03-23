import mongoose, { Schema } from 'mongoose';

const RoomSchema = new Schema(
  {
    roomNumber: {
      type: String,
      required: [true, 'Room number is required'],
      unique: true
    },
    type: {
      type: String,
      enum: ['office', 'retail', 'storage', 'commercial', 'residential', 'other'],
      required: [true, 'Room type is required']
    },
    status: {
      type: String,
      enum: ['vacant', 'occupied', 'under-maintenance'],
      default: 'vacant'
    },
    amenities: [{
      type: String,
      enum: ['wifi', 'ac', 'furniture', 'restroom', 'parking', 'security', 'other']
    }],
    size: {
      type: Number,
      required: [true, 'Size in sq.ft is required']
    },
    price: {
      type: Number,
      required: [true, 'Price per month is required']
    },
    description: String,
    floorPlan: String,

    leaseId: {
      type: Schema.Types.ObjectId,
      ref: 'Lease'
    }
  },
  { timestamps: true }
);

const Room = mongoose.models.Room || mongoose.model('Room', RoomSchema);
export default Room;