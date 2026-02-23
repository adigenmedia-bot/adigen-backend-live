
import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});


const conversationSchema = mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [messageSchema]
}, {
    timestamps: true // This will give createdAt and updatedAt for the whole conversation
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
