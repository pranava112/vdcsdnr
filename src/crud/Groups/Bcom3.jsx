// Bcom3.js
import React, { memo } from 'react';
import BcomTable from './BcomTable';
import AsideBar from '../others/AsideBar';

const Bcom3 = () => {
  return (
    <>
   <AsideBar/>
    <BcomTable
      year="3"
      title="View Bcom-3 Students"
      attendenceLink="/Bcom3Attendence"
    />
     </>
  );
};

export default memo(Bcom3);
