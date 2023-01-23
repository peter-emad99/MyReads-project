import './App.css';
import MyReads from './Pages/MyReads';
import { Route, Routes } from 'react-router-dom';
import SearchPage from './Pages/SearchPage';
import { useEffect, useState } from 'react';
import * as BooksAPI from './BooksAPI';

function App() {
	const [books, setBooks] = useState([]);
	const addBook = (book) => {
		setBooks([...books.filter((item) => item.id !== book.id), book]);
	};
	useEffect(() => {
		BooksAPI.getAll().then((data) => setBooks(data));
	}, []);
	return (
		<div>
			{' '}
			<Routes>
				<Route path='/' element={<MyReads books={books} addBook={addBook} />} />
				<Route path='/search' element={<SearchPage books={books} addBook={addBook} />} />
			</Routes>
		</div>
	);
}

export default App;
