
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import courses from './data/courses.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Conversation from '../models/Conversation.js';
import connectDB from '../db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Course.deleteMany();

        await User.insertMany(users);
        await Course.insertMany(courses);

        // Fetch the inserted users to get their generated _ids
        const insertedUsers = await User.find();
        
        if (insertedUsers.length >= 2) {
            const admin = insertedUsers.find(u => u.role === 'College Admin');
            const student = insertedUsers.find(u => u.role === 'Student / Freelancer');
            
            if (admin && student) {
                await Conversation.create({
                    participants: [admin._id, student._id],
                    messages: [
                        { sender: admin._id, content: "Hello! Welcome to AdiGen platform." },
                        { sender: student._id, content: "Thank you! I'm excited to get started." }
                    ]
                });
                console.log('Seeded a conversation');
            }
        }

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Course.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
