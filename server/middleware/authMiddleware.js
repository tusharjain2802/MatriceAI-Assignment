const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user.isApproved) {
        return res.status(403).json({ message: 'Your account is not approved by the admin yet.' });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

exports.admin = (req, res, next) => {  
  if (req.user && req.user.designation === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

exports.projectManager = (req, res, next) => {
  if (req.user && req.user.designation === 'project manager') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as project manager' });
  }
};

exports.teamMember = (req, res, next) => {
  if (req.user && req.user.designation === 'team member') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as team member' });
  }
};

exports.isApproved = (req, res, next) => {
  if (req.user && req.user.isApproved === true) {
    next();
  } else {
    res.status(403).json({ message: 'Not an approved member' });
  }
};