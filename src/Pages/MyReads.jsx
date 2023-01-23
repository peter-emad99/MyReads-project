import React from "react";
import BookShelf from "../components/BookShelf";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function MyReads({ books, addBook }) {
	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					<BookShelf
						shelfTitle="Currently Reading"
						books={books.filter((book) => book.shelf === "currentlyReading")}
						addBook={addBook}
					/>
					<BookShelf
						shelfTitle="Want to Read"
						books={books.filter((book) => book.shelf === "wantToRead")}
						addBook={addBook}
					/>
					<BookShelf
						shelfTitle="Read"
						books={books.filter((book) => book.shelf === "read")}
						addBook={addBook}
					/>
				</div>
			</div>

			<Link to="/search" className="open-search">
				<span>Add a book</span>
			</Link>

			{/* {books.map((book) => (
				<p key={book.id}>{book.title}</p>
			))} */}
		</div>
	);
}
MyReads.propTypes = {
	books: PropTypes.array.isRequired,
	addBook: PropTypes.func.isRequired,
};
export default MyReads;
