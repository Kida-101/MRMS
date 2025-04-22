import Room from "../models/room.model.js";
import Tenant from "../models/tenant.model.js";
import Lease from "../models/lease.model.js";

export const createRoom = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "Room data is required" });
  }

  try {
    const room = await Room.create(data);
    if (!room) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create a room" });
    }
    res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: room,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("leaseId").populate("tenantId").sort({createdAt: -1});
    if (!rooms) {
      return res
        .status(404)
        .json({ success: false, message: "Rooms not found" });
    }
    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVacantRooms = async (req, res) => {
  try {
    const vacantRooms = await Room.find({ status: "vacant" });
    if (!vacantRooms) {
      return res
        .status(404)
        .json({ success: false, message: "Vacant rooms not found" });
    }
    res.status(200).json({ success: true, data: vacantRooms });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch vacant rooms", error: err });
  }
};

export const getRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id).populate("leaseId").populate("tenantId");
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "Room data is required" });
  }

  try {
    const existingRoom = await Room.findById(id);
    if (!existingRoom) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    // If status changed from 'occupied' to 'vacant', delete related tenant and lease
    if (
      existingRoom.status === "occupied" &&
      data.status === "vacant" &&
      existingRoom.tenantId &&
      existingRoom.leaseId
    ) {
      await Tenant.findByIdAndDelete(existingRoom.tenantId);
      await Lease.findByIdAndDelete(existingRoom.leaseId);
      data.tenantId = null;
      data.leaseId = null;
    }

    const updatedRoom = await Room.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: updatedRoom,
    });
  } catch (error) {
    console.error("Update room error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    // if the room has a tenant don't delete the room
    if (room.tenantId) {
      return res.status(400).json({
        success: false,
        message: "Room has a tenant, can't be deleted",
      });
    }

    // delete the room
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to delete a room" });
    }

    res
      .status(200)
      .json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
