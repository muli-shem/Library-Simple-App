import React, { useState, useCallback, useEffect } from 'react';
import './Booklist.scss';

interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
}

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const booksPerPage = 5;
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [currentPage, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="book-list p-4 border rounded shadow">
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input mb-4 p-2 border rounded w-full"
      />
      <table className="w-full mb-4 border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b">Title</th>
            <th className="p-2 border-b">Author</th>
            <th className="p-2 border-b">Year</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map(book => (
            <tr key={book.id}>
              <td className="p-2 border-b">{book.title}</td>
              <td className="p-2 border-b">{book.author}</td>
              <td className="p-2 border-b">{book.year}</td>
              <td className="p-2 border-b">
                <button onClick={() => onEdit(book)} className="edit">Edit</button>
                <button onClick={() => onDelete(book.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-btn bg-gray-300 text-gray-700 p-2 rounded">
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-btn bg-gray-300 text-gray-700 p-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
