import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Tenant from '../models/tenant.model.js';
import Lease from '../models/lease.model.js';
import Room from '../models/room.model.js';

// GET ALL TENANTS
export const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find()
      .populate({
        path: "leaseId",
        populate: {
          path: "roomId",
          model: "Room",
        }
      });
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
  try {
    const { body } = req;

    // Validate Required Fields
    const requiredFields = ['emergencyContact', 'businessInfo', 'personalInfo', 'leaseInfo'];
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Destructure Data
    const {
      emergencyContact,
      businessInfo,
      personalInfo: { email, password, ...personalInfo },
      leaseInfo: { roomId, ...leaseInfo }
    } = body;

    // Check Room Availability
    const existingRoom = await Room.findById(roomId);
    if (!existingRoom || existingRoom.status !== 'vacant') {
      return res.status(400).json({
        success: false,
        message: 'Room is not available'
      });
    }

    // Check Existing Tenant
    const existingTenant = await Tenant.findOne({ email });
    if (existingTenant) {
      return res.status(409).json({
        success: false,
        message: 'Tenant already exists'
      });
    }

    // Create Tenant
    const hashedPassword = await bcrypt.hash(password, 10);
    const tenant = await Tenant.create({
      emergencyContact,
      businessInfo,
      ...personalInfo,
      email,
      password: hashedPassword
    });

    if (!tenant) {
      return res.status(400).json({ success: false, message: "Failed to create a tenant!" })
    }

    // Create Lease
    const lease = await Lease.create({
      ...leaseInfo,
      tenantId: tenant._id,
      roomId
    });

    if (!lease) {
      await Tenant.findByIdAndDelete(tenant._id);
      return res.status(400).json({ success: false, message: "Failed to create a lease!" })
    }

    // Update Room Status
    const updatedRoom = await Room.findByIdAndUpdate(roomId, {
      status: 'occupied',
      // $push: { leaseHistory: lease._id }
    });

    if (updatedRoom.status !== 'occupied') {
      await Lease.findByIdAndDelete(lease._id);
      await Tenant.findByIdAndDelete(tenant._id);
      return res.status(400).json({ success: false, message: "Failed to update room status!" })
    }

    // Link Lease to Tenant
    const updatedTenant = await Tenant.findByIdAndUpdate(
      tenant._id,
      { $set: { leaseId: lease._id } },
      { new: true }
    ).populate({
      path: "leaseId",
      populate: {
        path: "roomId",
        model: "Room",
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Tenant created successfully',
      data: updatedTenant
    });

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