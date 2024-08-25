const express = require('express');
const { protect, admin, teamLeader } = require('../middleware/authMiddleware');
const {
  getTasks,
  addTask,
  editTask,
  deleteTask,
  getTaskById,
} = require('../controllers/taskController');

const router = express.Router();

// Get all tasks
router.get('/', protect, getTasks);

// Add a task (admin and team leader only)
router.post('/', protect, addTask);

// Edit a task (admin and team leader only)
router.put('/:id', protect, editTask);

// Delete a task (admin and team leader only)
router.delete('/:id', protect, deleteTask);

// Get a task by ID
router.get('/:id', protect, getTaskById);

module.exports = router;
