// Bcom3.js
import React, { memo } from 'react';
import BscMzcTable from './BscMzcTable';
import AsideBar from '../others/AsideBar';

const BscMzc3 = () => {
  return (
    <>
   <AsideBar/>
    <BscMzcTable
      year="3"
      title="View BscMzc-3 Students"
      attendenceLink="/BscMzc3Attendence"
    />
     </>
  );
};

export default memo(BscMzc3);
