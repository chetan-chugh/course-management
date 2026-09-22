const Course = require('../models/Course');

// GET /courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    if(courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No courses found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Courses fetched successfully',
      data: courses
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch courses'
    });
  }
};

// GET /courses/:id
const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Course fetched successfully',
      data: course
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid course ID'
    });
  }
};

// POST /courses
const createCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      duration,
      instructor,
      level
    } = req.body;

    // Validation
    if (!name || name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Course name must be at least 3 characters'
      });
    }

    if (!description || description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Description must be at least 10 characters'
      });
    }

    if (price === undefined || price === '') {
      return res.status(400).json({
        success: false,
        message: 'Price is required'
      });
    }

    if (isNaN(price) || Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a valid positive number'
      });
    }

    if (!duration || !duration.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Duration is required'
      });
    }

    // Duplicate check (case-insensitive, exact name match)
    const trimmedName = name.trim();
    const existingCourse = await Course.findOne({
      name: { $regex: `^${trimmedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' }
    });

    if (existingCourse) {
      return res.status(409).json({
        success: false,
        message: 'This course already exists'
      });
    }

    const course = await Course.create({
      name: trimmedName,
      description: description.trim(),
      price: Number(price),
      duration: duration.trim(),
      instructor: instructor ? instructor.trim() : '',
      level: level || 'Beginner'
    });

    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This course already exists'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to create course'
    });
  }
};

// PUT /courses/:id
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const {
      name,
      description,
      price,
      duration,
      instructor,
      level
    } = req.body;

    // Validation
    if (name !== undefined && name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Course name must be at least 3 characters'
      });
    }

    if (description !== undefined && description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Description must be at least 10 characters'
      });
    }

    if (price !== undefined && (isNaN(price) || Number(price) < 0)) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a valid positive number'
      });
    }

    if (duration !== undefined && !duration.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Duration cannot be empty'
      });
    }

    const updates = {};

    if (name !== undefined) updates.name = name.trim();
    if (description !== undefined) updates.description = description.trim();
    if (price !== undefined) updates.price = Number(price);
    if (duration !== undefined) updates.duration = duration.trim();
    if (instructor !== undefined) updates.instructor = instructor.trim();
    if (level !== undefined) updates.level = level;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: updatedCourse
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid course ID'
    });
  }
};

// DELETE /courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    await course.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid course ID'
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};