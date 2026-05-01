// LocationPing Model - stores GPS location data for each tuk-tuk
// Records latitude, longitude, speed and timestamp
// Supports time-window queries for movement history analysis

import mongoose from 'mongoose';

const locationPingSchema = new mongoose.Schema({
  tukTuk: { type: mongoose.Schema.Types.ObjectId, ref: 'TukTuk', required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  speed: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District' },
  province: { type: mongoose.Schema.Types.ObjectId, ref: 'Province' },
}, { timestamps: true });

export default mongoose.model('LocationPing', locationPingSchema);