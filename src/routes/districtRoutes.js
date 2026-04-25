import express from 'express';
import {
  createDistrict,
  getDistricts,
  getDistrict,
  updateDistrict,
  deleteDistrict
} from '../controllers/districtController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getDistricts);
router.get('/:id', protect, getDistrict);
router.post('/', protect, authorize('hq_admin'), createDistrict);
router.put('/:id', protect, authorize('hq_admin'), updateDistrict);
router.delete('/:id', protect, authorize('hq_admin'), deleteDistrict);

export default router;