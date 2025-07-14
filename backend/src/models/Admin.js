import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: { type: String, required: true, minlength: 6 }
}, { timestamps: true });

// 🔐 Hash password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("✅ Password hashed successfully for admin:", this.email);
    next();
  } catch (error) {
    console.error("❌ Error hashing password:", error.message);
    next(error);
  }
});

// 🔍 Compare passwords during login
adminSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log(`🔍 Password match: ${isMatch}`);
    return isMatch;
  } catch (error) {
    console.error("❌ Error comparing password:", error.message);
    throw error;
  }
};

// 🎟️ Generate JWT token for admin
adminSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign(
      { _id: this._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    console.log("🎟️ JWT token generated for admin:", this.email);
    return token;
  } catch (error) {
    console.error("❌ Error generating token:", error.message);
    throw error;
  }
};

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
