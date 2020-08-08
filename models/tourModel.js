const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'name is required'],
      maxlength: [40, 'tour name must not exceed 40 characters '],
      minlength: [10, 'tour name must have at least  10 characters '],
      // validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    slug: String,
    duration: {
      type: String,
      required: [true, 'duration is required'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'group size required'],
    },
    difficulty: {
      type: String,
      required: [true, 'difficulty required'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either- easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Ratings must be above 1.0'],
      max: [5, 'Ratings must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this points only to the current document upon creation
          return val < this.price;
        },
        message:
          'the price discount ({VALUE}) cannot be greater than the price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'summary is required'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'an image cover is required'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    location: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Document Middleware only works for .save() and .create() only
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Query Middleware
// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  next();
});

// Aggregate Middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

// virtual properties
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
