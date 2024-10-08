const asyncHandler = require('./asyncHandler');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password'); // Ensure you're using the correct property name
      next();
    } catch (err) {
      console.error(err); // Log the full error for debugging
      if (err.name === 'TokenExpiredError') {
        res.status(401);
        throw new Error('Not authorized, token has expired');
      } else {
        res.status(401);
        throw new Error('Not authorized, token is invalid');
      }
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};
module.exports = { protect, admin };
