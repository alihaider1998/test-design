import { BookOpen, Star, TrendingUp, Target, Calendar, Award, Moon, Sun } from 'lucide-react';

export default function Dashboard({ stats, isDark, toggleDark, onNavigate }) {
  const achievements = [
    { icon: Award, title: 'Bookworm', description: 'Read 5 books', unlocked: stats.booksRead >= 5 },
    { icon: Target, title: 'Dedicated Reader', description: 'Read for 7 days straight', unlocked: stats.streak >= 7 },
    { icon: TrendingUp, title: 'Speed Reader', description: 'Complete a book in one day', unlocked: false },
    { icon: Star, title: 'Perfectionist', description: 'Rate 10 books', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Reading Stats
              </h1>
            </div>
            <button
              onClick={toggleDark}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-6 text-white shadow-xl">
            <BookOpen className="w-12 h-12 mb-3 opacity-80" />
            <p className="text-sm opacity-90 mb-1">Books Read</p>
            <p className="text-4xl font-bold">{stats.booksRead}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-6 text-white shadow-xl">
            <Calendar className="w-12 h-12 mb-3 opacity-80" />
            <p className="text-sm opacity-90 mb-1">Reading Streak</p>
            <p className="text-4xl font-bold">{stats.streak} days</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
            <Target className="w-12 h-12 mb-3 opacity-80" />
            <p className="text-sm opacity-90 mb-1">Pages Read</p>
            <p className="text-4xl font-bold">{stats.pagesRead}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
            <Star className="w-12 h-12 mb-3 opacity-80" />
            <p className="text-sm opacity-90 mb-1">Avg Rating</p>
            <p className="text-4xl font-bold">{stats.avgRating}</p>
          </div>
        </div>

        {/* Reading Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
            <Calendar className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            This Month
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.monthlyBooks}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Books</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.monthlyPages}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pages</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.monthlyMinutes}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Minutes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.monthlyDays}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active Days</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
            <Award className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`p-5 rounded-xl border-2 transition-all duration-200 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-700'
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <div className="text-green-500">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
