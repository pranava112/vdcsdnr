// Bcom1.js
import React, { memo } from 'react';
import BaTable from './BaTable';
import AsideBar from '../others/AsideBar';

const Ba2 = () => {
  return (
    <>
    <AsideBar/>
    <BaTable
      year="2"
      title="View Ba-2 Students"
      attendenceLink="/Ba2Attendence"
    />
    </>
  );
};

export default memo(Ba2);