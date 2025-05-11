// Bcom3.js
import React, { memo } from 'react';
import BscBzcTable from './BscBzcTable';
import AsideBar from '../others/AsideBar';

const BscBzc3 = () => {
  return (
    <>
   <AsideBar/>
    <BscBzcTable
      year="3"
      title="View BscBzc-3 Students"
      attendenceLink="/BscBzc3Attendence"
    />
     </>
  );
};

export default memo(BscBzc3);
