import { useState, useEffect } from 'react';
import Library from './components/Library';
import Reader from './components/Reader';

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {selectedBook ? (
        <Reader
          book={selectedBook}
          onBack={() => setSelectedBook(null)}
          isDark={isDark}
          toggleDark={() => setIsDark(!isDark)}
        />
      ) : (
        <Library
          onSelectBook={setSelectedBook}
          isDark={isDark}
          toggleDark={() => setIsDark(!isDark)}
        />
      )}
    </div>
  );
}

export default App;
