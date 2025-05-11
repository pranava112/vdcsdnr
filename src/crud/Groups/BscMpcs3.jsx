// Bcom3.js
import React, { memo } from 'react';
import BscMpcsTable from './BscMpcsTable';
import AsideBar from '../others/AsideBar';

const BscMpcs3 = () => {
  return (
    <>
   <AsideBar/>
    <BscMpcsTable
      year="3"
      title="View BscMpcs-3 Students"
      attendenceLink="/BscMpcs3Attendence"
    />
     </>
  );
};

export default memo(BscMpcs3);
