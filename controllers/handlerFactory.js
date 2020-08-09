const APIFeatures = require('../utils/APIFeatures');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');

exports.getAll = (Model) =>
  catchAsyncError(async (req, res, next) => {
    // execute query

    // to allow for nested reviews on tours
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const docs = await features.query;
    // explains the query
    // const docs = await features.query.explain();

    // send response
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsyncError(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;
    // cosnt doc = await Model.findOne({_id: req.params.id})  ---- an alternative way

    if (!doc) {
      return next(new AppError(`This document can't be found`, 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
exports.createOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    // get id from url
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`This document can't be found`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    // get id from url
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError(`This document can't be found`, 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
