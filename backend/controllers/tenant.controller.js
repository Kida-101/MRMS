import bcrypt from 'bcryptjs';
import Tenant from '../models/tenant.model.js';

// GET ALL TENANTS
export const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    if (!tenants) {
      return res.status(404).json({ success: false, message: 'No tenants found' });
    }
    res.status(200).json({ success: true, data: tenants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE TENANT
export const createTenant = async (req, res) => {
  const data = req.body
  if (!data) {
    return res.status(400).json({ success: false, message: 'Invalid data' });
  }
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const tenant = Tenant.create(data);
    if (!tenant) {
      return res.status(400).json({ success: false, message: 'Failed to create tenant' });
    }
    res.status(201).json({ success: true, message: "Tenant created successfully", data: tenant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET TENANT BY ID
export const getTenant = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: 'Id is required' });
  }
  try {
    const tenant = await Tenant.findById(id);
    if (!tenant) {
      return res.status(404).json({ success: false, message: 'Tenant not found' });
    }
    res.status(200).json({ success: true, message: "Tenant fetched successfully", data: tenant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE TENANT
export const updateTenant = async (req, res) => {
  const { id } = req.params;
  const data = req.body
  if (!id) {
    return res.status(400).json({ success: false, message: 'Id is required' });
  }
  try {
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }
    const tenant = await Tenant.findByIdAndUpdate(id, data, { new: true });
    if (!tenant) {
      return res.status(404).json({ success: false, message: 'Tenant not found' });
    }
    res.status(200).json({ success: true, message: 'Tenant updated successfully', data: tenant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE TENANT
export const deleteTenant = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: 'Id is required' });
  }
  try {
    const tenant = await Tenant.findByIdAndDelete(id);
    if (!tenant) {
      return res.status(404).json({ success: false, message: 'Tenant not found' });
    }
    res.status(200).json({ success: true, message: 'Tenant deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};