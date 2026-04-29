const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  fees: { type: Number, required: true },
});

const reviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'College name is required'],
      trim: true,
      index: true,
    },
    location: { type: String, required: true },
    city: { type: String, required: true, index: true },
    state: { type: String, required: true, index: true },
    type: {
      type: String,
      required: true,
      enum: ['Public', 'Private', 'Deemed'],
      index: true,
    },
    rating: { type: Number, required: true, min: 0, max: 5 },
    totalFees: { type: Number, required: true, index: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    establishedYear: { type: Number },
    placementPct: { type: Number, required: true, min: 0, max: 100 },
    avgPackage: { type: Number, required: true },
    courses: [courseSchema],
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

// Text index for search
collegeSchema.index({ name: 'text', city: 'text', state: 'text' });

module.exports = mongoose.model('College', collegeSchema);
