import React, { memo, useEffect, useState } from 'react';

import Api from './Api'; // Updated to use the Api instance
import AsideBar from './AsideBar';
import { useParams } from 'react-router-dom';

const ViewSingle = () => {
  const [individual, setIndividual] = useState({});
  const [attendanceRecord, setAttendanceRecord] = useState({ total: 0, present: 0 });
  const { id } = useParams();

  useEffect(() => {
    document.title = `Info of ${individual.surname || 'Student'}.${individual.name || ''}`;
  }, [individual]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch student information
        const response = await Api.get(`/student/${id}`);
        setIndividual(response.data);

        // Fetch attendance details
        const attendanceResponse = await Api.get(`/student/${id}/attendance`);
        setAttendanceRecord(attendanceResponse.data || { total: 0, present: 0 });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUser();
  }, [id]);

  const calculatePercentage = (record) => {
    return record.total > 0 ? ((record.present / record.total) * 100).toFixed(2) : '0.00';
  };

  return (
    <>
      <AsideBar />
      <section className="bg-gray-100 min-h-screen p-4 viewSingle">
        <div className="flex flex-col lg:flex-row gap-6 viewSingle">
          {/* Student Information */}
          <div className="flex-2 bg-white shadow-md rounded-lg p-6 viewSingle">
            <h2 className="text-2xl font-semibold mb-4 viewSingle">Student Information</h2>
            <div className="space-y-2 viewSingle">
              <p className="text-lg"><span className="font-semibold">ROLL NO:</span> {individual.rollno}</p>
              <p className="text-lg"><span className="font-semibold">NAME:</span> {individual.surname} {individual.name}</p>
              <p className="text-lg"><span className="font-semibold">DOB:</span> {individual.dob}</p>
              <p className="text-lg"><span className="font-semibold">SCHOOL:</span>{individual.school}</p>
              <p className="text-lg"><span className="font-semibold">INTERMEDIATE:</span>{individual.inter}</p>
              <p className="text-lg"><span className="font-semibold">JOINING-YEAR:</span> {individual.jyear}</p>
              <p className="text-lg"><span className="font-semibold">GROUP:</span> {individual.studentGroup}</p>
              <p className="text-lg"><span className="font-semibold">YEAR:</span> {individual.year}</p>
              
              <p className="text-lg"><span className="font-semibold">FEE BALANCE:</span> {individual.balance}</p>
              <p className="text-lg"><span className="font-semibold">MOBILE-NO:</span> {individual.mobile}</p>
              <p className="text-lg"><span className="font-semibold">ADDRESS:</span> {individual.address}</p>
            </div>
          </div>

          {/* Academic Scores */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-6 viewSingle">
            <h2 className="text-2xl font-semibold mb-4">Academic Scores</h2>
            <div className="space-y-2 viewSingle">
              <p className="text-lg"><span className="font-semibold">10th SCORE:</span> {individual.tenthgpa}</p>
              <p className="text-lg"><span className="font-semibold">12th SCORE:</span> {individual.intergpa}</p>
              <p className="text-lg"><span className="font-semibold">SEM-1 SCORE:</span> {individual.sem1}</p>
              <p className="text-lg"><span className="font-semibold">SEM-2 SCORE:</span> {individual.sem2}</p>
              <p className="text-lg"><span className="font-semibold">SEM-3 SCORE:</span> {individual.sem3}</p>
              <p className="text-lg"><span className="font-semibold">SEM-4 SCORE:</span> {individual.sem4}</p>
              <p className="text-lg"><span className="font-semibold">SEM-5 SCORE:</span> {individual.sem5}</p>
              <p className="text-lg"><span className="font-semibold">SEM-6 SCORE:</span> {individual.sem6}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(ViewSingle);



//   { label: "ATTENDANCE %", value: `${calculatePercentage(attendanceRecord)}%` },

//completed