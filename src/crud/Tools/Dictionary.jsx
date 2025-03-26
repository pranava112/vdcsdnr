import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import { FcSpeaker } from 'react-icons/fc';

function Dictionary() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Dictionary";
  }, []);

  const fetchDefinition = async () => {
    try {
      setError(null);
      setDefinition(null);

      // First API call
      let response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setDefinition(response.data[0]);
    } catch (e) {
      console.warn('Primary API failed, trying secondary API...');

      try {
        // Second API call (fallback)
        const response = await axios.get(
          `https://api.pearson.com/v2/dictionaries/entries?headword=${word}`
        );
        if (response.data.results.length > 0) {
          setDefinition({ word, meanings: response.data.results });
        } else {
          throw new Error('Word not found in secondary API.');
        }
      } catch (e) {
        console.error(e);
        setError('Word not found or an error occurred.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim()) {
      fetchDefinition();
    } else {
      setError('Please enter a valid word.');
    }
  };

  const playAudio = () => {
    if (definition && definition.phonetics && definition.phonetics[0]?.audio) {
      const audio = new Audio(definition.phonetics[0].audio);
      audio.play();
    } else {
      setError('Audio not available for this word.');
    }
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
    <div id='counter' className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <header className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Dictionary App</h1>
       
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {definition && (
          <div id='tools' className="mt-6">
            <h2 id='h3' className="text-2xl font-semibold text-gray-800">{definition.word}</h2>
            {definition.phonetics && definition.phonetics[0]?.audio && (
              <button
                onClick={playAudio}
                className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition mt-4"
              >
                <FcSpeaker title="Audio" />
              </button>
            )}
            {definition.meanings?.map((meaning, index) => (
              <div id='tools1' key={index} className="mt-4">
                <h3 id='h3' className="text-lg font-medium text-gray-700">{meaning.partOfSpeech || 'Definition'}</h3>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  {meaning.definitions?.map((def, i) => (
                    <li key={i} className="flex items-center">
                      {def.definition}
                      <button
                        onClick={() => speakText(def.definition)}
                        className="ml-2 text-blue-500 hover:text-blue-700 transition"
                      >
                        <FcSpeaker title="Audio" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
    </>
  );
}

export default memo(Dictionary);
