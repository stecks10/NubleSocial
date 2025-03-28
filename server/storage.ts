import { 
  users, type User, type InsertUser,
  posts, type Post, type InsertPost,
  likes, type Like, type InsertLike,
  comments, type Comment, type InsertComment,
  stories, type Story, type InsertStory
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Post operations
  getPost(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  getAllPosts(): Promise<Post[]>;
  getPostsByUserId(userId: number): Promise<Post[]>;
  
  // Like operations
  getLikesByPostId(postId: number): Promise<Like[]>;
  createLike(like: InsertLike): Promise<Like>;
  deleteLike(userId: number, postId: number): Promise<void>;
  
  // Comment operations
  getCommentsByPostId(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Story operations
  getStoriesByUserId(userId: number): Promise<Story[]>;
  getAllStories(): Promise<Story[]>;
  createStory(story: InsertStory): Promise<Story>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private likes: Map<string, Like>;
  private comments: Map<number, Comment>;
  private stories: Map<number, Story>;
  
  private currentUserId: number;
  private currentPostId: number;
  private currentLikeId: number;
  private currentCommentId: number;
  private currentStoryId: number;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.likes = new Map();
    this.comments = new Map();
    this.stories = new Map();
    
    this.currentUserId = 1;
    this.currentPostId = 1;
    this.currentLikeId = 1;
    this.currentCommentId = 1;
    this.currentStoryId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample users
    const users = [
      { username: "marina_coelho", password: "password", fullName: "Marina Coelho", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", bio: "Travel enthusiast | Rio de Janeiro" },
      { username: "rodrigo_lima", password: "password", fullName: "Rodrigo Lima", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", bio: "Photographer | São Paulo" },
      { username: "joaopedro", password: "password", fullName: "João Pedro", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6", bio: "Coffee & Art" },
      { username: "maria_santos", password: "password", fullName: "Maria Santos", avatar: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1", bio: "Artist | Designer" },
      { username: "carlos_ferreira", password: "password", fullName: "Carlos Ferreira", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", bio: "Entrepreneur" },
      { username: "ana_silva", password: "password", fullName: "Ana Silva", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", bio: "Beach lover | Florianópolis" }
    ];
    
    users.forEach(user => this.createUser(user));
    
    // Sample posts
    const posts = [
      { userId: 1, imageUrl: "https://images.unsplash.com/photo-1498887960847-2a5e46312788", caption: "Que dia incrível! 🌊☀️ #RioDeJaneiro #Praia", location: "Rio de Janeiro" },
      { userId: 2, imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785", caption: "Tarde de café e arte na galeria. #ArteSP #CulturaBrasileira", location: "São Paulo" },
      { userId: 3, imageUrl: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b", caption: "Natureza em sua forma mais pura 🌿", location: "Amazonas" },
      { userId: 4, imageUrl: "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda", caption: "Explorando novos caminhos", location: "Minas Gerais" },
      { userId: 5, imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e", caption: "As montanhas chamam", location: "Santa Catarina" },
      { userId: 6, imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", caption: "Paraíso encontrado 🏝️", location: "Bahia" },
      { userId: 1, imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", caption: "Momentos para lembrar", location: "Ceará" },
      { userId: 2, imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05", caption: "Eternizando paisagens", location: "Rio Grande do Sul" }
    ];
    
    posts.forEach(post => this.createPost(post));
    
    // Sample likes
    [
      { userId: 3, postId: 1 },
      { userId: 4, postId: 1 },
      { userId: 5, postId: 1 },
      { userId: 6, postId: 1 },
      { userId: 1, postId: 2 },
      { userId: 3, postId: 2 },
      { userId: 5, postId: 2 }
    ].forEach(like => this.createLike(like));
    
    // Sample comments
    [
      { userId: 3, postId: 1, text: "Lugar incrível! 😍" },
      { userId: 4, postId: 1, text: "Quero ir também!" },
      { userId: 5, postId: 1, text: "Que vista espetacular!" },
      { userId: 6, postId: 2, text: "Adoro esse café!" },
      { userId: 1, postId: 2, text: "A exposição estava ótima" },
      { userId: 4, postId: 2, text: "Adoro esse lugar! Vamos lá qualquer dia." }
    ].forEach(comment => this.createComment(comment));
    
    // Sample stories
    [
      { userId: 1, imageUrl: "https://images.unsplash.com/photo-1535530992830-e25d07cfa780" },
      { userId: 2, imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87" },
      { userId: 3, imageUrl: "https://images.unsplash.com/photo-1516912481808-3406841bd33c" },
      { userId: 4, imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728" }
    ].forEach(story => this.createStory(story));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Post operations
  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.currentPostId++;
    const createdAt = new Date();
    const post: Post = { ...insertPost, id, createdAt };
    this.posts.set(id, post);
    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Like operations
  async getLikesByPostId(postId: number): Promise<Like[]> {
    return Array.from(this.likes.values()).filter(like => like.postId === postId);
  }

  async createLike(insertLike: InsertLike): Promise<Like> {
    const id = this.currentLikeId++;
    const like: Like = { ...insertLike, id };
    const key = `${like.userId}-${like.postId}`;
    this.likes.set(key, like);
    return like;
  }

  async deleteLike(userId: number, postId: number): Promise<void> {
    const key = `${userId}-${postId}`;
    this.likes.delete(key);
  }

  // Comment operations
  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentCommentId++;
    const createdAt = new Date();
    const comment: Comment = { ...insertComment, id, createdAt };
    this.comments.set(id, comment);
    return comment;
  }

  // Story operations
  async getStoriesByUserId(userId: number): Promise<Story[]> {
    return Array.from(this.stories.values())
      .filter(story => story.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getAllStories(): Promise<Story[]> {
    return Array.from(this.stories.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.currentStoryId++;
    const createdAt = new Date();
    const story: Story = { ...insertStory, id, createdAt };
    this.stories.set(id, story);
    return story;
  }
}

export const storage = new MemStorage();
