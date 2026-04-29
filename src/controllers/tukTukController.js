// TukTuk Controller - manages registered three-wheeler vehicles
// Supports filtering by district, province and status
// Only hq_admin can register or delete tuk-tuk records

import TukTuk from '../models/TukTuk.js';

export const createTukTuk = async (req, res) => {
  try {
    const tukTuk = await TukTuk.create(req.body);
    res.status(201).json(tukTuk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTukTuks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.district) filter.district = req.query.district;
    if (req.query.province) filter.province = req.query.province;
    if (req.query.status) filter.status = req.query.status;
    const tukTuks = await TukTuk.find(filter)
      .populate('district')
      .populate('province')
      .populate('assignedStation');
    res.json(tukTuks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTukTuk = async (req, res) => {
  try {
    const tukTuk = await TukTuk.findById(req.params.id)
      .populate('district')
      .populate('province')
      .populate('assignedStation');
    if (!tukTuk) return res.status(404).json({ message: 'TukTuk not found' });
    res.json(tukTuk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTukTuk = async (req, res) => {
  try {
    const tukTuk = await TukTuk.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tukTuk) return res.status(404).json({ message: 'TukTuk not found' });
    res.json(tukTuk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTukTuk = async (req, res) => {
  try {
    const tukTuk = await TukTuk.findByIdAndDelete(req.params.id);
    if (!tukTuk) return res.status(404).json({ message: 'TukTuk not found' });
    res.json({ message: 'TukTuk deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};