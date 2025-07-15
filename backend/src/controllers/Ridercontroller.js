import Rider from "../models/rider.js";

// Save or update rider profile
export const saveRiderProfile = async (req, res) => {
  try {
    const { name, email, phone, gender, dob } = req.body;

    let rider = await Rider.findOne({ email });

    if (rider) {
      // Update existing rider
      rider.name = name;
      rider.phone = phone;
      rider.gender = gender;
      rider.dob = dob;
      await rider.save();
      return res.status(200).json({ message: "Profile updated", rider });
    } else {
      // Create new rider
      rider = new Rider({ name, email, phone, gender, dob });
      await rider.save();
      return res.status(201).json({ message: "Profile created", rider });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get rider profile by email
export const getRiderProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const rider = await Rider.findOne({ email });

    if (!rider) return res.status(404).json({ message: "rider not found" });

    res.status(200).json(rider);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
