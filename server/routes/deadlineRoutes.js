const express = require('express');
const { protect, admin, teamLeader } = require('../middleware/authMiddleware');
const {
  getProjectDeadlines,
  getTaskDeadlines,
} = require('../controllers/deadlineController');

const router = express.Router();

// Get project deadlines
router.get('/projects', protect, getProjectDeadlines);

// Get task deadlines by project
router.get('/tasks/:projectId', protect, getTaskDeadlines);

module.exports = router;
