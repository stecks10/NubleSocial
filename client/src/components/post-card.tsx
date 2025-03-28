import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Post } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const queryClient = useQueryClient();
  
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (liked) {
        await apiRequest('DELETE', `/api/posts/${post.id}/like`, { userId: 1 });
      } else {
        await apiRequest('POST', `/api/posts/${post.id}/like`, { userId: 1 });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
    }
  });
  
  const handleLike = () => {
    setLiked(!liked);
    likeMutation.mutate();
  };
  
  const handleSave = () => {
    setSaved(!saved);
  };
  
  // Format the timestamp
  const timeAgo = post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : '';

  return (
    <Card className="border-t-0 border-r-0 border-l-0 rounded-none border-b border-border mb-4 shadow-none">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-9 h-9">
            <AvatarImage src={post.user?.avatar} alt={post.user?.username} />
            <AvatarFallback>{post.user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-gray-800">{post.user?.username}</p>
            {post.location && <p className="text-xs text-gray-500">{post.location}</p>}
          </div>
        </div>
        <button className="text-gray-800">
          <MoreVertical className="h-6 w-6" />
        </button>
      </div>
      
      <div className="aspect-square w-full bg-gray-100">
        <img 
          src={post.imageUrl} 
          alt={post.caption || "Post image"} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="px-4 py-2">
        <div className="flex justify-between py-2">
          <div className="flex space-x-4">
            <button 
              className={liked ? "text-[#FE3165]" : "text-gray-800"}
              onClick={handleLike}
            >
              <Heart className="h-6 w-6" fill={liked ? "currentColor" : "none"} />
            </button>
            <button className="text-gray-800">
              <MessageCircle className="h-6 w-6" />
            </button>
            <button className="text-gray-800">
              <Send className="h-6 w-6" />
            </button>
          </div>
          <button 
            className="text-gray-800"
            onClick={handleSave}
          >
            <Bookmark className="h-6 w-6" fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
        
        <div className="py-1">
          <p className="text-sm font-semibold">{post.likes} curtidas</p>
          
          {post.caption && (
            <p className="text-sm mt-1">
              <span className="font-semibold">{post.user?.username}</span>{" "}
              <span>{post.caption}</span>
            </p>
          )}
          
          {post.comments?.length > 0 && (
            <>
              <p className="text-xs text-gray-500 mt-1">
                Ver todos os {post.comments.length} comentários
              </p>
              
              {post.comments.slice(0, 2).map((comment) => (
                <div key={comment.id} className="mt-1">
                  <p className="text-sm">
                    <span className="font-semibold">{comment.user?.username}</span>{" "}
                    <span>{comment.text}</span>
                  </p>
                </div>
              ))}
            </>
          )}
          
          <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
        </div>
      </div>
    </Card>
  );
}
