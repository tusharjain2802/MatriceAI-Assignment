const Project = require('../models/Project');
const User = require('../models/User');

// Get all projects (for admins, team leaders, or team members)
const getProjects = async (req, res) => {
  try {
    let projects; 
           
    if (req.user.designation === 'admin') {
      projects = await Project.find().populate('teamLeader teamMembers');
      console.log(projects);
      
    } else if (req.user.designation === 'team leader') {
      projects = await Project.find({ teamLeader: req.user._id }).populate('teamLeader teamMembers');
    } else {
      projects = await Project.find({ teamMembers: req.user._id }).populate('teamLeader teamMembers');
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a project (admin only)
const addProject = async (req, res) => {
  const { name, description, deadline, teamLeader, teamMembers } = req.body;
  try {
    const project = new Project({
      name,
      description,
      deadline,
      teamLeader,
      teamMembers,
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit a project (admin only)
const editProject = async (req, res) => {
  const { name, description, deadline, teamLeader, teamMembers } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.name = name || project.name;
    project.description = description || project.description;
    project.deadline = deadline || project.deadline;
    project.teamLeader = teamLeader || project.teamLeader;
    project.teamMembers = teamMembers || project.teamMembers;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a project (admin only)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await project.remove();
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a project by ID (view details)
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('teamLeader teamMembers');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProjects,
  addProject,
  editProject,
  deleteProject,
  getProjectById,
};
