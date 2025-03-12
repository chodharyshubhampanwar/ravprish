import { api } from "../lib/axios";
import { User } from "../types/auth";

class UserService {
  private static instance: UserService;

  private constructor() {

  }

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

async getUser(uid: string): Promise<User> {
  const response = await api.get<User>(`/user/${uid}`);
  return response.data;
}


  async createUser(userData: Omit<User, "id">): Promise<User> {
    const response = await api.post<User>("/user", userData);
    return response.data;
  }



  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const response = await api.patch<User>(`/user/${userId}`, userData);
    return response.data;
  }
}

export const userService = UserService.getInstance();
