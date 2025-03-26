// Bcom3.js
import React, { memo } from 'react';
import BscBzcTable from './BscBzcTable';
import AsideBar from '../others/AsideBar';

const BscBzc1 = () => {
  return (
    <>
   <AsideBar/>
    <BscBzcTable
      year="1"
      title="View BscBzc-1 Students"
      attendenceLink="/BscBzc1Attendence"
    />
     </>
  );
};

export default memo(BscBzc1);
