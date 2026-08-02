import { ArrowLeft } from 'lucide-react';

export default function Reader({ book, onBack }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Library</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {book.title}
          </h1>
          <p className="text-lg text-gray-600 mb-8">by {book.author}</p>

          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-line text-gray-800 leading-relaxed">
              {book.content}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
