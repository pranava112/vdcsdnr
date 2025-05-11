// Bcom3.js

import React, { memo } from 'react';

import AsideBar from '../others/AsideBar';
import BscMpcsTable from './BscMpcsTable';

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