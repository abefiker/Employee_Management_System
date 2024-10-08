const asyncHandler = require('../middlerware/asyncHandler');
const User = require('../model/userModel');

const generateToken = require('../utils/generateToken');
// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide both email and password');
  }

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,  // Include phone number
      position: user.position,  // Include position
      department: user.department,  // Include department
      hireDate: user.hireDate,  // Include hire date
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Email already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password, // The password will be hashed in the model
  });

  if (user) {
    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,  // Include phone number
      position: user.position,  // Include position
      department: user.department,  // Include department
      hireDate: user.hireDate,  // Include hire date
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: 'logout successful',
  });
});
//@desc Get user Profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,  // Include phone number
      position: user.position,  // Include position
      department: user.department,  // Include department
      hireDate: user.hireDate,  // Include hire date
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
//@desc update user Profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = await user.encryptPassword(req.body.password);
    }
    const updatedUser = await user.save();
    generateToken(updatedUser._id, res);
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: user.phone,  // Include phone number
      position: user.position,  // Include position
      department: user.department,  // Include department
      hireDate: user.hireDate,  // Include hire date
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
//@desc get users List
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error('Users not found');
  }
});
//@desc get users By ID
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
//@desc Delete user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Admins can not be deleted');
    }
    await user.deleteOne({ _id: user._id });
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
//@desc Delete user
//@route DELETE /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone; // Update phone number
    user.position = req.body.position || user.position; // Update position
    user.department = req.body.department || user.department; // Update department
    user.hireDate = req.body.hireDate || user.hireDate; // Update hire date
    if (req.body.password) {
      user.password = await user.encryptPassword(req.body.password);
    }
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: user.phone,  // Include phone number
      position: user.position,  // Include position
      department: user.department,  // Include department
      hireDate: user.hireDate,  // Include hire date
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserById,
  getUsers,
  getUserProfile,
  updateUser,
  deleteUser,
  updateUserProfile,
};
