import LocationPing from '../models/LocationPing.js';
import TukTuk from '../models/TukTuk.js';

export const createPing = async (req, res) => {
  try {
    const { tukTuk, latitude, longitude, speed } = req.body;
    const ping = await LocationPing.create({ tukTuk, latitude, longitude, speed });
    res.status(201).json(ping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLastLocation = async (req, res) => {
  try {
    const ping = await LocationPing.findOne({ tukTuk: req.params.tukTukId })
      .sort({ timestamp: -1 })
      .populate('tukTuk');
    if (!ping) return res.status(404).json({ message: 'No location found' });
    res.json(ping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLocationHistory = async (req, res) => {
  try {
    const { tukTukId } = req.params;
    const { from, to } = req.query;
    const filter = { tukTuk: tukTukId };
    if (from || to) {
      filter.timestamp = {};
      if (from) filter.timestamp.$gte = new Date(from);
      if (to) filter.timestamp.$lte = new Date(to);
    }
    const pings = await LocationPing.find(filter)
      .sort({ timestamp: -1 })
      .limit(100)
      .populate('tukTuk');
    res.json(pings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllLastLocations = async (req, res) => {
  try {
    const tukTuks = await TukTuk.find({ isActive: true });
    const locations = await Promise.all(
      tukTuks.map(async (t) => {
        const ping = await LocationPing.findOne({ tukTuk: t._id })
          .sort({ timestamp: -1 });
        return { tukTuk: t, lastPing: ping };
      })
    );
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};