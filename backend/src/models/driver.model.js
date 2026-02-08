import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const driverSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  carnumber: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  }
}, { timestamps: true });

// 🔐 Hash password before saving
driverSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error('Error hashing password:', error.message);
    next(error);
  }
});

// 🔍 Compare passwords during login
driverSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    console.error('Error comparing password:', error.message);
    throw error;
  }
};

// 🎟️ Generate JWT token for Driver
driverSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign(
      { _id: this._id, role: "Driver" },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    return token;
  } catch (error) {
    console.error('Error generating token:', error.message);
    throw error;
  }
};

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;
