export interface User {
  username: string;
  email: string;
}

export interface LogInUser {
    accessToken: string;
  username: string;
  email: string;
    avatar: string;
    
}

export interface AuthRequest {
  email: string;
  password: string;
}