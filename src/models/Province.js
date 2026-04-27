// Province Model - stores Sri Lanka administrative province data
// Contains name and unique code for each province
// Referenced by District and TukTuk models

import mongoose from 'mongoose';

const provinceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model('Province', provinceSchema);