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

/**
 * @swagger
 * /api/districts:
 *   get:
 *     summary: Get all districts
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: province
 *         schema:
 *           type: string
 *         description: Filter by province ID
 *     responses:
 *       200:
 *         description: List of districts
 *   post:
 *     summary: Create a district
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               province:
 *                 type: string
 *     responses:
 *       201:
 *         description: District created
 */
router.get('/', protect, getDistricts);
router.post('/', protect, authorize('hq_admin'), createDistrict);

/**
 * @swagger
 * /api/districts/{id}:
 *   get:
 *     summary: Get district by ID
 *     tags: [Districts]
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
 *         description: District data
 *       404:
 *         description: District not found
 *   put:
 *     summary: Update district
 *     tags: [Districts]
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
 *         description: District updated
 *   delete:
 *     summary: Delete district
 *     tags: [Districts]
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
 *         description: District deleted
 */
router.get('/:id', protect, getDistrict);
router.put('/:id', protect, authorize('hq_admin'), updateDistrict);
router.delete('/:id', protect, authorize('hq_admin'), deleteDistrict);

export default router;