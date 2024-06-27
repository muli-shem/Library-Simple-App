import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import BookForm from './components/Bookform';
import BookList from './components/Booklist';
import './App.scss';
import { Book, useBookReducer } from './Reducer';

const backendUrl = 'https://librarybackend-1-gs6u.onrender.com';

const App: React.FC = () => {
  const { state: books, addBook, updateBook, deleteBook } = useBookReducer([]);
  const [refresh, setRefresh] = useState(false); // State to trigger re-fetch

  useEffect(() => {
    // Fetch books from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/Books`);
        addBook(response.data); // Assuming response.data is an array of books
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchBooks();
  }, [refresh, addBook]); // Include refresh state to trigger re-fetch

  const handleAddBook = async (book: { title: string; author: string; year: string }) => {
    const newBook = { ...book, id: uuidv4() };
    try {
      const response = await axios.post(`${backendUrl}/api/Books`, newBook, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 201) {
        setRefresh(!refresh); // Trigger re-fetch
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  const handleEditBook = async (book: Book) => {
    try {
      const response = await axios.put(`${backendUrl}/api/Books/${book.id}`, book, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        setRefresh(!refresh); // Trigger re-fetch
      } else {
        console.error('Failed to update book');
      }
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/Books/${id}`);
      if (response.status === 200) {
        setRefresh(!refresh); // Trigger re-fetch
      } else {
        console.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
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
