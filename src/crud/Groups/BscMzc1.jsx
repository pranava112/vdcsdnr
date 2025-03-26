// Bcom3.js
import React, { memo } from 'react';
import BscMzcTable from './BscMzcTable';
import AsideBar from '../others/AsideBar';

const BscMzc1 = () => {
  return (
    <>
   <AsideBar/>
    <BscMzcTable
      year="1"
      title="View BscMzc-1 Students"
      attendenceLink="/BscMzc1Attendence"
    />
     </>
  );
};

export default memo(BscMzc1);
