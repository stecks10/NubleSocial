import MobileLayout from "@/components/mobile-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample notification data
const notifications = [
  {
    id: 1,
    type: 'like',
    user: {
      id: 2,
      username: 'rodrigo_lima',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    },
    content: 'curtiu sua foto',
    time: '2h'
  },
  {
    id: 2,
    type: 'follow',
    user: {
      id: 3,
      username: 'joaopedro',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6'
    },
    content: 'começou a seguir você',
    time: '3h'
  },
  {
    id: 3,
    type: 'comment',
    user: {
      id: 4,
      username: 'maria_santos',
      avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1'
    },
    content: 'comentou: "Lugar incrível! 😍"',
    time: '5h'
  },
  {
    id: 4,
    type: 'mention',
    user: {
      id: 5,
      username: 'carlos_ferreira',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    content: 'mencionou você em um comentário',
    time: '1d'
  }
];

export default function Notifications() {
  return (
    <MobileLayout title="Notificações">
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-4">Recentes</h2>
        
        <div className="space-y-4">
          {notifications.map(notification => (
            <div key={notification.id} className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={notification.user.avatar} alt={notification.user.username} />
                <AvatarFallback>{notification.user.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{notification.user.username}</span>{" "}
                  <span>{notification.content}</span>
                </p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
              {notification.type === 'follow' && (
                <button className="px-3 py-1 bg-primary text-white rounded-full text-xs font-medium">
                  Seguir
                </button>
              )}
            </div>
          ))}
        </div>
        
        <h2 className="font-semibold text-lg mt-8 mb-4">Esta semana</h2>
        <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
          Nenhuma notificação esta semana
        </div>
      </div>
    </MobileLayout>
  );
}
