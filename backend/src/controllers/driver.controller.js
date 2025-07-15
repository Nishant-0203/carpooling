import Driver from "../models/driver.model.js";

export const registerDriver = async (req, res) => {
  const { name, email, password, gender,phone,carnumber } = req.body;

  try {
    const DriverExists = await Driver.findOne({ email });
    if (DriverExists) {
      console.log(`❌ Registration failed: Driver with email ${email} already exists`);
      return res.status(400).json({ message: 'Driver already exists' });
    }

    const newDriver = new Driver({ name, email, password, gender,phone,carnumber });
    await newDriver.save();

    const token = newDriver.generateAuthToken();

    console.log(`✅ Driver registered successfully: ${newDriver.email}`);

    res.status(201).json({
      message: 'Driver registered successfully',
      token,
      Driver: { id: newDriver._id, name: newDriver.name, email: newDriver.email,carnumber: newDriver.carnumber,phone: newDriver.phone }
    });
  } catch (error) {
    console.error(`❌ Server error during Driver registration:`, error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginDriver = async (req, res) => {
  const { email, password } = req.body;

  try {
    const Driver = await Driver.findOne({ email });
    if (!Driver) {
      console.log(`❌ Login failed: Driver with email ${email} not found`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await Driver.comparePassword(password);
    if (!isMatch) {
      console.log(`❌ Login failed: Incorrect password for ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = Driver.generateAuthToken();

    console.log(`✅ Driver logged in successfully: ${email}`);

    res.status(200).json({
      message: 'Login successful',
      token,
      Driver: { id: Driver._id, name: Driver.name, email: Driver.email }
    });
  } catch (error) {
    console.error(`❌ Server error during Driver login:`, error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
