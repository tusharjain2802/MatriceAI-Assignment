const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getPendingUsers,
  approveUser,
  removeUser,
  createProject,
  updateProject,
  createTask,
  updateTask,
  getProjects,
  getProjectById,
} = require('../controllers/adminController');

const router = express.Router();

router.get('/users/pending', protect, admin, getPendingUsers);
router.put('/users/approve/:id', protect, admin, approveUser);
router.delete('/users/:id', protect, admin, removeUser);

router.post('/projects', protect, admin, createProject);
router.put('/projects/:id', protect, admin, updateProject);
router.get('/projects', protect, admin, getProjects);
router.get('/projects/:id', protect, admin, getProjectById);

router.post('/tasks', protect, admin, createTask);
router.put('/tasks/:id', protect, admin, updateTask);

module.exports = router;
