const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');

const { registerUser, loginUser, getUser } = require('../controllers/userController');

// Register user
router.post('/', registerUser);

// Login user
router.post('/login', loginUser);

// Get user
router.get('/', protect, getUser);

module.exports = router;