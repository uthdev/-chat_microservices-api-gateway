import config from 'config'
// import got  from 'got';
import axios from 'axios';

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
    const { data, status } = await axios.get(`${USERS_SERVICE_URI}/users/${userId}`)
    // const body = await got.get(`${USERS_SERVICE_URI}/users/${userId}`).json();
    if(!data) return null;
    
    return <User>data;
  }

  static async fetchUserSession({ sessionId }: { sessionId: string}): Promise<UserSession | null> {
    const { data } = await axios.get(`${USERS_SERVICE_URI}/sessions/${sessionId}`);

    if(!data) return null;
    return <UserSession>data;

  }

  static async createUser({ username, password}: { password: string, username: string}) {
    try {
      const { data, status } = await axios.post(`${USERS_SERVICE_URI}/users`,  { password, username });
      console.log(data)
      return data;
      
    } catch (error) {
      throw error
    }
  }

  static async createUserSession({ username, password}: { password: string, username: string}): Promise<UserSession> {
    const { data } = await axios.post(`${USERS_SERVICE_URI}/sessions`, { password, username });

    return data;

  }

  static async deleteUserSession({ sessionId }: { sessionId: string}) {
    try {
      const { data } = await axios.delete(`${USERS_SERVICE_URI}/sessions/${sessionId}`);
  
      return <boolean>data; 
      
    } catch (error) {
      return error
    }
  }
}