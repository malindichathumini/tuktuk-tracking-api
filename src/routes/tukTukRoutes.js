import express from 'express';
import {
  createTukTuk,
  getTukTuks,
  getTukTuk,
  updateTukTuk,
  deleteTukTuk
} from '../controllers/tukTukController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getTukTuks);
router.get('/:id', protect, getTukTuk);
router.post('/', protect, authorize('hq_admin', 'station_officer'), createTukTuk);
router.put('/:id', protect, authorize('hq_admin', 'station_officer'), updateTukTuk);
router.delete('/:id', protect, authorize('hq_admin'), deleteTukTuk);

export default router;