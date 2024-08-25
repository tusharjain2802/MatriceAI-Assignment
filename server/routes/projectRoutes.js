const express = require('express');
const { protect, admin, isApproved } = require('../middleware/authMiddleware');
const {
  getProjects,
  addProject,
  editProject,
  deleteProject,
  getProjectById,
} = require('../controllers/projectController');

const router = express.Router();

// Get all projects (admin)
router.get('/', protect, isApproved, getProjects);

// Add a project (admin only)
router.post('/', protect, admin, addProject);

// Edit a project (admin only)
router.put('/:id', protect, admin, editProject);

// Delete a project (admin only)
router.delete('/:id', protect, admin, deleteProject);

// Get a project by ID (view details)
router.get('/:id', protect, isApproved, getProjectById);

module.exports = router;
