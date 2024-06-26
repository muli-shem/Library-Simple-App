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
  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editYear, setEditYear] = useState('');

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

  const handleEdit = (book: Book) => {
    setEditBookId(book.id);
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setEditYear(book.year);
  };

  const handleSave = (id: string) => {
    const updatedBook: Book = { id, title: editTitle, author: editAuthor, year: editYear };
    onEdit(updatedBook);
    setEditBookId(null);
  };

  const handleCancel = () => {
    setEditBookId(null);
  };

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
          <tr className='Titles'>
            <th className="p-2 border-b">Title</th>
            <th className="p-2 border-b">Author</th>
            <th className="p-2 border-b">Year</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map(book => (
            <tr key={book.id}>
              <td className="p-2 border-b">
                {editBookId === book.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    title='Title'
                  />
                ) : (
                  book.title
                )}
              </td>
              <td className="p-2 border-b">
                {editBookId === book.id ? (
                  <input
                    type="text"
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                    title='Author'
                  />
                ) : (
                  book.author
                )}
              </td>
              <td className="p-2 border-b">
                {editBookId === book.id ? (
                  <input
                    type="number"
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value)}
                    title='Publication Year'
                  />
                ) : (
                  book.year
                )}
              </td>
              <td className="p-2 border-b">
                {editBookId === book.id ? (
                  <>
                    <button onClick={() => handleSave(book.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(book)}>Edit</button>
                    <button className='delete-btn' onClick={() => onDelete(book.id)}>Delete</button>
                  </>
                )}
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
