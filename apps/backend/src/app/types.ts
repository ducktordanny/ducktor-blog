export interface ProfileModel {
  username: string;
  email: string;
  createdAt: Date;
  profile: {
    imagePath?: string;
    bio?: string;
  };
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
}

export interface Payload {
  sub: number;
  username: string;
  iat: number;
  exp: number;
}

export interface RequestUser {
  user: {
    id: number;
    username: string;
  };
}

export interface LoginResponse extends UserResponse {
  access_token: string;
}
