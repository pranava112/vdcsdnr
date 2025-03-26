import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';

function Ebooks() {
  const [query, setQuery] = useState('');
  const [ebooks, setEbooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Books";
  }, []);

  const fetchEbooks = async () => {
    try {
      setError(null);
      setEbooks([]);
      setSelectedBook(null);
      setLoading(true);

      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );

      if (response.data.items) {
        setEbooks(response.data.items);
      } else {
        setError('No results found.');
      }
    } catch (e) {
      console.error(e);
      setError('An error occurred while fetching eBooks.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchEbooks();
    } else {
      setError('Please enter a valid Book to search.');
    }
  };

  const readText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div id='counter' className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-8 text-black">E-Books</h1>

      <div id='counter1' className="w-full max-w-6xl">
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6 justify-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for eBooks..."
            className="flex-grow border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!selectedBook ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ebooks.map((ebook) => (
              <div
                key={ebook.id}
                className="border border-gray-200 p-4 rounded shadow-md hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedBook(ebook)}
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {ebook.volumeInfo.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {ebook.volumeInfo.authors
                    ? `by ${ebook.volumeInfo.authors.join(', ')}`
                    : 'Unknown Author'}
                </p>
                <p className="text-gray-700 mt-2 text-sm line-clamp-3">
                  {ebook.volumeInfo.description || 'No description available.'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              {selectedBook.volumeInfo.title}
            </h2>
            <p className="text-gray-600 mb-2">
              <strong>Author(s):</strong> {selectedBook.volumeInfo.authors?.join(', ') || 'Unknown'}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Publisher:</strong> {selectedBook.volumeInfo.publisher || 'Unknown'}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Published Date:</strong> {selectedBook.volumeInfo.publishedDate || 'Unknown'}
            </p>
            <p className="text-gray-700 mt-4">
              {selectedBook.volumeInfo.description || 'No description available.'}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() =>
                  readText(
                    `${selectedBook.volumeInfo.title} by ${selectedBook.volumeInfo.authors?.join(
                      ', '
                    ) || 'Unknown Author'}. ${selectedBook.volumeInfo.description || 'No description available.'}`
                  )
                }
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                Read Aloud
              </button>
              <button
                onClick={() => setSelectedBook(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
              >
                Back to List
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Ebooks);













// import React, { useState } from 'react';
// import axios from 'axios';
// import './Ebooks.css'

// const Ebooks = () => {
//   const [query, setQuery] = useState('');
//   const [ebooks, setEbooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedBook, setSelectedBook] = useState(null);

//   const fetchEbooks = async () => {
//     try {
//       setError(null);
//       setEbooks([]);
//       setLoading(true);

//       const response = await axios.get(
//         `https://www.googleapis.com/books/v1/volumes?q=${query}`
//       );

//       if (response.data.items) {
//         setEbooks(response.data.items);
//       } else {
//         setError('No results found.');
//       }
//     } catch (e) {
//       console.error(e);
//       setError('An error occurred while fetching eBooks.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="App">
//       <header>
//         <h1>eBooks for College Students</h1>
//       </header>

//       <main>
//         <div className="search-bar">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search for eBooks..."
//           />
//           <button onClick={fetchEbooks} disabled={loading}>
//             {loading ? 'Loading...' : 'Search'}
//           </button>
//         </div>

//         {error && <p className="error">{error}</p>}

//         <div className="ebooks-list">
//           {ebooks.map((ebook) => (
//             <div
//               key={ebook.id}
//               className="ebook"
//               onClick={() => setSelectedBook(ebook)}
//               style={{ cursor: 'pointer' }}
//             >
//               <h3>{ebook.volumeInfo.title}</h3>
//               <p>{ebook.volumeInfo.authors?.join(', ')}</p>
//               {ebook.volumeInfo.imageLinks?.thumbnail && (
//                 <img
//                   src={ebook.volumeInfo.imageLinks.thumbnail}
//                   alt={ebook.volumeInfo.title}
//                 />
//               )}
//             </div>
//           ))}
//         </div>

//         {selectedBook && (
//           <div className="book-details">
//             <h2>{selectedBook.volumeInfo.title}</h2>
//             <p><strong>Authors:</strong> {selectedBook.volumeInfo.authors?.join(', ')}</p>
//             <p><strong>Publisher:</strong> {selectedBook.volumeInfo.publisher}</p>
//             <p><strong>Published Date:</strong> {selectedBook.volumeInfo.publishedDate}</p>
//             <p><strong>Description:</strong></p>
//             <p>{selectedBook.volumeInfo.description || 'No description available.'}</p>
//             <button onClick={() => setSelectedBook(null)}>Back to List</button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Ebooks;
