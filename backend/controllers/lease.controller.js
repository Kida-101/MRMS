import Lease from '../models/lease.model.js'

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
    const leases = await Lease.find();
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
    const lease = await Lease.findById(id);
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
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: "Lease id is required" })
  }
  try {
    const lease = await Lease.findByIdAndDelete(id);
    if (!lease) {
      return res.status(404).json({ success: false, message: "Lease not found" })
    }
    res.status(200).json({ success: true, message: "Lease deleted successfully" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};
