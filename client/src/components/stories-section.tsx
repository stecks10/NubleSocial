import { useQuery } from "@tanstack/react-query";
import StoryItem from "./story-item";
import { UserStory } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoriesSection() {
  const { data: stories, isLoading } = useQuery<UserStory[]>({
    queryKey: ['/api/stories'],
  });

  if (isLoading) {
    return (
      <div className="px-4 py-3 overflow-x-auto">
        <div className="flex space-x-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-1">
              <Skeleton className="w-16 h-16 rounded-full" />
              <Skeleton className="w-12 h-3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 overflow-x-auto">
      <div className="flex space-x-4">
        {stories?.map((story) => (
          <StoryItem key={story.user.id} story={story} />
        ))}
        <StoryItem isAddNew={true} />
      </div>
    </div>
  );
}
