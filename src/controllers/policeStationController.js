// Police Station Controller - manages police station registry
// Stations are mapped to districts and provinces
// Supports filtering by district and province for operational use

import PoliceStation from '../models/PoliceStation.js';

export const createPoliceStation = async (req, res) => {
  try {
    const { name, code, district, province, address, contactNumber } = req.body;
    const station = await PoliceStation.create({ name, code, district, province, address, contactNumber });
    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPoliceStations = async (req, res) => {
  try {
    const filter = {};
    if (req.query.district) filter.district = req.query.district;
    if (req.query.province) filter.province = req.query.province;
    const stations = await PoliceStation.find(filter)
      .populate('district')
      .populate('province');
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPoliceStation = async (req, res) => {
  try {
    const station = await PoliceStation.findById(req.params.id)
      .populate('district')
      .populate('province');
    if (!station) return res.status(404).json({ message: 'Police station not found' });
    res.json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePoliceStation = async (req, res) => {
  try {
    const station = await PoliceStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!station) return res.status(404).json({ message: 'Police station not found' });
    res.json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePoliceStation = async (req, res) => {
  try {
    const station = await PoliceStation.findByIdAndDelete(req.params.id);
    if (!station) return res.status(404).json({ message: 'Police station not found' });
    res.json({ message: 'Police station deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};