import { useState } from 'react';
import Library from './components/Library';
import Reader from './components/Reader';

function App() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="min-h-screen">
      {selectedBook ? (
        <Reader book={selectedBook} onBack={() => setSelectedBook(null)} />
      ) : (
        <Library onSelectBook={setSelectedBook} />
      )}
    </div>
  );
}

export default App;
