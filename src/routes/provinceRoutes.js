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

/**
 * @swagger
 * /api/provinces:
 *   get:
 *     summary: Get all provinces
 *     tags: [Provinces]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of provinces
 *   post:
 *     summary: Create a province
 *     tags: [Provinces]
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
 *     responses:
 *       201:
 *         description: Province created
 */
router.get('/', protect, getProvinces);
router.post('/', protect, authorize('hq_admin'), createProvince);

/**
 * @swagger
 * /api/provinces/{id}:
 *   get:
 *     summary: Get province by ID
 *     tags: [Provinces]
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
 *         description: Province data
 *       404:
 *         description: Province not found
 *   put:
 *     summary: Update province
 *     tags: [Provinces]
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
 *         description: Province updated
 *   delete:
 *     summary: Delete province
 *     tags: [Provinces]
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
 *         description: Province deleted
 */
router.get('/:id', protect, getProvince);
router.put('/:id', protect, authorize('hq_admin'), updateProvince);
router.delete('/:id', protect, authorize('hq_admin'), deleteProvince);

export default router;