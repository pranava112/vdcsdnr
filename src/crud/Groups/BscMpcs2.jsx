// Bcom3.js
import React, { memo } from 'react';
import BscMpcsTable from './BscMpcsTable';
import AsideBar from '../others/AsideBar';

const BscMpcs2 = () => {
  return (
    <>
   <AsideBar/>
    <BscMpcsTable
      year="2"
      title="View BscMpcs-2 Students"
      attendenceLink="/BscMpcs2Attendence"
    />
     </>
  );
};

export default memo(BscMpcs2);
