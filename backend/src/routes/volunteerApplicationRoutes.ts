import express from 'express';
import { createVolunteerApplication } from '../database/db';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const applicationId = await createVolunteerApplication(req.body);
    res.status(201).json({ id: applicationId, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'An error occurred while submitting the application' });
  }
});

export default router;