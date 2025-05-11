import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";

import Api from "./Api";
import AsideBar from "./AsideBar";
import { NavLink } from "react-router-dom";

// Register Chart.js modules
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Stats = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [groupData, setGroupData] = useState({ labels: [], datasets: [] });
  const [rollNo, setRollNo] = useState("");
  const [totalFees, setTotalFees] = useState({ totalPaid: 0, totalDue: 0 });
  const [totalBalanceDue, setTotalBalanceDue] = useState(0);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await Api.get("/student");
        setStudents(response.data);
        setFilteredStudents(response.data);
        processGroupData(response.data);
        calculateFees(response.data);
        calculateTotalBalanceDue(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const calculateFees = (studentsList) => {
    let totalPaid = 0;
    let totalDue = 0;

    studentsList.forEach((student) => {
      if (student.transactions && Array.isArray(student.transactions)) {
        student.transactions.forEach((transaction) => {
          if (transaction.type === "fee") {
            totalPaid += transaction.amount;
          } else if (transaction.type === "payment") {
            totalDue += transaction.amount;
          }
        });
      }
    });

    setTotalFees({ totalPaid, totalDue });
  };

  const calculateTotalBalanceDue = (studentsList) => {
    let totalBalance = 0;
    studentsList.forEach((student) => {
      totalBalance += student.balance || 0;
    });
    setTotalBalanceDue(totalBalance);
  };

  const processGroupData = (students) => {
    const groupYearBalances = {};

    students.forEach((student) => {
      const group = student.studentGroup;
      const year = student.year;
      const key = `${group}-${year}`;

      groupYearBalances[key] = (groupYearBalances[key] || 0) + student.balance;
    });

    const labels = Object.keys(groupYearBalances);
    const data = Object.values(groupYearBalances);

    setGroupData({
      labels: labels,
      datasets: [
        {
          label: "Total Balance (₹)",
          data: data,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF5733", "#DAF7A6"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF5733", "#DAF7A6"],
        },
      ],
    });
  };

  const handleRollNoChange = (event) => {
    const rollNoValue = event.target.value;
    setRollNo(rollNoValue);

    if (rollNoValue === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) =>
        student.rollno.toString().includes(rollNoValue)
      );
      setFilteredStudents(filtered);
    }

    calculateTotalBalanceDue(filteredStudents);
  };

  const handleRowClick = (student) => {
    // alert(`Selected Student: ${student.surname} ${student.name}`);
  };

  const [expandedTransactions, setExpandedTransactions] = useState({});

  const toggleTransactions = (rollNo) => {
    setExpandedTransactions((prev) => ({
      ...prev,
      [rollNo]: !prev[rollNo],
    }));
  };

  const handlePieChartClick = (event, chartElement) => {
    if (chartElement.length > 0) {
      const index = chartElement[0].index;
      const label = groupData.labels[index];
      const [group, year] = label.split("-");

      setSelectedGroup(group);
      setSelectedYear(year);

      const filtered = students.filter(
        (student) => student.studentGroup === group && student.year === year
      );
      setFilteredStudents(filtered);

      const filteredGroupYearData = groupData.labels
        .filter((label) => label.startsWith(`${group}-${year}`))
        .map((label) => groupData.datasets[0].data[groupData.labels.indexOf(label)]);

      setGroupData({
        labels: [`${group} - ${year}`],
        datasets: [
          {
            label: "Total Balance (₹)",
            data: filteredGroupYearData,
            backgroundColor: ["#FF6384"],
            hoverBackgroundColor: ["#FF6384"],
          },
        ],
      });
    }
  };

  return (
    <>
      <AsideBar />
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <div className="w-full p-4 space-y-8 m-2">
          <h1 className="text-center h1stats transactions">Statistics</h1>

          {/* Fees Summary Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Fees Summary</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Total Fees :</span>
                  <span className="text-red-600 font-bold text-lg">₹{totalFees.totalPaid}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Total Fees Collected :</span>
                  <span className="text-green-700 font-bold text-lg"> ₹{totalFees.totalDue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Balance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Balance</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Total Balance Due :</span>
                <span className="text-red-600 font-bold text-lg">₹{totalBalanceDue}</span>
              </div>
            </div>
          </div>

          {/* Roll No Filter */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Search By Roll Number</h2>
            <input
              type="text"
              value={rollNo}
              onChange={handleRollNoChange}
              className="border border-gray-300 rounded px-4 py-2"
              placeholder="Enter Roll Number"
            />
          </div>

          {/* Student Table */}
          <div>
            <div className="h-72 overflow-x-auto">
              <table className="w-full text-sm text-left overflow-scroll text-gray-500 border border-gray-200">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">Roll No</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Group</th>
                    <th className="px-4 py-2 border">Year</th>
                    <th className="px-4 py-2 border">Balance</th>
                    <th className="px-4 py-2 border">Transactions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.rollno}
                      className="odd:bg-white even:bg-gray-50 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleRowClick(student)}
                    >
                      <td className="px-4 py-2 border">{student.rollno}</td>
                      <td className="px-4 py-2 border">{`${student.surname} ${student.name}`}</td>
                      <td className="px-4 py-2 border">{student.studentGroup}</td>
                      <td className="px-4 py-2 border">{student.year}</td>
                      <td className="px-4 py-2 border">{student.balance}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => toggleTransactions(student.rollno)}
                          className="text-blue-500"
                        >
                          {expandedTransactions[student.rollno] ? "Hide" : "Show"} Transactions
                        </button>
                        {expandedTransactions[student.rollno] && student.transactions && (
                          <ul className="mt-2 text-sm text-gray-600">
                            {student.transactions.map((transaction, index) => (
                              <li key={index}>
                                <strong>{transaction.type}</strong> - ₹{transaction.amount} -- {transaction.description} -- Receipt-No = {transaction.receiptno}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="flex flex-col items-center text-black">
            <h2 className="text-lg font-semibold text-black mb-4">Group-Year Distribution</h2>
            {groupData.labels.length > 0 ? (
              <div className="w-full text-black max-w-md">
                <Pie
                  data={{
                    labels: groupData.labels.map(
                      (label, index) => `${label} (₹${groupData.datasets[0].data[index] || 0})`
                    ),
                    datasets: groupData.datasets,
                  }}
                  onElementsClick={handlePieChartClick}
                />
              </div>
            ) : (
              <p className="text-black">No data available for pie chart</p>
            )}
          </div>

          {/* Bar Chart */}
          <div className="flex text-black flex-col items-center">
            <h2 className="text-lg font-semibold text-black mb-4">Group Data Overview</h2>
            {groupData.labels.length > 0 ? (
              <div className="text-black w-full max-w-2xl">
                <Bar
                  data={{
                    labels: groupData.labels,
                    datasets: groupData.datasets,
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) =>
                            `${tooltipItem.dataset.label}: ₹${tooltipItem.raw}`,
                        },
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <p className="text-black">No data available for column chart</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <NavLink
          to="/transactionList"
          id="Navbar"
          className="bg-blue-500 flex items-center space-x-1 w-auto text-white py-2 px-4 rounded-md mt-6 mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 relative"
        >
          View All Transactions
          <span className="tooltip hidden absolute bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2">
            Transactions
          </span>
        </NavLink>
      </div>
    </>
  );
};

export default Stats;
