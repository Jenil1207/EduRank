const express = require('express');
const router = express.Router();
const {
  getSaved,
  saveCollege,
  unsaveCollege,
  getCompare,
  updateCompare,
} = require('../controllers/saved.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect); // All saved routes require auth

router.get('/', getSaved);
router.post('/', saveCollege);
router.delete('/:collegeId', unsaveCollege);

router.get('/compare', getCompare);
router.put('/compare', updateCompare);

module.exports = router;
