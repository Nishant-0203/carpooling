import express from 'express';
import { submitContact } from '../controllers/contact.controller.js'; // ✅ Make sure this is correct

const router = express.Router();

router.post('/', submitContact);

export default router;
