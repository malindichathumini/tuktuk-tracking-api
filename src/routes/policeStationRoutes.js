import express from 'express';
import {
  createPoliceStation,
  getPoliceStations,
  getPoliceStation,
  updatePoliceStation,
  deletePoliceStation
} from '../controllers/policeStationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getPoliceStations);
router.get('/:id', protect, getPoliceStation);
router.post('/', protect, authorize('hq_admin'), createPoliceStation);
router.put('/:id', protect, authorize('hq_admin'), updatePoliceStation);
router.delete('/:id', protect, authorize('hq_admin'), deletePoliceStation);

export default router;