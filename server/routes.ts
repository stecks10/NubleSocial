import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCommentSchema, insertLikeSchema, insertPostSchema, insertUserSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to get users" });
    }
  });

  // Get user by ID
  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Create a new user
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });

  // Get all posts
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getAllPosts();
      
      // Enhance posts with user, likes, and comments data
      const enhancedPosts = await Promise.all(posts.map(async (post) => {
        const user = await storage.getUser(post.userId);
        const likes = await storage.getLikesByPostId(post.id);
        const comments = await storage.getCommentsByPostId(post.id);
        
        // Enhance comments with user data
        const enhancedComments = await Promise.all(comments.map(async (comment) => {
          const commentUser = await storage.getUser(comment.userId);
          return {
            ...comment,
            user: commentUser,
          };
        }));
        
        return {
          ...post,
          user,
          likes: likes.length,
          comments: enhancedComments,
        };
      }));
      
      res.json(enhancedPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get posts" });
    }
  });

  // Get posts by user ID
  app.get("/api/users/:id/posts", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const posts = await storage.getPostsByUserId(userId);
      
      // Enhance posts with likes and comments data
      const enhancedPosts = await Promise.all(posts.map(async (post) => {
        const likes = await storage.getLikesByPostId(post.id);
        const comments = await storage.getCommentsByPostId(post.id);
        
        return {
          ...post,
          likes: likes.length,
          commentsCount: comments.length,
        };
      }));
      
      res.json(enhancedPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user posts" });
    }
  });

  // Create a new post
  app.post("/api/posts", async (req, res) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(postData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Failed to create post" });
      }
    }
  });

  // Like a post
  app.post("/api/posts/:id/like", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const likeData = insertLikeSchema.parse({ userId, postId });
      const like = await storage.createLike(likeData);
      res.status(201).json(like);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Failed to like post" });
      }
    }
  });

  // Unlike a post
  app.delete("/api/posts/:id/like", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      await storage.deleteLike(userId, postId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to unlike post" });
    }
  });

  // Comment on a post
  app.post("/api/posts/:id/comment", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const { userId, text } = req.body;
      
      if (!userId || !text) {
        return res.status(400).json({ message: "User ID and text are required" });
      }
      
      const commentData = insertCommentSchema.parse({ userId, postId, text });
      const comment = await storage.createComment(commentData);
      
      // Get the user for the response
      const user = await storage.getUser(userId);
      
      res.status(201).json({
        ...comment,
        user,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Failed to create comment" });
      }
    }
  });

  // Get all stories
  app.get("/api/stories", async (req, res) => {
    try {
      const stories = await storage.getAllStories();
      
      // Group stories by user and enhance with user data
      const storiesByUser = new Map();
      
      for (const story of stories) {
        if (!storiesByUser.has(story.userId)) {
          const user = await storage.getUser(story.userId);
          storiesByUser.set(story.userId, {
            user,
            stories: [],
          });
        }
        
        storiesByUser.get(story.userId).stories.push(story);
      }
      
      const result = Array.from(storiesByUser.values());
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to get stories" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
