// Bcom1.js
import React, { memo } from 'react';
import BaTable from './BaTable';
import AsideBar from '../others/AsideBar';

const Ba1 = () => {
  return (
    <>
    <AsideBar/>
    <BaTable
      year="1"
      title="View Ba-1 Students"
      attendenceLink="/Ba1Attendence"
    />
    </>
  );
};

export default memo(Ba1);