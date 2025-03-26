import React, { useState,useEffect } from 'react'
import AsideBar from '../others/AsideBar'
import axios from 'axios';
import TimeTable from './TimeTable';

const CreateTimeTable = () => {

    let [timeTable,setTimeTable]=useState({
        group:"",
        class1:"",
        class2:"",
        class3:"",
        // class4:"",
        class5:"",
        class6:"",
        class7:"",
    
})

let{group,class1,class2,class3,class5,class6,class7}=timeTable;

 useEffect(() => {
   
  document.title="Create Time-Table"
  
}, []);

let handleChange=(e)=>{
    const {name,value}=e.target;
    setTimeTable({...timeTable,[name]:value})
}

let handleSubmit=(e)=>{
    e.preventDefault();
    console.log(timeTable);

    try{
      let payload={group,class1,class2,class3,class5,class6,class7};
      axios.post("http://localhost:4500/timetable",payload)
    }catch(e){
      console.log(e);
    }
    finally{
      setTimeTable({
        group:"",
        class1:"",
        class2:"",
        class3:"",
        // class4:"",
        class5:"",
        class6:"",
        class7:"",
      })
    }
    
}

  return (
    <>
     <AsideBar/> 

     <div className="p-6 max-w-4xl mx-auto space-y-8">
<h1 id='hhh' className="text-2xl font-semibold text-gray-800">Create TimeTable</h1>
<form onSubmit={handleSubmit} className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col space-y-2">
        <label htmlFor="group">Group</label>
        <input 
        type="text" 
        id='group'
        placeholder='Enter the group'
        name='group'
        value={group}
        required
        onChange={handleChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
        <label htmlFor="class1">1st Period</label>
        <input 
        type="text" 
        id='class1'
        placeholder='Enter the group'
        name='class1'
        value={class1}
        required
        onChange={handleChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        </div>

        <div className="flex flex-col space-y-2">
        <label htmlFor="class2">2nd Period</label>
        <input 
        type="text" 
        id='class2'
        placeholder='Enter the group'
        name='class2'
        value={class2}
        required
        onChange={handleChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        </div>
        
        {/* /////////////////////////////////////////////// */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
        <label htmlFor="class3">3rd Period</label>
        <input 
        type="text" 
        id='class3'
        placeholder='Enter the group'
        name='class3'
        value={class3}
        required
        onChange={handleChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        </div>
        </div>

        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
        <label htmlFor="class5">4th Period</label>
        <input 
        type="text" 
        id='class5'
        placeholder='Enter the group'
        name='class5'
        value={class5}
        required
        onChange={handleChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        </div>

        <div className="flex flex-col space-y-2">
        <label htmlFor="class6">5th Period</label>
        <input 
        type="text" 
        id='class6'
        placeholder='Enter the group'
        name='class6'
        value={class6}
        required
        onChange={handleChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
        <label htmlFor="class7">6th Period</label>
        <input 
        type="text" 
        id='class7'
        placeholder='Enter the group'
        name='class7'
        value={class7}
        required
        onChange={handleChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        </div>

        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Timetable
          </button>
        </div>
        </form>
        <TimeTable/>
        </div>
        
    </>
  )
}

export default CreateTimeTable