
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import courses from './data/courses.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import connectDB from '../db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Course.deleteMany();

        await User.insertMany(users);
        await Course.insertMany(courses);

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
