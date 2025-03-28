import { ReactNode } from "react";
import AppHeader from "./app-header";
import BottomNavigation from "./bottom-navigation";

interface MobileLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showBottomNav?: boolean;
  title?: string;
}

export default function MobileLayout({
  children,
  showHeader = true,
  showBottomNav = true,
  title = "Nubble"
}: MobileLayoutProps) {
  return (
    <div className="relative mx-auto max-w-md h-screen bg-white border border-gray-300 rounded-3xl overflow-hidden shadow-lg">
      <div className="h-full flex flex-col">
        {showHeader && <AppHeader title={title} />}
        
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        
        {showBottomNav && <BottomNavigation />}
      </div>
    </div>
  );
}
