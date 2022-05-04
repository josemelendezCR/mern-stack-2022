const express = require('express');
const router = express.Router();
const { getGoals, createGoal, deleteGoal, updateGoal } = require('../controllers/goalController');

// Get goals
router.get('/', getGoals);

// Create goal
router.post('/', createGoal);

// Update goal by ID
router.put('/:id', updateGoal);

// Delete goal by ID
router.delete('/:id', deleteGoal);


module.exports = router;