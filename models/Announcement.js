
import mongoose from 'mongoose';

const announcementSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    audience: {
        type: String,
        required: true,
        enum: ['All', 'Students', 'Faculty'],
        default: 'All'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Published', 'Draft'],
        default: 'Draft'
    }
}, {
    timestamps: true
});

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;
