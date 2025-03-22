import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from "../models/admin.model.js";


// ADMIN REGISTER
export const register = async (req, res) => {
  const data = req.body;

  if (!data.email || !data.password || !data.name) {
    return res.json({ success: false, message: "Email, password, and name are required" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email: data.email });

    if (existingAdmin) {
      return res.json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const admin = await Admin.create(data);

    // Remove the password from the response
    admin.password = undefined;

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Set the token in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ success: true, message: "Admin created successfully", data: admin });
  } catch (error) {
    console.error("Error registering admin:", error.message);
    res.json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


// ADMIN LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.json({ success: false, message: "Invalid email credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.json({ success: false, message: "Invalid password credentials" });
    }

    admin.password = undefined;

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({ success: true, message: "Login successfully" });
  } catch (error) {
    console.log("Error logging in admin:", error.message);
    res.json({ success: false, message: error.message });
  }
}

// ADMIN LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// IS AUTHENTICATED
export const isAuthenticated = async (req, res) => {
  try {
    res.json({ success: true, message: "Authenticated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
