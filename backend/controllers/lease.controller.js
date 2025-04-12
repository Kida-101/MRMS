import Lease from '../models/lease.model.js'
import Tenant from '../models/lease.model.js'
import Room from '../models/lease.model.js'
import mongoose from 'mongoose';

export const createLease = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ success: false, message: "Lease data is not working" })
  }
  try {
    const lease = await Lease.create(data);
    if (!lease) {
      return res.status(400).json({ success: false, message: "Lease not created successfully" })
    }
    res.status(201).json({ success: true, message: "Lease created successfully", data: lease })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

export const getLeases = async (req, res) => {
  try {
    const leases = await Lease.find().populate("tenantId").populate("roomId").sort({ createdAt: -1 });
    if (!leases) {
      return res.status(404).json({ success: false, message: "Leases not found" })
    }
    res.status(200).json({ success: true, message: "Leases retrieved successfully", data: leases })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

export const getLease = async (req, res) => {
  const { id } = req.params;
  try {
    const lease = await Lease.findById(id).populate("tenantId").populate("roomId").sort({ createdAt: -1 });
    if (!lease) {
      return res.status(404).json({ success: false, message: "Lease not found" })
    }
    res.status(200).json({ success: true, message: "Lease retrieved successfully", data: lease })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

export const updateLease = async (req, res) => {
  const { id } = req.params
  const data = req.body;
  if (!id || !data) {
    return res.status(400).json({ success: false, message: "Lease id and data is required" })
  }
  try {
    const lease = await Lease.findByIdAndUpdate(id, data, { new: true });
    if (!lease) {
      return res.status(404).json({ success: false, message: "Lease not found" })
    }
    res.status(200).json({ success: true, message: "Lease updated successfully", data: lease })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

export const deleteLease = async (req, res) => {
  const { roomId, tenantId, leaseId } = req.query;
  
  // Fixed validation
  if (!roomId || !tenantId || !leaseId) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields: roomId, tenantId, leaseId" 
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Delete Lease
    const lease = await Lease.findByIdAndDelete(leaseId).session(session);
    if (!lease) {
      await session.abortTransaction();
      return res.status(404).json({ 
        success: false, 
        message: "Lease not found" 
      });
    }

    // 2. Delete Tenant
    const tenant = await Tenant.findByIdAndDelete(tenantId).session(session);
    if (!tenant) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "Tenant not found"
      });
    }

    // 3. Update Room Status - Fixed update operation
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $set: { status: 'vacant' } },
      { new: true, session }
    );

    if (!updatedRoom) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    await session.commitTransaction();
    res.status(200).json({ 
      success: true, 
      message: "Lease deleted successfully",
      data: {
        deletedLease: lease,
        deletedTenant: tenant,
        updatedRoom
      }
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Delete lease error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.stack // Remove in production
    });
  } finally {
    session.endSession();
  }
};