const College = require('../models/College');
const { collegeQuerySchema } = require('../validators/college.validator');

const getColleges = async (req, res, next) => {
  try {
    const parsed = collegeQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.errors.map((e) => e.message).join(', '),
      });
    }

    const {
      search,
      state,
      type,
      minFees,
      maxFees,
      minRating,
      page,
      limit,
      sortBy,
      sortOrder,
    } = parsed.data;

    const filter = {};

    // Text search
    if (search && search.trim()) {
      filter.$text = { $search: search.trim() };
    }

    // State filter
    if (state && state !== 'all') {
      filter.state = { $regex: new RegExp(`^${state}$`, 'i') };
    }

    // Type filter
    if (type && type !== 'all') {
      filter.type = type;
    }

    // Fees range filter
    if (minFees !== undefined || maxFees !== undefined) {
      filter.totalFees = {};
      if (minFees !== undefined) filter.totalFees.$gte = minFees;
      if (maxFees !== undefined) filter.totalFees.$lte = maxFees;
    }

    // Rating filter
    if (minRating !== undefined) {
      filter.rating = { $gte: minRating };
    }

    // Sorting
    const sortOptions = {};
    if (search && !sortBy) {
      sortOptions.score = { $meta: 'textScore' };
    } else if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    } else {
      sortOptions.rating = -1;
    }

    const skip = (page - 1) * limit;
    const total = await College.countDocuments(filter);

    let query = College.find(filter)
      .select('name location city state type rating totalFees imageUrl placementPct avgPackage establishedYear')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

    if (search && !sortBy) {
      query = query.select({ score: { $meta: 'textScore' } });
    }

    const colleges = await query;

    res.json({
      success: true,
      data: colleges,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCollegeById = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id).lean();

    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found.' });
    }

    res.json({ success: true, data: college });
  } catch (error) {
    next(error);
  }
};

const getStates = async (req, res, next) => {
  try {
    const states = await College.distinct('state');
    res.json({ success: true, data: states.sort() });
  } catch (error) {
    next(error);
  }
};

module.exports = { getColleges, getCollegeById, getStates };
