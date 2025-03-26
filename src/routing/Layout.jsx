import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '../crud/others/Footer';
import Header from '../Header';
import Navbar from '../Navbar';


const Layout = () => { 

  return (
    <>
    <Header/>
     <Navbar/>   
     <main className='mainContainer'>
     
        <Outlet className='background'/>
        {/* <div className='background'></div> */}

     </main>
<Footer/>    

    </>
  )
}

export default Layout;