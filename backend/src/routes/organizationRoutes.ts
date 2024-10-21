import express from 'express';
import { createOrganization } from '../database/db';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const orgId = await createOrganization(req.body);
    res.status(201).json({ id: orgId, message: 'Organization created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the organization' });
  }
});

export default router;