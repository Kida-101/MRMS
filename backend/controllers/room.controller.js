import Room from '../models/room.model.js';

export const createRoom = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ success: false, message: "Room data is required" });
  }

  try {
    const room = await Room.create(data);
    if (!room) {
      return res.status(400).json({ success: false, message: "Failed to create a room" });
    }
    res.status(201).json({ success: true, message: "Room created successfully", data: room })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    if (!rooms) {
      return res.status(404).json({ success: false, message: "Rooms not found" });
    }
    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateRoom = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  if (!data) {
    return res.status(400).json({ success: false, message: "Room data is required" });
  }

  try {
    const room = await Room.findByIdAndUpdate(id, data, { new: true });
    if (!room) {
      return res.status(400).json({ success: false, message: "Failed to update a room" });
    }
    res.status(200).json({ success: true, message: "Room updated successfully", data: room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByIdAndDelete(id);
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }
    res.status(200).json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
