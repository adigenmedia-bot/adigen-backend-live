import express from 'express';
import { searchUsers, followUser, unfollowUser, startChat, getAppData, updateAppData } from '../controllers/userController.js';

const router = express.Router();

router.get('/search', searchUsers);
router.post('/follow', followUser);
router.post('/unfollow', unfollowUser);
router.post('/start-chat', startChat);

router.get('/:id/appData', getAppData);
router.put('/:id/appData', updateAppData);

export default router;
