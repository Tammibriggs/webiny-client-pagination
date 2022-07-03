import { useEffect, useState } from 'react';
import './App.css';
import Book from './Book';
import { Allbooks } from './data';
import { useQuery, gql } from '@apollo/client';

const LIST_BOOKS = gql`
  query GetBooks ($limit: Int, $after: String){
    listBooks (limit: $limit, after: $after){
      data {
        id
        authors
        description
        image
        previewLink
        publishDate
        publisher
        title
        subtitle
      }
      meta {
        cursor
        hasMoreItems
      }
      error {
        message
        data
      }
    }
  }
`

function App() { 
  const [books, setBooks] = useState(Allbooks)
  const [cursors, setCursors] = useState([null])
  const [page, setPage] = useState(0)

  const {data, loading} = useQuery(LIST_BOOKS, {
    variables: {
      limit: 10,
      after: cursors[page]
    }
  })

  useEffect(() => {
    const pointer = data?.listBooks.meta?.cursor
    if(!loading && pointer !== cursors[page]){
      setCursors([...cursors, pointer])
    }
  }, [data])

  return (
    <div className="app">
      {!loading && data?.listBooks.data
        ? <div className='books'>
            {data?.listBooks.data?.map((book) => (
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
        : <>
          {loading
            ? <div className='center'>Loading...</div>
            : (
                <span className='center'>
                  {data?.listBooks.error.message} {data?.listBooks.error.data.reason} 
                </span>
              )
          }
          </>
        }     
        
      {!loading &&
        <div className='buttons'>
          <button 
            disabled={page === 0 && true}
            style={{backgroundColor: `${page === 0 ? 'gray' : '#6796ec'}`}}
            onClick={() => {setPage(page - 1)}}>Prev</button>

          <button
            disabled={!data?.listBooks.meta?.hasMoreItems && true}
            style={{backgroundColor: `${data?.listBooks.meta?.hasMoreItems ? '#6796ec' : 'gray'}`}}
            onClick={() => {setPage(page + 1)}}>Next</button>
        </div>
      }
    </div>
  );
}

export default App;