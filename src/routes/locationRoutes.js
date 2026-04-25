import express from 'express';
import {
  createPing,
  getLastLocation,
  getLocationHistory,
  getAllLastLocations
} from '../controllers/locationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/location/ping:
 *   post:
 *     summary: Submit a location ping
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tukTuk:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               speed:
 *                 type: number
 *     responses:
 *       201:
 *         description: Ping recorded
 */
router.post('/ping', protect, createPing);

/**
 * @swagger
 * /api/location/live:
 *   get:
 *     summary: Get last known location of all tuk-tuks
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Live locations
 */
router.get('/live', protect, authorize('hq_admin', 'station_officer'), getAllLastLocations);

/**
 * @swagger
 * /api/location/{tukTukId}/last:
 *   get:
 *     summary: Get last known location of a tuk-tuk
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tukTukId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Last location
 *       404:
 *         description: No location found
 */
router.get('/:tukTukId/last', protect, authorize('hq_admin', 'station_officer'), getLastLocation);

/**
 * @swagger
 * /api/location/{tukTukId}/history:
 *   get:
 *     summary: Get location history of a tuk-tuk
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tukTukId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Location history
 */
router.get('/:tukTukId/history', protect, authorize('hq_admin', 'station_officer'), getLocationHistory);

export default router;