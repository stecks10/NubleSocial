import { useQuery } from "@tanstack/react-query";
import MobileLayout from "@/components/mobile-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Post } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3X3, Bookmark, Settings } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const userId = 1; // Current user ID
  
  const { data: user, isLoading: isUserLoading } = useQuery<User>({
    queryKey: [`/api/users/${userId}`],
  });
  
  const { data: posts, isLoading: isPostsLoading } = useQuery<Post[]>({
    queryKey: [`/api/users/${userId}/posts`],
  });

  return (
    <MobileLayout title={user?.username || "Profile"}>
      <div className="p-4">
        {isUserLoading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-24 h-3" />
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.avatar} alt={user?.username} />
              <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{user?.fullName}</h2>
              <p className="text-sm text-gray-500">@{user?.username}</p>
            </div>
            <button className="ml-auto">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        )}
        
        <div className="mt-4">
          <p className="text-sm">{user?.bio}</p>
        </div>
        
        <div className="flex justify-around mt-6 py-4 border-t border-b border-border">
          <div className="text-center">
            <p className="font-bold">{posts?.length || 0}</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold">843</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">492</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="posts">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="posts" className="flex justify-center">
            <Grid3X3 className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex justify-center">
            <Bookmark className="h-5 w-5" />
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="p-0 pt-1">
          {isPostsLoading ? (
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1">
              {posts?.map((post) => (
                <div key={post.id} className="aspect-square">
                  <img 
                    src={post.imageUrl} 
                    alt={post.caption || "Post"} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved" className="p-1">
          <div className="flex items-center justify-center h-60">
            <p className="text-gray-500">No saved posts yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </MobileLayout>
  );
}
