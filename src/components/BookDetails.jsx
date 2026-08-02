import { ArrowLeft, BookOpen, Star, Calendar, FileText, Heart, BookmarkPlus } from 'lucide-react';

export default function BookDetails({ book, onBack, onStartReading, isDark, toggleDark, isFavorite, onToggleFavorite, progress }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full rounded-2xl shadow-2xl border-4 border-white dark:border-gray-700"
              />
              <button
                onClick={onToggleFavorite}
                className={`mt-4 w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  isFavorite
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>

          {/* Book Info */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
                {book.title}
              </h1>
              <p className="text-xl text-indigo-600 dark:text-indigo-400 mb-6 font-medium">
                by {book.author}
              </p>

              {/* Rating & Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{book.rating}</span>
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-lg">
                  <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{book.pages} pages</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{book.year}</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg">
                  <BookmarkPlus className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{book.genre}</span>
                </div>
              </div>

              {/* Progress Bar */}
              {progress > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Reading Progress</span>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">About this book</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {book.fullDescription}
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={onStartReading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
              >
                <BookOpen className="w-6 h-6" />
                {progress > 0 ? 'Continue Reading' : 'Start Reading'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
