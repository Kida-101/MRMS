import Admin from '../models/admin.model.js';
import bcrypt from 'bcryptjs';

// GET ALL ADMINS
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 });
    if (!admins) {
      return res.status(404).json({ success: false, message: 'No admins found' });
    }
    res.status(200).json({ success: true, message: 'Admins successfully retrieved', data: admins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// GET SINGLE ADMIN
export const getAdmin = async (req, res) => {
  const id = req.query.id || req.body.id;

  if (!id) {
    return res.status(400).json({ success: false, message: "Admin ID is required" });
  }
  try {
    const admin = await Admin.findById(id);
    res.status(200).json({ success: true, message: 'Admin successfully retrieved', data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// CREATE ADMIN
export const createAdmin = async (req, res) => {
  const data = req.body;
  const { email } = data;

  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const adminDoc = await Admin.create(data)
    if (!adminDoc) {
      return res.status(400).json({ success: false, message: "Admin not created successfully!" })
    }
    res.status(200).json({ success: true, message: "Admin Created Successfully!", data: adminDoc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

// UPDATE ADMIN
export const updateAdmin = async (req, res) => {
  const { id } = req.query;
  const data = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "Admin ID not provided" })
  }
  try {
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }
    const admin = await Admin.findByIdAndUpdate(id, data, { new: true })
    if (!admin) {
      return res.status(400).json({ success: false, message: "Admin not found" })
    }
    res.status(200).json({ success: true, message: "Admin updated successfully", data: admin })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message })
  }
}

// DELETE ADMIN
export const deleteAdmin = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ success: false, message: "Admin ID not provided" })
  }
  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(400).json({ success: false, message: "Admin not deleted successfully" })
    }
    res.status(200).json({ success: true, message: "Admin deleted successfully!" })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}
