// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import AsideBar from './AsideBar';
// import Api from '../others/Api'; // ✅ Use the configured API instance

// const Announcement = () => {
//   const [announcement, setAnnouncement] = useState({
//     information: '',
//   });

//   const { information } = announcement;
//   // const { id } = useParams();
//   const navigate = useNavigate();

//   // Fetch Announcement Data
//   const getApi = async () => {
//     try {
//       const { data } = await Api.get('/announcement/0'); // ✅ Using `Api` instance
//       setAnnouncement(data);
//       console.log('Fetched data:', data);
//     } catch (error) {
//       console.error('Error fetching announcement:', error);
//     }
//   };

//   useEffect(() => {
//     document.title = 'Announcement';
//     getApi();
//   }, []); // ✅ Removed `id` from dependencies (it’s static: `517a`)

//   // Handle Input Change
//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setAnnouncement({ ...announcement, [name]: value });
//   };

//   // // Handle Form Submission
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const payload = { information };
//   //     await Api.put('/announcement/0', payload); // ✅ Using `Api` instance
//   //     console.log('Updated payload:', payload);

//   //     alert('Data updated successfully!');
//   //     navigate('/'); // ✅ Navigate after successful update
//   //   } catch (error) {
//   //     console.error('Error updating data:', error);
//   //   } finally {
//   //     setAnnouncement({ information: '' }); // ✅ Reset input field
//   //   }
//   // };

//   const { id } = useParams(); // Get the correct announcement ID from URL params

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const payload = { information };
//     // Use the correct endpoint with the dynamic id
//     await Api.put(`/announcement/${id}`, payload); 
//     console.log('Updated payload:', payload);

//     alert('Data updated successfully!');
//     navigate('/'); // Navigate after successful update
//   } catch (error) {
//     console.error('Error updating data:', error);
//   } finally {
//     setAnnouncement({ information: '' }); // Reset input field
//   }
// };


//   return (
//     <>
//       <AsideBar />

//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//         <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
//           <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">📢 ANNOUNCEMENT</h1>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Announcement Input */}
//             <div className="flex flex-col">
//               <label htmlFor="anno" className="text-sm font-medium text-gray-700 mb-1">Announcement:</label>
//               <textarea
//                 id="anno"
//                 name="information"
//                 placeholder="Enter the announcement"
//                 value={information}
//                 onChange={handleInput}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-28"
//               />
//             </div>

//             {/* Submit Button */}
//             <button 
//               type="submit" 
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
//             >
//               SUBMIT
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Announcement;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Api from '../others/Api';
import AsideBar from './AsideBar';

const Announcement = () => {
  const [announcement, setAnnouncement] = useState({ information: '' });
  const { id } = useParams(); // Get the dynamic ID from URL
  const navigate = useNavigate();

  // Fetch Announcement Data by ID
  const getApi = async () => {
    try {
      const { data } = await Api.get(`/announcements/1`);
      setAnnouncement(data);
      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error fetching announcement:', error);
    }
  };

  useEffect(() => {
    document.title = 'Announcement';
    getApi();
  }, [id]); // Ensure it updates if ID changes

  // Handle Input Change
  const handleInput = (e) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { information: announcement.information };
      await Api.put(`/announcements/1`, payload);
      console.log('Updated payload:', payload);

      alert('Data updated successfully!');
      navigate('/'); // Navigate after update
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Update failed.');
    }
  };

  return (
    <>
      <AsideBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">📢 ANNOUNCEMENT</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="anno" className="info text-sm font-medium text-gray-700 mb-1">Announcement:</label>
              <textarea
                id="anno"
                name="information"
                placeholder="Enter the announcement"
                value={announcement.information}
                onChange={handleInput}
                required
                className="info w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-28"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Announcement;
