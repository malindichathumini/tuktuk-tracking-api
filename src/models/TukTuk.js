import mongoose from 'mongoose';

const tukTukSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  driverNIC: { type: String, required: true, unique: true },
  driverPhone: { type: String },
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  province: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true },
  assignedStation: { type: mongoose.Schema.Types.ObjectId, ref: 'PoliceStation' },
  deviceId: { type: String, unique: true, sparse: true },
  isActive: { type: Boolean, default: true },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'suspended'], 
    default: 'active' 
  },
}, { timestamps: true });

export default mongoose.model('TukTuk', tukTukSchema);