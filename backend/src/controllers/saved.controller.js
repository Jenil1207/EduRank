const User = require('../models/User');
const College = require('../models/College');

const getSaved = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'savedColleges',
        select: 'name location city state type rating totalFees imageUrl placementPct avgPackage',
      })
      .lean();

    res.json({ success: true, data: user.savedColleges });
  } catch (error) {
    next(error);
  }
};

const saveCollege = async (req, res, next) => {
  try {
    const { collegeId } = req.body;

    if (!collegeId) {
      return res.status(400).json({ success: false, message: 'College ID is required.' });
    }

    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found.' });
    }

    const user = await User.findById(req.user._id);
    if (user.savedColleges.includes(collegeId)) {
      return res.status(409).json({ success: false, message: 'College already saved.' });
    }

    user.savedColleges.push(collegeId);
    await user.save();

    res.status(201).json({ success: true, message: 'College saved successfully.' });
  } catch (error) {
    next(error);
  }
};

const unsaveCollege = async (req, res, next) => {
  try {
    const { collegeId } = req.params;

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { savedColleges: collegeId },
    });

    res.json({ success: true, message: 'College removed from saved.' });
  } catch (error) {
    next(error);
  }
};

const getCompare = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'compareList',
        select: 'name location city state type rating totalFees placementPct avgPackage courses',
      })
      .lean();

    res.json({ success: true, data: user.compareList });
  } catch (error) {
    next(error);
  }
};

const updateCompare = async (req, res, next) => {
  try {
    const { collegeIds } = req.body;

    if (!Array.isArray(collegeIds)) {
      return res.status(400).json({ success: false, message: 'collegeIds must be an array.' });
    }

    if (collegeIds.length > 3) {
      return res.status(400).json({ success: false, message: 'You can compare at most 3 colleges.' });
    }

    await User.findByIdAndUpdate(req.user._id, { compareList: collegeIds });

    res.json({ success: true, message: 'Compare list updated.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSaved, saveCollege, unsaveCollege, getCompare, updateCompare };
