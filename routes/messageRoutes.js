import express from 'express';
import { getConversations, sendMessage, updateOnlineStatus, getOnlineStatus } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/conversations/:userId', getConversations);
router.post('/send', sendMessage);
router.post('/status', updateOnlineStatus);
router.get('/status', getOnlineStatus);

export default router;
