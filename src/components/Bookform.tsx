import React, { useRef, FormEvent } from 'react';
import './Bookform.scss';

interface BookFormProps {
  onSubmit: (book: { title: string; author: string; year: string }) => void;
  initialBook?: { title: string; author: string; year: string };
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialBook }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({
      title: titleRef.current?.value || '',
      author: authorRef.current?.value || '',
      year: yearRef.current?.value || '',
    });
    if (titleRef.current) titleRef.current.value = '';
    if (authorRef.current) authorRef.current.value = '';
    if (yearRef.current) yearRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="book-form p-4 border rounded shadow">
      <div className="form-group mb-4">
        <label className="form-label block mb-2">Title:</label>
        <input ref={titleRef} defaultValue={initialBook?.title} className="form-input w-full p-1.5 border rounded" />
      </div>
      <div className="form-group mb-4">
        <label className="form-label block mb-2">Author:</label>
        <input ref={authorRef} defaultValue={initialBook?.author} className="form-input w-full p-1.5 border rounded" />
      </div>
      <div className="form-group mb-4">
        <label className="form-label block mb-2">Year:</label>
        <input ref={yearRef} defaultValue={initialBook?.year} className="form-input w-full p-1.5 border rounded" />
      </div>
      <button type="submit" className="submit-btn bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default BookForm;
