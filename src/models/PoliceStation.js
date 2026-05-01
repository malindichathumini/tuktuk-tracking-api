// PoliceStation Model - stores police station registry data
// Each station is mapped to a district and province
// Used for operational filtering of tuk-tuk location data

import mongoose from 'mongoose';

const policeStationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  province: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true },
  address: { type: String },
  contactNumber: { type: String },
}, { timestamps: true });

export default mongoose.model('PoliceStation', policeStationSchema);