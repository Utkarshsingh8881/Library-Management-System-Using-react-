import React, { useState, useEffect } from 'react';
import {data} from '../data'
import '../css/LibraryManagementPage.css'


const BOOKS_PER_PAGE = 10; // Number of books to display per page

function LibraryManagementPage() {
    const [books, setBooks] = useState([]); // Array to store the list of books
    const [filteredBooks, setFilteredBooks] = useState([]); // Array to store the filtered list of books
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [filter, setFilter] = useState({
        title: '',
        author: '',
        subject: '',
        publish_date: '',
    }); // Filter criteria

   
    useEffect(() => {
        
        const fetchBooks = async () => {

            setBooks(data);
        };

        fetchBooks();
    }, []);

    // Handle filter criteria change
    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    // Apply filters to the list of books
    useEffect(() => {
        const filtered = books.filter((book) => {
            const titleMatch = book.title.toLowerCase().includes(filter.title.toLowerCase());
            const authorMatch = book.author.toLowerCase().includes(filter.author.toLowerCase());
            const subjectMatch = book.subject.toLowerCase().includes(filter.subject.toLowerCase());
            const publish_dateMatch = book.publish_date.includes(filter.publish_date);

            return titleMatch && authorMatch && subjectMatch && publish_dateMatch;
        });

        setFilteredBooks(filtered);
        setCurrentPage(1); // Reset to the first page when filters change
    }, [books, filter]);

    // Pagination logic
    const indexOfLastBook = currentPage * BOOKS_PER_PAGE;
    const indexOfFirstBook = indexOfLastBook - BOOKS_PER_PAGE;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    // Change the current page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    
  return (
    <div>
      <h1 className="page-title">Library Management Page</h1>

      {/* Filter inputs */}
      <div className="filter-container">
        <input type="text" name="title" placeholder="Title" value={filter.title} onChange={handleFilterChange} className="filter-input" />
        <input type="text" name="author" placeholder="Author" value={filter.author} onChange={handleFilterChange} className="filter-input" />
        <input type="text" name="subject" placeholder="Subject" value={filter.subject} onChange={handleFilterChange} className="filter-input" />
        <input type="text" name="publish_date" placeholder="Publish Date" value={filter.publish_date} onChange={handleFilterChange} className="filter-input" />
      </div>

      {/* Book count based on filter criteria */}
      <div className="book-count-container">
        <p className="book-count">Total Books: {filteredBooks.length}</p>
        <p className="book-count">Books matching Title: {filteredBooks.filter((book) => book.title.toLowerCase().includes(filter.title.toLowerCase())).length}</p>
        <p className="book-count">Books matching Author: {filteredBooks.filter((book) => book.author.toLowerCase().includes(filter.author.toLowerCase())).length}</p>
        <p className="book-count">Books matching Subject: {filteredBooks.filter((book) => book.subject.toLowerCase().includes(filter.subject.toLowerCase())).length}</p>
        <p className="book-count">Books matching Publish Date: {filteredBooks.filter((book) => book.publish_date.includes(filter.publish_date)).length}</p>
      </div>

      {/* Book list */}
      <div className="book-list">
        {currentBooks.map((book) => (
          <div key={book.id} className="book-item">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-info">Author: {book.author}</p>
            <p className="book-info">Subject: {book.subject}</p>
            <p className="book-info">Publish Date: {book.publish_date}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {filteredBooks.length > BOOKS_PER_PAGE &&
          Array.from({ length: Math.ceil(filteredBooks.length / BOOKS_PER_PAGE) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className="page-number">
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
}

export default LibraryManagementPage;

