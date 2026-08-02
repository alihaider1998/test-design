import { useState, useEffect } from 'react';
import { ArrowLeft, Moon, Sun, Type, Bookmark } from 'lucide-react';

export default function Reader({ book, onBack, isDark, toggleDark, progress, onUpdateProgress }) {
  const [fontSize, setFontSize] = useState('text-lg');
  const [showControls, setShowControls] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(progress || 0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
      setScrollProgress(Math.min(scrollPercent, 100));

      if (onUpdateProgress && scrollPercent > (progress || 0)) {
        onUpdateProgress(book.id, scrollPercent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [book.id, onUpdateProgress, progress]);

  const fontSizes = [
    { label: 'A', value: 'text-sm', size: 'Small' },
    { label: 'A', value: 'text-base', size: 'Medium' },
    { label: 'A', value: 'text-lg', size: 'Large' },
    { label: 'A', value: 'text-xl', size: 'X-Large' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors pb-20">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 hidden md:block">
                {scrollProgress}%
              </span>
              <button
                onClick={() => setShowControls(!showControls)}
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Type className="w-5 h-5 text-gray-700 dark:text-gray-300" />
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

          {/* Font Size Controls */}
          {showControls && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Font Size:</span>
              <div className="flex gap-2">
                {fontSizes.map((fs, idx) => (
                  <button
                    key={fs.value}
                    onClick={() => setFontSize(fs.value)}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      fontSize === fs.value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                    }`}
                    style={{ fontSize: `${12 + idx * 2}px` }}
                  >
                    {fs.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
                {book.title}
              </h1>
              <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">by {book.author}</p>
            </div>
            <Bookmark className="w-6 h-6 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors" />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className={`whitespace-pre-line text-gray-800 dark:text-gray-200 leading-relaxed ${fontSize} transition-all`}>
              {book.content}
            </p>
          </div>

          {/* End of chapter */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">You've reached the end of this preview</p>
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              Back to Library
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
