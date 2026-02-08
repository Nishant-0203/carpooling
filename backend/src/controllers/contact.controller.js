import Contact from '../models/contact.model.js';

export const submitContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Message submitted successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
