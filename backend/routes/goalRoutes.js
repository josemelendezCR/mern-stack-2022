const express = require('express');
const router = express.Router();
const { getGoals, createGoal, deleteGoal, updateGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

// Get goals
router.get('/', protect, getGoals);

// Create goal
router.post('/', protect, createGoal);

// Update goal by ID
router.put('/:id', protect, updateGoal);

// Delete goal by ID
router.delete('/:id', protect, deleteGoal);


module.exports = router;