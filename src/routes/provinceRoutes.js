import express from 'express';
import {
  createProvince,
  getProvinces,
  getProvince,
  updateProvince,
  deleteProvince
} from '../controllers/provinceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getProvinces);
router.get('/:id', protect, getProvince);
router.post('/', protect, authorize('hq_admin'), createProvince);
router.put('/:id', protect, authorize('hq_admin'), updateProvince);
router.delete('/:id', protect, authorize('hq_admin'), deleteProvince);

export default router;