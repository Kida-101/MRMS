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
  const { id } = req.params;
  const data = req.body;

  if (!id || !data) {
    return res.status(400).json({
      success: false,
      message: "Lease id and data is required"
    });
  }

  try {
    const existingLease = await Lease.findById(id);
    if (!existingLease) {
      return res.status(404).json({
        success: false,
        message: "Lease not found"
      });
    }

    // Only one update to trigger middleware
    await Lease.updateOne({ _id: id }, data);
    const updatedLease = await Lease.findById(id);

    res.status(200).json({
      success: true,
      message: "Lease updated successfully",
      data: updatedLease
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteLease = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete lease (middleware will handle tenant and room updates)
    const result = await Lease.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Lease not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lease and tenant deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}