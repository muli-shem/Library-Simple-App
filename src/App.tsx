import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from './useLocalStorage';
import { useBookReducer } from './Reducer';
import BookForm from './components/Bookform';
import BookList from './components/Booklist';
import './App.scss';
import {Book} from './Reducer'
const App: React.FC = () => {
  const [storedBooks, setStoredBooks] = useLocalStorage<Book[]>('books', []);
  const { state: books, addBook, updateBook, deleteBook } = useBookReducer(storedBooks);

  useEffect(() => {
    setStoredBooks(books);
  }, [books, setStoredBooks]);

  const handleAddBook = (book: { title: string; author: string; year: string }) => {
    addBook({ ...book, id: uuidv4() });
  };

  const handleEditBook = (book: Book) => {
    updateBook(book);
  };

  const handleDeleteBook = (id: string) => {
    deleteBook(id);
  };

  return (
    <div className="App">
      <h1>Book Repository</h1>
      <BookForm onSubmit={handleAddBook} />
      <BookList books={books} onEdit={handleEditBook} onDelete={handleDeleteBook} />
    </div>
  );
};

export default App;
