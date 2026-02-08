import Driver from "../models/driver.model.js";

export const registerDriver = async (req, res) => {
  const { name, email, password, gender,phone,carnumber } = req.body;

  try {
    const DriverExists = await Driver.findOne({ email });
    if (DriverExists) {
      return res.status(400).json({ message: 'Driver already exists' });
    }

    const newDriver = new Driver({ name, email, password, gender,phone,carnumber });
    await newDriver.save();

    const token = newDriver.generateAuthToken();

res.status(201).json({
  message: 'Driver registered successfully',
  token,
  driver: { _id: newDriver._id, name: newDriver.name, email: newDriver.email, carnumber: newDriver.carnumber, phone: newDriver.phone }
});
  } catch (error) {
    console.error('Server error during Driver registration:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginDriver = async (req, res) => {
  const { email, password } = req.body;

  try {
const driver = await Driver.findOne({ email });
if (!driver) {
  return res.status(400).json({ message: 'Invalid credentials' });
}

const isMatch = await driver.comparePassword(password);
if (!isMatch) {
  return res.status(400).json({ message: 'Invalid credentials' });
}

const token = driver.generateAuthToken();

res.status(200).json({
  message: 'Login successful',
  token,
  driver: { _id: driver._id, name: driver.name, email: driver.email, carnumber: driver.carnumber, phone: driver.phone, gender: driver.gender }
});
  } catch (error) {
    console.error('Server error during Driver login:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
