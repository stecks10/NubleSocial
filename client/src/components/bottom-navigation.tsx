import { Home, Search, Bell, PlusSquare, User } from "lucide-react";
import { useLocation } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";

export default function BottomNavigation() {
  const [location, navigate] = useLocation();
  
  const { data: currentUser } = useQuery({
    queryKey: ['/api/users/1'],
    staleTime: Infinity,
  });

  return (
    <nav className="bg-white border-t border-border py-2 px-6">
      <div className="flex justify-between items-center">
        <button 
          className={location === "/" ? "text-primary" : "text-gray-400"}
          onClick={() => navigate("/")}
        >
          <Home className="h-6 w-6" fill={location === "/" ? "currentColor" : "none"} />
        </button>
        
        <button 
          className={location === "/search" ? "text-primary" : "text-gray-400"}
          onClick={() => navigate("/search")}
        >
          <Search className="h-6 w-6" />
        </button>
        
        <button className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FE3165] to-[#22A45D] -mt-8 flex items-center justify-center shadow-lg">
          <PlusSquare className="h-7 w-7 text-white" />
        </button>
        
        <button 
          className={location === "/notifications" ? "text-primary" : "text-gray-400"}
          onClick={() => navigate("/notifications")}
        >
          <Bell className="h-6 w-6" />
        </button>
        
        <button 
          className={location === "/profile" ? "text-primary" : "text-gray-400"}
          onClick={() => navigate("/profile")}
        >
          {currentUser?.avatar ? (
            <Avatar className="h-7 w-7 border border-gray-300">
              <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
              <AvatarFallback>{currentUser.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          ) : (
            <User className="h-6 w-6" />
          )}
        </button>
      </div>
    </nav>
  );
}
