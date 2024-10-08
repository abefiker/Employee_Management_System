const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
  getUserById,
  getUsers,
  getUserProfile,
  updateUser,
  deleteUser,
  updateUserProfile,
  createUser,
} = require('../controller/userController');
const { protect, admin } = require('../middlerware/authMiddleware');

router.route('/register').post(registerUser);

// Route for creating a user (admin only)
router.route('/').post(protect, admin, createUser).get(protect, admin, getUsers);
router.route('/auth').post(authUser);
router.route('/logout').post(protect, logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);
module.exports = router;
