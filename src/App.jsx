import { useState, useEffect } from 'react';
import { books } from './data/books';
import Library from './components/Library';
import Reader from './components/Reader';
import BookDetails from './components/BookDetails';
import Dashboard from './components/Dashboard';
import Favorites from './components/Favorites';
import Collections from './components/Collections';
import Settings from './components/Settings';
import BottomNav from './components/BottomNav';

function App() {
  const [currentScreen, setCurrentScreen] = useState('library');
  const [selectedBook, setSelectedBook] = useState(null);
  const [viewingDetails, setViewingDetails] = useState(null);

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('readingProgress');
    return saved ? JSON.parse(saved) : {};
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [collections, setCollections] = useState(() => {
    const saved = localStorage.getItem('collections');
    return saved ? JSON.parse(saved) : { reading: [], toRead: [1, 2, 3], finished: [] };
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('stats');
    return saved ? JSON.parse(saved) : {
      booksRead: 0,
      pagesRead: 0,
      streak: 0,
      avgRating: 4.5,
      monthlyBooks: 0,
      monthlyPages: 0,
      monthlyMinutes: 0,
      monthlyDays: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('readingProgress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('stats', JSON.stringify(stats));
  }, [stats]);

  const handleSelectBook = (book) => {
    setViewingDetails(book);
  };

  const handleStartReading = () => {
    setSelectedBook(viewingDetails);
    setViewingDetails(null);
  };

  const handleBackFromReader = () => {
    setSelectedBook(null);
    setCurrentScreen('library');
  };

  const handleUpdateProgress = (bookId, newProgress) => {
    setProgress(prev => ({
      ...prev,
      [bookId]: newProgress
    }));

    // Auto-update collections
    if (newProgress >= 100 && !collections.finished.includes(bookId)) {
      setCollections(prev => ({
        ...prev,
        reading: prev.reading.filter(id => id !== bookId),
        finished: [...prev.finished, bookId]
      }));

      // Update stats
      const book = books.find(b => b.id === bookId);
      if (book) {
        setStats(prev => ({
          ...prev,
          booksRead: prev.booksRead + 1,
          pagesRead: prev.pagesRead + book.pages,
          monthlyBooks: prev.monthlyBooks + 1,
          monthlyPages: prev.monthlyPages + book.pages,
        }));
      }
    } else if (newProgress > 0 && newProgress < 100 && !collections.reading.includes(bookId)) {
      setCollections(prev => ({
        ...prev,
        toRead: prev.toRead.filter(id => id !== bookId),
        reading: [...prev.reading, bookId]
      }));
    }
  };

  const handleToggleFavorite = (bookId) => {
    setFavorites(prev => {
      if (prev.includes(bookId)) {
        return prev.filter(id => id !== bookId);
      } else {
        return [...prev, bookId];
      }
    });
  };

  const toggleDark = () => setIsDark(!isDark);

  const renderScreen = () => {
    if (selectedBook) {
      return (
        <Reader
          book={selectedBook}
          onBack={handleBackFromReader}
          isDark={isDark}
          toggleDark={toggleDark}
          progress={progress[selectedBook.id] || 0}
          onUpdateProgress={handleUpdateProgress}
        />
      );
    }

    if (viewingDetails) {
      return (
        <BookDetails
          book={viewingDetails}
          onBack={() => setViewingDetails(null)}
          onStartReading={handleStartReading}
          isDark={isDark}
          toggleDark={toggleDark}
          isFavorite={favorites.includes(viewingDetails.id)}
          onToggleFavorite={() => handleToggleFavorite(viewingDetails.id)}
          progress={progress[viewingDetails.id] || 0}
        />
      );
    }

    switch (currentScreen) {
      case 'library':
        return (
          <Library
            onSelectBook={handleSelectBook}
            isDark={isDark}
            toggleDark={toggleDark}
            progress={progress}
          />
        );
      case 'favorites':
        return (
          <Favorites
            favorites={favorites}
            books={books}
            onSelectBook={handleSelectBook}
            isDark={isDark}
            toggleDark={toggleDark}
          />
        );
      case 'collections':
        return (
          <Collections
            collections={collections}
            books={books}
            onSelectBook={handleSelectBook}
            isDark={isDark}
            toggleDark={toggleDark}
          />
        );
      case 'stats':
        return (
          <Dashboard
            stats={stats}
            isDark={isDark}
            toggleDark={toggleDark}
            onNavigate={setCurrentScreen}
          />
        );
      case 'settings':
        return (
          <Settings
            isDark={isDark}
            toggleDark={toggleDark}
            settings={{}}
            onUpdateSettings={() => {}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {renderScreen()}
      {!selectedBook && !viewingDetails && (
        <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
    </div>
  );
}

export default App;
