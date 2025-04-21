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
  const { id } = req.params;

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


// GET SIGNED ADMIN
export const getLoggedInAdmin = async (req, res) => {
  const id = req.body.id;

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
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "Admin ID not provided" });
  }

  try {
    // Prevent password updates through this endpoint
    if (data.password) {
      return res.status(400).json({
        success: false,
        message: "Use the dedicated password update endpoint for password changes",
      });
    }

    const admin = await Admin.findByIdAndUpdate(id, data, { new: true });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// UPDATE ADMIN PASSWORD
export const updateAdminPassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "Admin ID not provided" });
  }

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Old password and new password are required",
    });
  }

  try {
    // Find admin
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Validate new password (minLength: 6, per schema)
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;

    // Save updated admin
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// DELETE ADMIN
export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
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
