export interface TopicProgressInput {
  userId: string;
  topicId: string;
  completed: boolean;
  progress: number;
}

export interface ChapterProgressInput {
  userId: string;
  topicId: string;
  completed: boolean;
  progress: number;
}

export interface Topic {
  id: string;
  name: string;
  chapterId: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  name: string;
  unitId: string;
  createdAt: string;
  updatedAt: string;
  topics?: Topic[];
}

export interface Unit {
  id: string;
  name: string;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  chapters?: Chapter[];
}

export interface Subject {
  id: string;
  name: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  units?: Unit[];
}

export interface Course {
  id: string;
  name: string;
  description?: string;
  goalId: string;
  createdAt: string;
  updatedAt: string;
  subjects?: Subject[];
}

export interface Goal {
  id: string;
  name: string;
  board: string;
  grade: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  courses?: Course[];
}

export interface TopicProgress {
  id: string;
  userId: string;
  topicId: string;
  completed: boolean;
  progress: number;
  completedAt?: string;
  topic?: Topic;
}

export interface UnitProgress {
  id: string;
  userId: string;
  unitId: string;
  completed: boolean;
  completedAt?: string;
  unit?: Unit;
}

export interface UserProgressResponse {
  topicProgress: TopicProgress[];
  unitProgress: UnitProgress[];
}

export interface Topic {
  id: string;
  description: string;
  duration: number;
  tags: string[];
  title: string;
  videoUrl: string;
  name: string;
  chapterId: string;
  youtubeUrl?: string;
}

export interface Chapter {
  id: string;
  name: string;
  unitId: string;
  topics?: Topic[];
}

export interface Unit {
  id: string;
  name: string;
  subjectId: string;
  chapters?: Chapter[];
}

export interface Subject {
  id: string;
  name: string;
  courseId: string;
  units?: Unit[];
}


export interface TopicProgress {
  id: string;
  userId: string;
  topicId: string;
  completed: boolean;
  progress: number;
  completedAt?: string;
}

export interface UserProgressResponse {
  id: string;
  userId?: string;
  topicProgress: TopicProgress[];
}

export interface TopicProgressInput {
  userId: string;
  topicId: string;
  completed: boolean;
  progress: number;
}

export interface UserGoal {
  id: string; // userGoal Id
    userId: string;
    goalId: string;
    goal: Goal;
}