import React, { memo, useEffect, useState } from 'react';

const Youtube = () => {
  const [playlists, setPlaylists] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = 'AIzaSyCa2kO_Uxbj9QSBZW_fvg9VcH3uGtmVEwc'; // Replace with your API key

  
  const CHANNEL_ID = 'UC7D_pAu6QIrUGawd2uwtOeg'; // Replace with your channel ID UC7D_pAu6QIrUGawd2uwtOeg

  useEffect(() => {
    // Fetch the first page of playlists on initial render
    fetchPlaylists();
    document.title="Vignan Youtube Channel"
  }, []);

  const fetchPlaylists = async (pageToken = null) => {
    setLoading(true); // Set loading state
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=10&key=${API_KEY}${
          pageToken ? `&pageToken=${pageToken}` : ''
        }`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.items) {
        setPlaylists((prevPlaylists) => [...prevPlaylists, ...data.items]); // Append new items to the existing list
      }

      setNextPageToken(data.nextPageToken || null); // Update the nextPageToken
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setError('Failed to fetch playlists. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 m-6 flex max-w-[2304px] flex-col items-center">
     
    
     
      <h1 className="text-3xl font-bold mb-8 text-black">Vignan Degree College YouTube Channel</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <iframe
                src={`https://www.youtube.com/embed/videoseries?list=${playlist.id}`}
                title={playlist.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64"
              ></iframe>
              <h2 className="text-lg font-semibold mt-2 px-4">
                {playlist.snippet.title}
              </h2>
            </div>
          ))
        ) : (
          <p>No playlists found.</p>
        )}
      </div>
      {nextPageToken && (
        <button
          onClick={() => fetchPlaylists(nextPageToken)}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Next Page'}
        </button>
      )}
    </div>
  );
};

export default memo(Youtube);


//completed finally on 25/12/2024