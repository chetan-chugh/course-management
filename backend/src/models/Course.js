const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
      minlength: [3, 'Course name must be at least 3 characters'],
      maxlength: [100, 'Course name must be at most 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [2000, 'Description must be at most 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
      maxlength: [50, 'Duration must be at most 50 characters'],
    },
    instructor: {
      type: String,
      trim: true,
      default: '',
      maxlength: [80, 'Instructor name must be at most 80 characters'],
    },
    level: {
      type: String,
      enum: {
        values: ['Beginner', 'Intermediate', 'Advanced'],
        message: 'Level must be Beginner, Intermediate or Advanced',
      },
      default: 'Beginner',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
