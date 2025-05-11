// Bcom3.js
import React, { memo } from 'react';
import BscMpcsTable from './BscMpcsTable';
import AsideBar from '../others/AsideBar';

const BscMpcs1 = () => {
  return (
    <>
   <AsideBar/>
    <BscMpcsTable
      year="1"
      title="View BscMpcs-1 Students"
      attendenceLink="/BscMpcs1Attendence"
    />
     </>
  );
};

export default memo(BscMpcs1);
