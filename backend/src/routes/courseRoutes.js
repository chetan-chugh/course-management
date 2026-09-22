const express = require('express');

const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');


const router = express.Router();

// Get all courses
router.get('/', getCourses);

// Create a course
router.post('/',  createCourse);

// Get one course
router.get('/:id', getCourseById);

// Update a course
router.put('/:id', updateCourse);

// Delete a course
router.delete('/:id', deleteCourse);

module.exports = router;