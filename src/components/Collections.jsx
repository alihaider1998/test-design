import { Library, Moon, Sun, BookOpen, Clock, CheckCircle } from 'lucide-react';

export default function Collections({ collections, books, onSelectBook, isDark, toggleDark }) {
  const shelves = [
    { id: 'reading', name: 'Currently Reading', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { id: 'toRead', name: 'Want to Read', icon: Clock, color: 'from-orange-500 to-pink-500' },
    { id: 'finished', name: 'Finished', icon: CheckCircle, color: 'from-green-500 to-teal-500' },
  ];

  const getShelfBooks = (shelfId) => {
    return books.filter(book => collections[shelfId]?.includes(book.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Library className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                My Collections
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

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {shelves.map(shelf => {
          const Icon = shelf.icon;
          const shelfBooks = getShelfBooks(shelf.id);

          return (
            <div key={shelf.id}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${shelf.color} text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {shelf.name}
                </h2>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  ({shelfBooks.length})
                </span>
              </div>

              {shelfBooks.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center border border-gray-200 dark:border-gray-700">
                  <Icon className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No books in this collection yet
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {shelfBooks.map(book => (
                    <div
                      key={book.id}
                      onClick={() => onSelectBook(book)}
                      className="group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <div className="text-white">
                            <p className="font-semibold text-sm line-clamp-2">{book.title}</p>
                            <p className="text-xs opacity-90">{book.author}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}
