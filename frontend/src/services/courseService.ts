import { api } from "../lib/axios";
import {
  Goal,
  Course,
  Subject,
  Chapter,
  TopicProgress,
  TopicProgressInput,
  UserProgressResponse,
  ChapterProgressInput
} from "../types/course";

class CourseService {
  private static instance: CourseService;

  private constructor() {}

  static getInstance(): CourseService {
    if (!CourseService.instance) {
      CourseService.instance = new CourseService();
    }
    return CourseService.instance;
  }

  async getGoals(): Promise<Goal[]> {
    return api.get<Goal[]>("/goals").then((res) => res.data);
  }

  async createGoal(data: Omit<Goal, "id" | "courses" | "createdAt" | "updatedAt">): Promise<Goal> {
    return api.post<Goal>("/goals", data).then((res) => res.data);
  }

  async getCoursesByGoal(goalId: string): Promise<Course[]> {
    return api.get<Course[]>(`/courses/goal/${goalId}`).then((res) => res.data);
  }

    async getSubjectById(subjectId: string): Promise<Subject> {
    return api.get<Subject>(`/subject/${subjectId}`).then((res) => res.data);
  }

  async getChapterById(chapterId: string): Promise<Chapter> {
    return api.get<Chapter>(`/chapter/${chapterId}`).then((res) => res.data);
  }

  async updateTopicProgress(data: TopicProgressInput): Promise<TopicProgress> {
    const response = await api.patch<TopicProgress>('/progress', data);
    return response.data;
  }

  async completeChapter(data: ChapterProgressInput): Promise<Chapter> {
    const response = await api.patch<Chapter>(`/chapter/complete`, data);
    return response.data;
  }

  async getUserProgress(userId: string): Promise<UserProgressResponse> {
    const response = await api.get<UserProgressResponse>(`/progress/${userId}`);
    return response.data;
  }

  async createCourse(data: { goalId: string; name: string }): Promise<Course> {
    return api.post<Course>("/courses", data).then((res) => res.data);
  }

  async updateCourseProgress(courseId: string, progress: number): Promise<Course> {
    return api.put<Course>(`/courses/${courseId}/progress`, { progress }).then((res) => res.data);
  }

  async createSubject(data: { courseId: string; name: string }): Promise<Subject> {
    return api.post<Subject>("/courses/subjects", data).then((res) => res.data);
  }
}

export const courseService = CourseService.getInstance();
