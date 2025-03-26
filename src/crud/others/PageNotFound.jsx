import React, { memo } from 'react';

const PageNotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <img src="/public/emoji.jpeg" className="emoji w-32 h-32 mb-4" alt="Sad emoji" />
      <p className="text-lg text-gray-600">Sorry, the page you're looking for doesn't exist.</p>
    </section>
  );
};

export default memo(PageNotFound);
