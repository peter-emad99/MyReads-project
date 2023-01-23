import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import { useEffect, useState, useRef, useMemo } from 'react';
import Book from '../components/Book';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

function SearchPage({ books, addBook }) {
	const [query, setQuery] = useState('');
	const [searchedBooks, setSearchedBooks] = useState([]);
	const inputElem = useRef();
	useEffect(() => {
		inputElem.current.focus();
	}, []);
	useEffect(() => {
		if (query !== '') {
			BooksAPI.search(query, 10).then((books) =>
				!books.error ? setSearchedBooks(books) : setSearchedBooks([])
			);
		} else {
			setSearchedBooks([]);
		}
	}, [query]);
	function handleSearch(e) {
		setQuery(e.target.value);
	}
	const debouncedHandleSearch = useMemo(() => debounce(handleSearch, 400), []);
	useEffect(() => {
		return () => {
			debouncedHandleSearch.cancel();
		};
	}, [debouncedHandleSearch]);

	return (
		<div className='search-books'>
			<div className='search-books-bar'>
				<Link to='/' className='close-search'>
					Close
				</Link>
				<div className='search-books-input-wrapper'>
					<input
						ref={inputElem}
						onChange={debouncedHandleSearch}
						type='text'
						placeholder='Search by title, author, or ISBN'
					/>
				</div>
			</div>
			<div className='search-books-results'>
				<ol className='books-grid'>
					{searchedBooks.length !== 0 && query
						? searchedBooks
								.filter((book) => book?.imageLinks?.smallThumbnail)
								.map((book) => {
									let existedBook = books.find(
										(existedBook) => existedBook.id === book.id
									);
									return existedBook ? (
										<Book key={book.id} book={existedBook} addBook={addBook} />
									) : (
										<Book key={book.id} book={book} addBook={addBook} />
									);
								})
						: ''}
				</ol>
			</div>
		</div>
	);
}
SearchPage.propTypes = {
	books: PropTypes.array.isRequired,
	addBook: PropTypes.func.isRequired,
};
export default SearchPage;
