import { Library, Heart, TrendingUp, BookMarked, Settings } from 'lucide-react';

export default function BottomNav({ currentScreen, onNavigate }) {
  const navItems = [
    { id: 'library', icon: Library, label: 'Library' },
    { id: 'favorites', icon: Heart, label: 'Favorites' },
    { id: 'collections', icon: BookMarked, label: 'Collections' },
    { id: 'stats', icon: TrendingUp, label: 'Stats' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center py-3 px-4 transition-all duration-200 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 transition-all ${isActive ? 'scale-110' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 w-12 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
