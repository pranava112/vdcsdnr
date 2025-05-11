// Bcom3.js
import React, { memo } from 'react';
import BscBzcTable from './BscBzcTable';
import AsideBar from '../others/AsideBar';

const BscBzc2 = () => {
  return (
    <>
   <AsideBar/>
    <BscBzcTable
      year="2"
      title="View BscBzc-2 Students"
      attendenceLink="/BscBzc2Attendence"
    />
     </>
  );
};

export default memo(BscBzc2);
