import type { UserProfile, StudyMaterial, Group, Notification } from '../types';

export const mockUsers: UserProfile[] = [
    { 
        id: 'me', 
        name: 'Alex Johnson', 
        avatar: 'https://picsum.photos/id/237/100/100', 
        bio: 'Computer Science major with a passion for web development and machine learning. Currently brewing my third coffee of the day.', 
        courses: ['Advanced Algorithms', 'Machine Learning', 'Web Development Capstone', 'Database Systems'],
        performanceStats: { studySessions: 42, totalFocusTime: 1050, materialsShared: 5 }
    },
    { 
        id: 2, 
        name: 'Jane Doe', 
        avatar: 'https://picsum.photos/id/1/100/100', 
        bio: 'Lover of literature and history. Trying to make sense of the past, one book at a time.', 
        courses: ['Modernist Literature', 'Roman History', 'Creative Writing Workshop'],
        performanceStats: { studySessions: 28, totalFocusTime: 700, materialsShared: 2 }
    },
    { 
        id: 3, 
        name: 'Dr. Smith', 
        avatar: 'https://picsum.photos/id/433/100/100', 
        bio: 'Chemistry professor. My goal is to make organic chemistry less intimidating!', 
        courses: ['Organic Chemistry I & II', 'Advanced Synthesis Lab'],
        performanceStats: { studySessions: 15, totalFocusTime: 375, materialsShared: 1 }
    },
    { 
        id: 4, 
        name: 'CodeAcademy', 
        avatar: 'https://picsum.photos/id/10/100/100', 
        bio: 'Online platform for learning to code.', 
        courses: ['Full Stack Development', 'Python for Everybody', 'Data Science Path'],
        performanceStats: { studySessions: 150, totalFocusTime: 3750, materialsShared: 25 }
    },
];

export const mockStudyMaterials: StudyMaterial[] = [
  { 
    id: 1, 
    authorId: 2,
    authorName: 'Jane Doe',
    authorAvatar: 'https://picsum.photos/id/1/100/100',
    title: 'Introduction to Calculus - Chapter 1 Notes', 
    description: 'Comprehensive notes covering limits and continuity. Perfect for first-year students.', 
    type: 'Notes', 
    date: '2 days ago', 
    tags: ['calculus', 'math', 'freshman'],
    reactions: { like: 15, celebrate: 4, insightful: 9 },
    comments: [
        { id: 1, authorId: 3, authorName: 'Dr. Smith', authorAvatar: 'https://picsum.photos/id/433/100/100', content: 'Very well-structured notes! Great job.', date: '1 day ago' }
    ]
  },
  { 
    id: 2, 
    authorId: 3,
    authorName: 'Dr. Smith',
    authorAvatar: 'https://picsum.photos/id/433/100/100',
    title: 'Organic Chemistry Reaction Mechanisms', 
    description: 'A quick tutorial on key SN1 and SN2 reaction mechanisms with animations.', 
    type: 'Reel', 
    date: '5 days ago', 
    tags: ['chemistry', 'organic', 'video'],
    reactions: { like: 42, celebrate: 18, insightful: 25 },
    comments: [
        { id: 2, authorId: 'me', authorName: 'Alex Johnson', authorAvatar: 'https://picsum.photos/id/237/100/100', content: 'This was so helpful for my exam!', date: '3 days ago' },
        { id: 3, authorId: 2, authorName: 'Jane Doe', authorAvatar: 'https://picsum.photos/id/1/100/100', content: 'Wow, the animations make it so much clearer.', date: '2 days ago' }
    ]
  },
  { 
    id: 3, 
    authorId: 2,
    authorName: 'Jane Doe',
    authorAvatar: 'https://picsum.photos/id/1/100/100',
    title: 'The Fall of the Roman Empire: A Summary', 
    description: 'A well-researched article on the economic and social factors leading to the fall of Rome.', 
    type: 'Article', 
    date: '1 week ago', 
    tags: ['history', 'rome', 'article'],
    reactions: { like: 22, celebrate: 3, insightful: 14 },
    comments: []
  },
  { 
    id: 4, 
    authorId: 4,
    authorName: 'CodeAcademy',
    authorAvatar: 'https://picsum.photos/id/10/100/100',
    title: 'Full Stack Development Roadmap PDF', 
    description: 'A complete guide outlining the technologies and steps to become a full-stack developer.', 
    type: 'PDF', 
    date: '2 weeks ago', 
    tags: ['programming', 'webdev', 'full-stack'],
    reactions: { like: 152, celebrate: 45, insightful: 88 },
    comments: [
        { id: 4, authorId: 'me', authorName: 'Alex Johnson', authorAvatar: 'https://picsum.photos/id/237/100/100', content: 'This is the roadmap I\'ve been looking for!', date: '1 week ago' }
    ]
  },
  {
    id: 5,
    authorId: 'me',
    authorName: 'Alex Johnson',
    authorAvatar: 'https://picsum.photos/id/237/100/100',
    title: 'My Favorite JavaScript Snippets',
    description: 'A collection of useful JS snippets I use every day for DOM manipulation and array methods.',
    type: 'Notes',
    date: '3 days ago',
    tags: ['javascript', 'webdev', 'snippets'],
    reactions: { like: 8, celebrate: 1, insightful: 5 },
    comments: []
  }
];

export const mockGroups: Group[] = [
  { 
    id: 1, 
    name: 'Quantum Physics Study Group', 
    description: 'Weekly discussions on advanced topics in quantum mechanics.', 
    creatorId: 'me',
    adminIds: ['me', 2],
    memberIds: ['me', 2, 3],
    themeColor: 'blue',
    quickEmoji: '⚛️',
    nicknames: { 'me': 'Quantum Alex', 2: 'Dr. Jane' },
    chatHistory: [
        { id: 1, authorId: 2, authorName: 'Jane Doe', authorAvatar: 'https://picsum.photos/id/1/100/100', content: 'Hey everyone, ready for this week\'s topic on superposition?', timestamp: '10:30 AM' },
        { id: 2, authorId: 'me', authorName: 'Alex Johnson', authorAvatar: 'https://picsum.photos/id/237/100/100', content: 'Absolutely! I found a great article on it, let me find the link.', timestamp: '10:32 AM' },
    ]
  },
  { 
    id: 2, 
    name: 'React Final Project Team', 
    description: 'Collaborating on the final project for the Advanced React course.', 
    creatorId: 'me',
    adminIds: ['me'],
    memberIds: ['me', 4],
    themeColor: 'teal',
    quickEmoji: '👍',
    nicknames: {},
    chatHistory: [
        { id: 1, authorId: 'me', authorName: 'Alex Johnson', authorAvatar: 'https://picsum.photos/id/237/100/100', content: 'I pushed the latest changes for the state management refactor. Can someone review my PR?', timestamp: 'Yesterday' },
    ]
  },
  { 
    id: 3, 
    name: 'History of Ancient Rome', 
    description: 'A casual group for enthusiasts of Roman history.', 
    creatorId: 2,
    adminIds: [2],
    memberIds: [2, 3, 'me'],
    themeColor: 'pink',
    quickEmoji: '🏛️',
    nicknames: { 3: 'The Senator' },
    chatHistory: []
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'new_comment',
    isRead: false,
    actorName: 'Dr. Smith',
    actorAvatar: 'https://picsum.photos/id/433/100/100',
    message: "commented on your post: <strong>My Favorite...</strong>",
    timestamp: '2m ago',
    link: '/study-feed',
  },
  {
    id: 2,
    type: 'new_mention',
    isRead: false,
    actorName: 'Jane Doe',
    actorAvatar: 'https://picsum.photos/id/1/100/100',
    message: "mentioned you in <strong>Quantum Physics...</strong>",
    timestamp: '1h ago',
    link: '/groups/1',
  },
  {
    id: 3,
    type: 'group_invite',
    isRead: true,
    actorName: 'CodeAcademy',
    actorAvatar: 'https://picsum.photos/id/10/100/100',
    message: "invited you to join <strong>Web Dev Wizards</strong>",
    timestamp: '3d ago',
    link: '/groups/4', // Assuming a group with id 4 exists
  },
  {
    id: 4,
    type: 'new_comment',
    isRead: true,
    actorName: 'Jane Doe',
    actorAvatar: 'https://picsum.photos/id/1/100/100',
    message: "replied to your comment on <strong>Organic...</strong>",
    timestamp: '5d ago',
    link: '/study-feed',
  },
];