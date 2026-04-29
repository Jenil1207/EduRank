const express = require('express');
const router = express.Router();
const { getColleges, getCollegeById, getStates } = require('../controllers/college.controller');

router.get('/', getColleges);
router.get('/states', getStates);
router.get('/:id', getCollegeById);

module.exports = router;
