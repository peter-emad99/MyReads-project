import React from "react";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";

function Book({ book, addBook }) {
	// const selectElement = useRef();

	/**@param {Event} e */
	function changeShelf(e) {
		let shelf = e.target.value;
		BooksAPI.update(book, shelf);
		book.shelf = shelf;
		addBook(book);
	}
	const {
		authors,
		title,
		imageLinks: { smallThumbnail },
	} = book;
	/** @param {DragEvent} e */
	function handleDragStart(e) {
		e.dataTransfer.setData("book", JSON.stringify(book));
		// console.log(e);
	}
	return (
		<li
			onDragEnd={(e) => {
				// console.log(e);
			}}
			draggable
			onDragStart={(e) => {
				handleDragStart(e);
			}}
		>
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						style={{
							width: 128,
							height: 193,
							backgroundImage: `url(${smallThumbnail})`,
						}}
					></div>
					<div className="book-shelf-changer">
						<select
							defaultValue={book.shelf ? book.shelf : "none"}
							onChange={changeShelf}
						>
							<option value="" disabled>
								Move to...
							</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{title}</div>
				<div className="book-authors">{authors} </div>
			</div>
		</li>
	);
}
Book.propTypes = {
	book: PropTypes.object.isRequired,
	addBook: PropTypes.func.isRequired,
};
export default Book;
