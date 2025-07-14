import Admin from '../models/Admin.js';

export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      console.log(`❌ Registration failed: Admin with email ${email} already exists`);
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    const token = newAdmin.generateAuthToken();

    console.log(`✅ Admin registered successfully: ${newAdmin.email}`);

    res.status(201).json({
      message: 'Admin registered successfully',
      token,
      admin: { id: newAdmin._id, name: newAdmin.name, email: newAdmin.email }
    });
  } catch (error) {
    console.error(`❌ Server error during admin registration:`, error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log(`❌ Login failed: Admin with email ${email} not found`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      console.log(`❌ Login failed: Incorrect password for ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = admin.generateAuthToken();

    console.log(`✅ Admin logged in successfully: ${email}`);

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email }
    });
  } catch (error) {
    console.error(`❌ Server error during admin login:`, error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
