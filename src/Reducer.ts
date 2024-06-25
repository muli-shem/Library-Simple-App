import { useReducer } from 'react';

 export interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
}

type Action =
  | { type: 'ADD_BOOK'; book: Book }
  | { type: 'UPDATE_BOOK'; book: Book }
  | { type: 'DELETE_BOOK'; id: string };

function bookReducer(state: Book[], action: Action): Book[] {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, action.book];
    case 'UPDATE_BOOK':
      return state.map(book => (book.id === action.book.id ? action.book : book));
    case 'DELETE_BOOK':
      return state.filter(book => book.id !== action.id);
    default:
      return state;
  }
}

export function useBookReducer(initialBooks: Book[]) {
  const [state, dispatch] = useReducer(bookReducer, initialBooks);

  const addBook = (book: Book) => dispatch({ type: 'ADD_BOOK', book });
  const updateBook = (book: Book) => dispatch({ type: 'UPDATE_BOOK', book });
  const deleteBook = (id: string) => dispatch({ type: 'DELETE_BOOK', id });

  return { state, addBook, updateBook, deleteBook };
}
