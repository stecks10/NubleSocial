import { useState } from "react";
import MobileLayout from "@/components/mobile-layout";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search as SearchIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
  });
  
  const filteredUsers = users?.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <MobileLayout showHeader={false}>
      <div className="p-4 border-b border-border sticky top-0 bg-white z-10">
        <div className="relative">
          <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <Input 
            placeholder="Search" 
            className="pl-10 bg-gray-100 border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div>
                  <Skeleton className="w-24 h-3 mb-2" />
                  <Skeleton className="w-32 h-2" />
                </div>
              </div>
            ))}
          </div>
        ) : searchTerm === "" ? (
          <div className="flex items-center justify-center h-60 text-gray-500">
            Search for people
          </div>
        ) : filteredUsers?.length === 0 ? (
          <div className="flex items-center justify-center h-60 text-gray-500">
            No users found
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUsers?.map(user => (
              <div key={user.id} className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.fullName}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
