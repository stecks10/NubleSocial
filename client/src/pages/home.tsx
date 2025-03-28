import { useQuery } from "@tanstack/react-query";
import StoriesSection from "@/components/stories-section";
import PostCard from "@/components/post-card";
import MobileLayout from "@/components/mobile-layout";
import { Post } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
  });

  return (
    <MobileLayout>
      <StoriesSection />
      
      {isLoading ? (
        <div className="space-y-6 p-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-9 h-9 rounded-full" />
                <div>
                  <Skeleton className="w-24 h-3 mb-2" />
                  <Skeleton className="w-16 h-2" />
                </div>
              </div>
              <Skeleton className="w-full h-[300px]" />
              <div className="space-y-2">
                <Skeleton className="w-24 h-3" />
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-32 h-3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </MobileLayout>
  );
}
