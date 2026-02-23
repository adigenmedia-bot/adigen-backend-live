
import mongoose from 'mongoose';

const milestoneSchema = mongoose.Schema({
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'In Progress'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    },
    paymentDate: { type: Date }
});

const contractSchema = mongoose.Schema({
    projectTitle: { type: String, required: true },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Completed', 'On Hold', 'Terminated'],
        default: 'Active'
    },
    milestones: [milestoneSchema]
}, {
    timestamps: true
});

const Contract = mongoose.model('Contract', contractSchema);

export default Contract;
