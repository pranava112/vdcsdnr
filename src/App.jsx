import React, { memo } from 'react';
import ReactDOM from "react-dom/client";

import { RouterProvider } from 'react-router-dom';
import { routing } from './routing/RoutingComponent';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <div>
        <Toaster position="bottom-left" reverseOrder={false} />
      </div>
      <div>
        <RouterProvider router={routing} />
      </div>
      
    </>
  );
};

export default memo(App);