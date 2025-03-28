import { Search, Bell } from "lucide-react";
import { useLocation } from "wouter";

interface AppHeaderProps {
  title?: string;
}

export default function AppHeader({ title = "Nubble" }: AppHeaderProps) {
  const [, navigate] = useLocation();

  return (
    <header className="px-4 py-3 border-b border-border flex justify-between items-center bg-white z-10">
      <div className="text-xl font-semibold text-primary">{title}</div>
      <div className="flex items-center space-x-4">
        <button 
          className="text-primary"
          onClick={() => navigate("/search")}
        >
          <Search className="h-6 w-6" />
        </button>
        <button 
          className="text-primary"
          onClick={() => navigate("/notifications")}
        >
          <Bell className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
