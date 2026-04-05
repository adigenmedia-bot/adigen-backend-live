import User from '../models/User.js';
import Conversation from '../models/Conversation.js';

// Search users
export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.json([]);
        const users = await User.find({
            name: { $regex: query, $options: 'i' }
        }, 'name email role _id initials followers');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Follow a user
export const followUser = async (req, res) => {
    try {
        const { currentUserId, targetUserId } = req.body;
        if (currentUserId === targetUserId) return res.status(400).json({ message: "Cannot follow yourself" });

        await User.findByIdAndUpdate(currentUserId, { $addToSet: { following: targetUserId } });
        await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: currentUserId } });

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
    try {
        const { currentUserId, targetUserId } = req.body;
        
        await User.findByIdAndUpdate(currentUserId, { $pull: { following: targetUserId } });
        await User.findByIdAndUpdate(targetUserId, { $pull: { followers: currentUserId } });

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Start a new chat explicitly
export const startChat = async (req, res) => {
    try {
        const { currentUserId, targetUserId } = req.body;
        
        // Check if conversation already exists
        let conversation = await Conversation.findOne({
            participants: { $all: [currentUserId, targetUserId] }
        });
        
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [currentUserId, targetUserId],
                messages: []
            });
        }
        res.json(conversation);
    } catch (e) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get user app data
export const getAppData = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('appData');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user.appData || {});
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user app data
export const updateAppData = async (req, res) => {
    try {
        const { id } = req.params;
        const { key, data } = req.body;
        
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!user.appData) user.appData = {};
        user.appData[key] = data;
        
        user.markModified('appData');
        await user.save();
        
        res.json({ success: true, appData: user.appData });
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
};
