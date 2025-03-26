import React from 'react'


const University = () => {
  return (
    <>
    <section className="w-full flex flex-col md:flex-row bg-gray-100">
       
     
     <div className="flex-1 p-4 md:p-6">
     <div className="w-full overflow-x-auto shadow-lg bg-white rounded-lg">
     {/* <div id='about' className="min-h-screen w-full bg-gray-100 py-10 flex flex-col items-center"> */}
     <h1 id='hhh' className="text-2xl font-bold text-center text-gray-800 mb-2">PALAMURU UNIVERSITY</h1>

<div 
style={{ 
height: '1000px', 
border: "20px solid gray", 
marginRight: "20px", 
marginLeft: "20px", 
margin: "20px", 
width:"auto",
}} 
className="flex flex-col items-center justify-center w-full max-h-10xl p-4 bg-gray-100 rounded-lg shadow-lg overflow-hidden"
onClick={(e) => e.preventDefault()}
>

<iframe 
src="https://www.palamuruuniversity.com/Notifications" 
className="w-full h-full" 
frameBorder="0"
></iframe>
</div> 
</div></div>
</section>
    </>
  )
}

export default University
