const Task = require('../models/Task');
const Project = require('../models/Project');

// Get all tasks (for admins, team leaders, or team members)
const getTasks = async (req, res) => {
  try {
    let tasks;
  
    if (req.user.designation === 'admin') {
      tasks = await Task.find().populate('project assignedTo');
    } else if (req.user.designation === 'project manager') {
      const projects = await Project.find({ teamLeader: req.user._id });
      console.log(projects);
      tasks = await Task.find({ project: { $in: projects.map(p => p._id) } }).populate('project assignedTo');
    } else {
      tasks = await Task.find({ assignedTo: req.user._id }).populate('project assignedTo');
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addTask = async (req, res) => {
  const { name, description, deadline, project, assignedTo } = req.body;
  try {
    // Ensure the team leader can only add tasks to their own projects
    if (req.user.role === 'project manager') {
      const validProject = await Project.findOne({ _id: project, teamLeader: req.user._id });
      if (!validProject) {
        return res.status(403).json({ message: 'Not authorized to add tasks to this project' });
      }
    }
    const task = new Task({
      name,
      description,
      deadline,
      project,
      assignedTo,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const editTask = async (req, res) => {
  const { name, description, deadline, project, assignedTo } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    if (req.user.role === 'project manager') {
      const validProject = await Project.findOne({ _id: task.project, teamLeader: req.user._id });
      if (!validProject) {
        return res.status(403).json({ message: 'Not authorized to edit tasks in this project' });
      }
    }

    task.name = name || task.name;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;
    task.project = project || task.project;
    task.assignedTo = assignedTo || task.assignedTo;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.user.role === 'project manager') {
      const validProject = await Project.findOne({ _id: task.project, teamLeader: req.user._id });
      if (!validProject) {
        return res.status(403).json({ message: 'Not authorized to delete tasks in this project' });
      }
    }

    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project assignedTo');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTasks,
  addTask,
  editTask,
  deleteTask,
  getTaskById,
};
