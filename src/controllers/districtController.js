import District from '../models/District.js';

export const createDistrict = async (req, res) => {
  try {
    const { name, code, province } = req.body;
    const district = await District.create({ name, code, province });
    res.status(201).json(district);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDistricts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.province) filter.province = req.query.province;
    const districts = await District.find(filter).populate('province');
    res.json(districts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDistrict = async (req, res) => {
  try {
    const district = await District.findById(req.params.id).populate('province');
    if (!district) return res.status(404).json({ message: 'District not found' });
    res.json(district);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDistrict = async (req, res) => {
  try {
    const district = await District.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!district) return res.status(404).json({ message: 'District not found' });
    res.json(district);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDistrict = async (req, res) => {
  try {
    const district = await District.findByIdAndDelete(req.params.id);
    if (!district) return res.status(404).json({ message: 'District not found' });
    res.json({ message: 'District deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};