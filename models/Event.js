
import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['Workshop', 'Seminar', 'Conference', 'Webinar', 'Cultural Fest']
    },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    location: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
        default: 'Upcoming'
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // College Admin user
        required: true
    },
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
