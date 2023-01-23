import React, { useRef } from "react";
import Book from "./Book";
import PropTypes from "prop-types";
import camelCase from "lodash.camelcase";
import * as BooksAPI from "../BooksAPI";

function BookShelf({ shelfTitle, books, addBook }) {
	/** @type {HTMLElement}  booksArea.current */
	const booksArea = useRef();

	/** @param {DragEvent} e */
	function handleDrop(e) {
		let draggedBook = JSON.parse(e.dataTransfer.getData("book"));
		let shelfName = camelCase(shelfTitle);
		if (!(draggedBook.shelf === shelfName)) {
			draggedBook.shelf = shelfName;
			BooksAPI.update(draggedBook, shelfName);
			addBook(draggedBook);
		}
	}
	return (
		<div
			// onDragEnter={(e) => {
			// 	e.preventDefault();
			// 	booksArea.current.classList.add("dragover");
			// 	console.log("dragEnter");
			// }}
			// onDragLeave={(e) => {
			// 	e.preventDefault();
			// 	booksArea.current.classList.remove("dragover");
			// 	console.log("dragLeave");
			// }}
			onDragOver={(e) => {
				e.preventDefault();
				// booksArea.current.classList.add("dragover");
				// console.log("dragOver");
			}}
			onDrop={(e) => {
				booksArea.current.classList.remove("dragover");
				// console.log(e);
				handleDrop(e);
			}}
			className="bookshelf"
		>
			<h2 className="bookshelf-title">{shelfTitle}</h2>
			<div className="bookshelf-books " ref={booksArea}>
				<ol className="books-grid">
					{books.map((book) => (
						<Book addBook={addBook} key={book.id} book={book} />
					))}
				</ol>
			</div>
		</div>
	);
}
BookShelf.propTypes = {
	books: PropTypes.array.isRequired,
	addBook: PropTypes.func.isRequired,
	shelfTitle: PropTypes.string.isRequired,
};
export default BookShelf;
