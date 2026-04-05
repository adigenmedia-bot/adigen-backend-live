import Conversation from '../models/Conversation.js';
import User from '../models/User.js';

// Get conversations for a specific user
export const getConversations = async (req, res) => {
    try {
        const userId = req.params.userId;
        let conversations = await Conversation.find({ participants: userId })
            .populate('participants', 'name email role isOnline lastActive')
            .populate('messages.sender', 'name email')
            .sort({ updatedAt: -1 });

        // Auto-create a welcome conversation if they have no messages (e.g. newly registered user)
        if (conversations.length === 0) {
            const admin = await User.findOne({ role: 'College Admin' });
            if (admin && admin._id.toString() !== userId) {
                await Conversation.create({
                    participants: [admin._id, userId],
                    messages: [{
                        sender: admin._id,
                        content: "Hello! Welcome to the AdiGen platform. If you need any assistance, feel free to reply here."
                    }]
                });

                // Refetch to include the newly populated conversation properly
                conversations = await Conversation.find({ participants: userId })
                    .populate('participants', 'name email role isOnline lastActive')
                    .populate('messages.sender', 'name email')
                    .sort({ updatedAt: -1 });
            }
        }

        // Map to client format
        const formatted = conversations.map(c => ({
            id: c._id.toString(),
            participants: c.participants.map(p => ({
                id: p._id.toString(),
                name: p.name,
                avatarInitials: p.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
                isOnline: p.isOnline,
                lastActive: p.lastActive
            })),
            messages: c.messages.map(m => ({
                id: m._id.toString(),
                senderId: m.sender._id.toString(),
                text: m.content || '',
                timestamp: m.createdAt,
                isRead: true,
                isDeleted: m.isDeleted,
                attachment: m.attachment || null
            }))
        }));

        res.json(formatted);
    } catch (error) {
        console.error("Error fetching conversations:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Send a message
export const sendMessage = async (req, res) => {
    try {
        const { conversationId, senderId, text, attachment } = req.body;
        
        let conversation;
        if (conversationId && conversationId !== 'new') {
            conversation = await Conversation.findById(conversationId);
            if (!conversation) {
                return res.status(404).json({ message: "Conversation not found" });
            }
            conversation.messages.push({
                sender: senderId,
                content: text,
                attachment: attachment || undefined
            });
            await conversation.save();
        } else {
            // New conversation logic can be added here if needed, 
            // for now, we expect an existing conversation ID.
            return res.status(400).json({ message: "Invalid conversation ID" });
        }

        res.status(201).json(conversation);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update online status
export const updateOnlineStatus = async (req, res) => {
    try {
        const { userId, isOnline } = req.body;
        await User.findByIdAndUpdate(userId, { 
            isOnline,
            lastActive: Date.now()
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all online statuses
export const getOnlineStatus = async (req, res) => {
    try {
        const users = await User.find({}, '_id isOnline lastActive');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete/Unsend a message
export const deleteMessage = async (req, res) => {
    try {
        const { conversationId, messageId } = req.params;
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) return res.status(404).json({ message: "Not found" });
        
        const message = conversation.messages.id(messageId);
        if (message) {
            message.isDeleted = true;
            await conversation.save();
        }
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ message: "Error" });
    }
};
