import bcrypt from 'bcryptjs';
import Tenant from '../models/tenant.model.js';
import Lease from '../models/lease.model.js';
import Room from '../models/room.model.js';

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
  const {
    emergencyContact,
    businessInfo,
    status,
    personalInfo
  } = data;
  const { leaseInfo } = data;

  const tenantData = {
    emergencyContact,
    businessInfo,
    status,
    ...personalInfo,
  };

  if (!leaseInfo.roomId) {
    return res.status(400).json({ success: false, message: 'Room number is not selected' });
  }

  const existingTenant = await Tenant.findOne({ email: tenantData.email });

  if (existingTenant) {
    return res.status(400).json({ success: false, message: 'Tenant already exists' });
  }

  const hashedPassword = await bcrypt.hash(tenantData.password, 10);
  tenantData.password = hashedPassword;

  const tenantDoc = await Tenant.create(tenantData);

  if (!tenantDoc) {
    return res.status(400).json({ success: false, message: 'Failed to create tenant' });
  }

  leaseInfo.tenantId = tenantDoc._id;

  const leaseDoc = await Lease.create(leaseInfo);
  if (!leaseDoc) {
    await Tenant.findByIdAndDelete(tenantDoc._id);
    return res.status(400).json({ success: false, message: 'Failed to create lease' });
  }

  const roomDoc = await Room.findByIdAndUpdate(leaseInfo.roomId, { status: 'occupied' }, { new: true });
  if (!roomDoc) {
    await Lease.findByIdAndDelete(leaseDoc._id);
    return res.status(400).json({ success: false, message: 'Failed to update room status' });
  }

  const updatedTenantDoc = await Tenant.findByIdAndUpdate(tenantDoc._id, { leaseId: leaseDoc._id }, { new: true });
  if (!updatedTenantDoc) {
    await Room.findByIdAndUpdate(leaseDoc.roomId, { status: 'vacant' }, { new: true });
    await Lease.findByIdAndDelete(leaseDoc._id);
    return res.status(400).json({ success: false, message: 'Failed to update tenant with lease' });
  }

  res.status(201).json({ success: true, message: "Tenant created successfully", data: tenantDoc });
};

// GET TENANT BY ID
export const getTenant = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: 'Id is required' });
  }
  try {
    const tenant = await Tenant.findById(id).populate({
      path: "leaseId",
      populate: {
        path: "roomId",
        model: "Room",
      }
    });
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