const Task = require('../models/Task');
const Project = require('../models/Project');

// Get project deadlines (sorted by nearest deadline)
const getProjectDeadlines = async (req, res) => {
  try {
    let projects;

    if (req.user.designation === 'admin') {
      projects = await Project.find().sort({ deadline: 1 });
    } else {
      projects = await Project.find({
        $or: [
          { teamLeader: req.user._id },
          { teamMembers: req.user._id },
        ],
      }).sort({ deadline: 1 });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get task deadlines for a specific project (sorted by nearest deadline)
const getTaskDeadlines = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .sort({ deadline: 1 })
      .populate('project assignedTo');

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProjectDeadlines,
  getTaskDeadlines,
};
