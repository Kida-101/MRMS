import mongoose from 'mongoose';

// Define the validateEmail function
const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please name is required"]
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    required: [true, "Please phone required"]
  },
  password: {
    type: String,
    required: [true, "Please password required"],
    minLength: [6, 'Password must be at least 6 characters'],
  },
  image: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['admin', 'super-admin'],
    default: 'admin'
  },
  verifyOtp: { type: String, default: '' },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: '' },
  resetOtpExpiredAt: { type: Number, default: 0 },
}, {
  timestamps: true
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;