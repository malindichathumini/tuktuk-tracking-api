import Province from '../models/Province.js';

export const createProvince = async (req, res) => {
  try {
    const { name, code } = req.body;
    const province = await Province.create({ name, code });
    res.status(201).json(province);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProvinces = async (req, res) => {
  try {
    const provinces = await Province.find();
    res.json(provinces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProvince = async (req, res) => {
  try {
    const province = await Province.findById(req.params.id);
    if (!province) return res.status(404).json({ message: 'Province not found' });
    res.json(province);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProvince = async (req, res) => {
  try {
    const province = await Province.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!province) return res.status(404).json({ message: 'Province not found' });
    res.json(province);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProvince = async (req, res) => {
  try {
    const province = await Province.findByIdAndDelete(req.params.id);
    if (!province) return res.status(404).json({ message: 'Province not found' });
    res.json({ message: 'Province deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};