import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserStory } from "@/lib/types";
import { PlusCircle } from "lucide-react";

interface StoryItemProps {
  story?: UserStory;
  isAddNew?: boolean;
}

export default function StoryItem({ story, isAddNew = false }: StoryItemProps) {
  if (isAddNew) {
    return (
      <div className="flex flex-col items-center space-y-1">
        <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            <PlusCircle className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <span className="text-xs text-gray-800 truncate w-16 text-center">New</span>
      </div>
    );
  }
  
  if (!story) return null;

  return (
    <div className="flex flex-col items-center space-y-1">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-[#FE3165] p-[2px]">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
          <Avatar className="w-full h-full">
            <AvatarImage 
              src={story.user.avatar} 
              alt={story.user.username} 
              className="w-full h-full object-cover"
            />
            <AvatarFallback>{story.user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <span className="text-xs text-gray-800 truncate w-16 text-center">{story.user.username}</span>
    </div>
  );
}
