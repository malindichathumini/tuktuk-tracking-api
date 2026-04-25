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

/**
 * @swagger
 * /api/tuktuk:
 *   get:
 *     summary: Get all tuk-tuks
 *     tags: [TukTuk]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: district
 *         schema:
 *           type: string
 *       - in: query
 *         name: province
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tuk-tuks
 *   post:
 *     summary: Register a new tuk-tuk
 *     tags: [TukTuk]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registrationNumber:
 *                 type: string
 *               driverName:
 *                 type: string
 *               driverNIC:
 *                 type: string
 *               driverPhone:
 *                 type: string
 *               district:
 *                 type: string
 *               province:
 *                 type: string
 *     responses:
 *       201:
 *         description: TukTuk registered
 */
router.get('/', protect, getTukTuks);
router.post('/', protect, authorize('hq_admin', 'station_officer'), createTukTuk);

/**
 * @swagger
 * /api/tuktuk/{id}:
 *   get:
 *     summary: Get tuk-tuk by ID
 *     tags: [TukTuk]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TukTuk data
 *       404:
 *         description: TukTuk not found
 *   put:
 *     summary: Update tuk-tuk
 *     tags: [TukTuk]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TukTuk updated
 *   delete:
 *     summary: Delete tuk-tuk
 *     tags: [TukTuk]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TukTuk deleted
 */
router.get('/:id', protect, getTukTuk);
router.put('/:id', protect, authorize('hq_admin', 'station_officer'), updateTukTuk);
router.delete('/:id', protect, authorize('hq_admin'), deleteTukTuk);

export default router;