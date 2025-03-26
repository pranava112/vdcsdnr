// Bcom2.js
import React, { memo } from 'react';
import BcomTable from './BcomTable';
import AsideBar from '../others/AsideBar';

const Bcom2 = () => {
  return (
    <>
    <AsideBar/>
    <BcomTable
      year="2"
      title="View Bcom-2 Students"
      attendenceLink="/Bcom2Attendence"
    />
    </>
  );
};

export default memo(Bcom2);
