import { useState } from 'react';
import './App.css';
import Book from './Book';
import { Allbooks } from './data';

function App() {

  const [books, setBooks] = useState(Allbooks)

  return (
    <div className="app">
       <div className='books'>
          {books?.map((book) => (
            <Book
              key={book.id}
              title={book.title}
              image={book.image}
              authors={book.authors}
              publisher={book.publisher}
              publishDate={book.publishedDate}
              id={book.id}
            />
          ))}
        </div>
    </div>
  );
}

export default App;
