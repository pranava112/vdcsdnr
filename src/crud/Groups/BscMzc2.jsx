// Bcom3.js
import React, { memo } from 'react';
import BscMzcTable from './BscMzcTable';
import AsideBar from '../others/AsideBar';

const BscMzc2 = () => {
  return (
    <>
   <AsideBar/>
    <BscMzcTable
      year="2"
      title="View BscMzc-2 Students"
      attendenceLink="/BscMzc2Attendence"
    />
     </>
  );
};

export default memo(BscMzc2);
