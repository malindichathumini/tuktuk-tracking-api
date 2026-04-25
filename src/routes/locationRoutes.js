import express from 'express';
import {
  createPing,
  getLastLocation,
  getLocationHistory,
  getAllLastLocations
} from '../controllers/locationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/ping', protect, createPing);
router.get('/live', protect, authorize('hq_admin', 'station_officer'), getAllLastLocations);
router.get('/:tukTukId/last', protect, authorize('hq_admin', 'station_officer'), getLastLocation);
router.get('/:tukTukId/history', protect, authorize('hq_admin', 'station_officer'), getLocationHistory);

export default router;