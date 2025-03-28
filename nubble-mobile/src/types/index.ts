export interface User {
  id: number;
  username: string;
  fullName?: string;
  avatar?: string;
  bio?: string;
}

export interface Post {
  id: number;
  userId: number;
  imageUrl: string;
  caption?: string;
  location?: string;
  createdAt: string;
  user?: User;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  userId: number;
  postId: number;
  text: string;
  createdAt: string;
  user?: User;
}

export interface Story {
  id: number;
  userId: number;
  imageUrl: string;
  createdAt: string;
}

export interface UserStory {
  user: User;
  stories: Story[];
}