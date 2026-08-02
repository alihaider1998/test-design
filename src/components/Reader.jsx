import { ArrowLeft, Moon, Sun } from 'lucide-react';

export default function Reader({ book, onBack, isDark, toggleDark }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Library</span>
            </button>
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

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
            {book.title}
          </h1>
          <p className="text-lg text-indigo-600 dark:text-indigo-400 mb-10 font-medium">by {book.author}</p>

          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-line text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
              {book.content}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
