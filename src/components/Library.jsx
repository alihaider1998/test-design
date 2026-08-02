import { BookOpen } from 'lucide-react';
import { books } from '../data/books';

export default function Library({ onSelectBook }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">My Library</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <div
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                <p className="text-gray-700 text-sm">{book.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
