
const allCoursesData = [
  { 
    id: 'react-adv-patterns',
    title: 'Advanced React Patterns', 
    instructor: 'Jane Doe', 
    image: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg',
    price: 899,
    rating: 4.8,
    reviews: 2453,
    description: 'Take your React skills to the next level by mastering advanced patterns like Render Props, Higher-Order Components, Compound Components, and custom hooks for maximum code reusability and performance.',
    whatYoullLearn: [
        'Master advanced React design patterns',
        'Build highly reusable and performant components',
        'Understand the trade-offs of different state management strategies',
        'Write cleaner, more maintainable React code'
    ],
    curriculum: [
      {
        id: 'ch1',
        title: 'Chapter 1: Introduction to Advanced Patterns',
        items: [
          { id: 'l1-1', title: '1.1 - Welcome to the Course', type: 'video', duration: '02:30', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4' },
          { id: 'l1-2', title: '1.2 - Render Props Pattern', type: 'video', duration: '15:45', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4' },
          { id: 'l1-3', title: '1.3 - Higher-Order Components (HOCs)', type: 'video', duration: '18:10', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4' },
        ]
      },
      {
        id: 'ch2',
        title: 'Chapter 2: State Management & Hooks',
        items: [
          { id: 'l2-1', title: '2.1 - The Compound Components Pattern', type: 'video', duration: '12:20', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4' },
          { id: 'l2-2', title: '2.2 - Custom Hooks for Logic Reuse', type: 'video', duration: '20:05', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4' },
          { 
            id: 'q2-1', 
            title: 'Quiz: Hooks and Patterns', 
            type: 'quiz',
            questions: [
              { id: 'qq1', question: 'What is a primary benefit of the Render Props pattern?', options: ['Styling components', 'Sharing code between components', 'Making API requests', 'Managing global state'], correctAnswerIndex: 1 },
              { id: 'qq2', question: 'A Higher-Order Component (HOC) is a function that takes a component and returns a...?', options: ['New component', 'DOM element', 'State object', 'Hook'], correctAnswerIndex: 0 },
              { id: 'qq3', question: 'Custom hooks in React must start with which word?', options: ['custom', 'hook', 'react', 'use'], correctAnswerIndex: 3 },
            ] 
          },
        ]
      }
    ]
  },
  { 
    id: 'nodejs-masterclass',
    title: 'Node.js Masterclass', 
    instructor: 'John Smith', 
    image: 'https://img-c.udemycdn.com/course/480x270/1672410_9ff1_5.jpg',
    price: 499,
    rating: 4.9,
    reviews: 50189,
    description: 'Learn Node.js from scratch. Build fast, scalable, and secure RESTful APIs with Node, Express, MongoDB, and Mongoose. Covers authentication, file uploads, and deploying to production.',
    whatYoullLearn: [
        'Build enterprise-level backend applications',
        'Master the Node.js event loop and asynchronous programming',
        'Create and deploy RESTful APIs',
        'Work with MongoDB and Mongoose for data persistence'
    ],
    curriculum: [] 
  },
  { 
    id: 'ui-ux-fundamentals',
    title: 'UI/UX Design Fundamentals', 
    instructor: 'Sarah Adams', 
    image: 'https://img-c.udemycdn.com/course/480x270/3142166_cdaa_4.jpg',
    price: 599,
    rating: 4.6,
    reviews: 9872,
    description: 'A comprehensive guide to UI/UX design. Learn about user research, wireframing, prototyping, and visual design principles to create user-friendly and beautiful digital products.',
    whatYoullLearn: [
        'Understand the full UX design process',
        'Create wireframes and interactive prototypes in Figma',
        'Conduct user research and usability testing',
        'Apply visual design principles like color theory and typography'
    ],
    curriculum: [] 
  },
  { 
    id: 'python-data-structures',
    title: 'Data Structures in Python', 
    instructor: 'Michael Brown', 
    image: 'https://img-c.udemycdn.com/course/480x270/2485240_d405_7.jpg',
    price: 499,
    rating: 4.7,
    reviews: 12450,
    description: 'Master the most important data structures and algorithms in Python. This course covers arrays, linked lists, stacks, queues, trees, graphs, and more, with practical coding examples.',
    whatYoullLearn: [
        'Implement common data structures from scratch in Python',
        'Analyze the time and space complexity of algorithms',
        'Solve common coding interview questions',
        'Strengthen your foundational computer science knowledge'
    ],
    curriculum: [] 
  },
  {
    id: 'web-dev-bootcamp-2024',
    title: 'The Complete 2024 Web Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    rating: 4.8,
    reviews: 18834,
    price: 499,
    image: 'https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg',
    description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps.',
    whatYoullLearn: [
      'Build 16 web development projects for your portfolio',
      'Master the latest technologies, including Javascript, React, Node and even Web3 development',
      'Learn the command line, Git, and other professional developer tools',
      'Work as a freelance web developer'
    ],
    curriculum: []
  },
];

export default allCoursesData;
