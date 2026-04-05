import express from 'express';
import { getCourses, createCourse, seedCourses } from '../controllers/courseController.js';

const router = express.Router();

router.get('/', getCourses);
router.post('/', createCourse);
router.post('/seed', seedCourses);

export default router;
