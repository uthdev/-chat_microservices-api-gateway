import config from 'config'
import got from 'got';

const USERS_SERVICE_URI = <string>config.get("USERS_SERVICE_URI");

export interface UserSession {
  id: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export interface User {
  id: string;
  username: string;
  createdAt: string;
}

export default class UsersService {
  static async fetchUser({ userId }: { userId: string}): Promise<User | null> {
    const body = await got.get(`${USERS_SERVICE_URI}/users/${userId}`).json()
    if(!body) return null;
    return <User>body;
  }

  static async fetchUserSession({ sessionId }: { sessionId: string}): Promise<UserSession | null> {
    const body = await got.get(`${USERS_SERVICE_URI}/sessions/${sessionId}`).json()
    if(!body) return null;
    return <UserSession>body;
  }
} 