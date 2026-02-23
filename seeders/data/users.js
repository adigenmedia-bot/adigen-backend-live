
import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Aditya Sharma',
    email: 'aditya.sharma@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'Student / Freelancer',
  },
  {
    name: 'Admin User',
    email: 'admin@college.edu',
    password: bcrypt.hashSync('123456', 10),
    role: 'College Admin',
  },
  {
    name: 'Partner Inc.',
    email: 'contact@partnerinc.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'Agency Partner',
  },
];

export default users;
