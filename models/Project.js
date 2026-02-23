
import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency', required: true },
    location: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['Full-time', 'Internship', 'Part-time']
    },
    salary: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'Closed'],
        default: 'Open'
    },
    skills: [String],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Agency user
        required: true
    }
}, {
    timestamps: true // This will act as postedDate
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
