const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'invalid email'],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      validate: {
        validator: (v) => /^\d{10}$/.test(v), // Adjust regex for your phone number format
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    hireDate: {
      type: Date,
      required: [true, 'Hire date is required'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
