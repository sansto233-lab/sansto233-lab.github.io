export type Theme = 'light' | 'dark';

// FIX: Define and export WebSource type for grounding metadata
export interface WebSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  id: number;
  authorId: string | number;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  // FIX: Add optional sources property to support AI researcher sources
  sources?: WebSource[];
}

export interface Group {
  id: number;
  name: string;
  description: string;
  creatorId: string | number;
  adminIds: (string | number)[];
  memberIds: (string | number)[];
  chatHistory: ChatMessage[];
  themeColor?: string;
  quickEmoji?: string;
  nicknames?: Record<string | number, string>;
}

export interface SchoolAnnouncement {
  id: number;
  title: string;
  content: string;
  date: string;
}

export type ReactionType = 'like' | 'celebrate' | 'insightful';

export interface Reactions {
  like: number;
  celebrate: number;
  insightful: number;
}

export interface Comment {
  id: number;
  authorId: string | number;
  authorName: string;
  authorAvatar: string;
  content: string;
  date: string;
}

export interface StudyMaterial {
  id: number;
  authorId: string | number;
  authorName: string;
  authorAvatar: string;
  title: string;
  description: string;
  type: 'PDF' | 'Reel' | 'Article' | 'Notes';
  date: string;
  tags: string[];
  reactions: Reactions;
  comments: Comment[];
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface PerformanceStats {
  studySessions: number;
  totalFocusTime: number; // in minutes
  materialsShared: number;
}

export interface UserProfile {
    id: string | number;
    name: string;
    avatar: string;
    bio: string;
    courses: string[];
    performanceStats: PerformanceStats;
}

export type NotificationType = 'new_comment' | 'new_mention' | 'group_invite';

export interface Notification {
  id: number;
  type: NotificationType;
  isRead: boolean;
  actorName: string;
  actorAvatar: string;
  message: string; // Can contain HTML for bolding
  timestamp: string;
  link: string;
}
