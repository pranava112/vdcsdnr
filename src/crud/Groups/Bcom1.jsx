// Bcom1.js
import React, { memo } from 'react';
import BcomTable from './BcomTable';
import AsideBar from '../others/AsideBar';

const Bcom1 = () => {
  return (
    <>
    <AsideBar/>
    <BcomTable
      year="1"
      title="View Bcom-1 Students"
      attendenceLink="/Bcom1Attendence"
    />
    </>
  );
};

export default memo(Bcom1);