// Bcom1.js
import React, { memo } from 'react';
import BaTable from './BaTable';
import AsideBar from '../others/AsideBar';

const Ba3 = () => {
  return (
    <>
    <AsideBar/>
    <BaTable
      year="3"
      title="View Ba-3 Students"
      attendenceLink="/Ba3Attendence"
    />
    </>
  );
};

export default memo(Ba3);