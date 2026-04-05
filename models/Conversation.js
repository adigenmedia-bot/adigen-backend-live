
import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: false, // Make content optional since we can send only attachment
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    attachment: {
        url: { type: String },
        type: { type: String },
        name: { type: String }
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
