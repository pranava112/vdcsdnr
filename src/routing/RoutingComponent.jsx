import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import PageNotFound from "../crud/others/PageNotFound";
import Home from "../Home";
import About from "../crud/others/About";

import Login from "../crud/Authentication/Login";
import Logout from "../crud/Authentication/Logout";
import Register from "../crud/Authentication/Register";
import PrivateRouting from "../crud/Authentication/PrivateRouting";

import CreateStudent from "../crud/others/CreateStudent";
import  ViewAll from "../crud/others/ViewAll";
 import Update from "../crud/others/Update";
 import ViewAllPersuing from "../crud/others/ViewAllPersuing ";
 
 import Notes from "../crud/Notes/Notes";
 import  NotesDisplay from "../crud/Notes/NoteDisplay";
 import  NotesForStudents from "../crud/Notes/NotesForStudents";
 import UpdateNotes from "../crud/Notes/UpdateNotes";
 import Announcement from "../crud/others/Announcement";
 import AnnouncementInput from "../crud/others/AnnouuncementInput";
 
 
 import Stats from "../crud/others/Stats";
 import  Payment from "../crud/Accounts/Payment";
 import  TimeTable from "../crud/Schedule/TimeTable";
 import  TimeTableStudent from "../crud/Schedule/TimeTableStudent";
 import  EditTimeTable from "../crud/Schedule/EditTimeTable";
 import  CreateTimeTable from "../crud/Schedule/CreateTimeTable";

import Tools from "../crud/Tools/Tools";
import CounterContext from "../crud/Tools/CounterContext";
import Youtube from "../crud/Tools/Youtube";
import Profile from "../crud/Authentication/Profile";
import Dictionary from "../crud/Tools/Dictionary";
import Ebooks from "../crud/Tools/Ebooks";
import Calculator from "../crud/Tools/Calculator";
import Instagram from "../crud/Tools/Instagram";
import Calender from "../crud/Tools/Calender";

import ViewSingle from "../crud/others/ViewSingle";
import AsideBar from "../crud/others/AsideBar";
import PortFolio from "../crud/others/PortFolio";
import CollegeMap from "../crud/others/CollegeMap ";


import ViewSingleNotice from "../Notices/ViewSingleNotice";
import Notice from "../Notices/Notice";
import DisplayNotice from "../Notices/DisplayNotice";
import University from "../crud/others/University";

import  Bcom1 from "../crud/Groups/Bcom1";
import  Bcom2 from "../crud/Groups/Bcom2";
import Bcom3 from "../crud/Groups/Bcom3";
import BscMpcs1 from "../crud/Groups/BscMpcs1";
import BscMpcs2 from "../crud/Groups/BscMpcs2";
import BscMpcs3 from "../crud/Groups/BscMpcs3";
import BscBzc1 from "../crud/Groups/BscBzc1";
import BscBzc2 from "../crud/Groups/BscBzc2";
import BscBzc3 from "../crud/Groups/BscBzc3";
import BscMzc1 from "../crud/Groups/BscMzc1";
import BscMzc2 from "../crud/Groups/BscMzc2";
import BscMzc3 from "../crud/Groups/BscMzc3";
import Ba1 from "../crud/Groups/Ba1";
import Ba2 from "../crud/Groups/Ba2";
import Ba3 from "../crud/Groups/Ba3";

import Bcom3Attendence from "../crud/Groups/Bcom3Attendence";
import Bcom1Attendence from "../crud/Groups/Bcom1Attendence";
import Bcom2Attendence from "../crud/Groups/Bcom2Attendence";
import Ba1Attendence from "../crud/Groups/Ba1Attendence";
import Ba2Attendence from "../crud/Groups/Ba2Attendence";
import Ba3Attendence from "../crud/Groups/Ba3Attendence";
import BscBzc1Attendence from "../crud/Groups/BscBzc1Attendence";
import BscBzc2Attendence from "../crud/Groups/BscBzc2Attendence";
import BscBzc3Attendence from "../crud/Groups/BscBzc3Attendence";
import RestrictedRouting from "../crud/Authentication/RestrictedRouting";
import BscMpcs1Attendence from "../crud/Groups/BscMpcs1Attendence";
import BscMpcs2Attendence from "../crud/Groups/BscMpcs2Attendence";
import BscMpcs3Attendence from "../crud/Groups/BscMpcs3Attendence";
import BscMzc1Attendence from "../crud/Groups/BscMzc1Attendence";
import BscMzc2Attendence from "../crud/Groups/BscMzc2Attendence";
import BscMzc3Attendence from "../crud/Groups/BscMzc3Attendence";

import DeleteStudent from "../crud/others/DeleteStudent";
import AdminRouting from "../crud/Authentication/AdminRouting";
import FacultyUpload from "../crud/Faculty/FacultyUpload";
import Faculty from "../crud/Faculty/Faculty"
import TransactionList from "../crud/Accounts/TransactionList";






export const routing = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },

      {path:"/logout",element:<Logout/>},
      {path:"/profile",element:<Profile/>},
      
      {path:'/displaynotice',element:<DisplayNotice/>},
      {path:"/viewImage/:id",element:<ViewSingleNotice/>},
      {path:"/others/university",element:<University/>},
      {path:"/tools/calendar",element:<Calender/>},
      
      {path:"/BscBzc1Attendence",element:<BscBzc1Attendence/>},
      {path:"/BscBzc2Attendence",element:<BscBzc2Attendence/>},
      {path:"/BscBzc3Attendence",element:<BscBzc3Attendence/>},
      {path:"/BscMpcs1Attendence",element:<BscMpcs1Attendence/>},
      {path:"/BscMpcs2Attendence",element:<BscMpcs2Attendence/>},
      {path:"/BscMpcs3Attendence",element:<BscMpcs3Attendence/>},
      {path:"/BscMzc1Attendence",element:<BscMzc1Attendence/>},
      {path:"/BscMzc2Attendence",element:<BscMzc2Attendence/>},
      {path:"/BscMzc3Attendence",element:<BscMzc3Attendence/>},

      // { path: "/register", element: <Register /> },
      
     {
      path:"/register",
      element:(
        <>
          <Register/>
        </>
      )
     },
    //  {
    //   path:"/whatsapp",
    //   element:(
    //     <PrivateRouting>
    //       <WhatsApp/>
    //     </PrivateRouting>
    //   )
    //  },

      {path:"/tools",element:<Tools/>},
      {path:"/tools/counter",element:<CounterContext/>},
      {path:"/youtube",element:<Youtube/>},
      {path:"/dictionary",element:<Dictionary/>},
      {path:"/books",element:<Ebooks/>},
      {path:"/calculator",element:<Calculator/>},
      {path:"/instagram",element:<Instagram/>},
    

      {path:"/portfolio",element:<PortFolio/>},
      {path:"/map",element:<CollegeMap/>},
      

      
     
     {
      path:"/notice",
      element:(
        <PrivateRouting>
          <Notice/>
        </PrivateRouting>
      )
     },

     {
      path: "/Ba1Attendence",
      element:(
        <PrivateRouting>
            <Ba1Attendence />
        </PrivateRouting>
      )
    },
    {
      path: "/Ba2Attendence",
      element:(
        <PrivateRouting>
            <Ba2Attendence />
        </PrivateRouting>
      )
    },
    {
      path: "/Ba3Attendence",
      element:(
        <PrivateRouting>
            <Ba3Attendence />
        </PrivateRouting>
      )
    },

     {
      path: "/Bcom1Attendence",
      element:(
        <PrivateRouting>
            <Bcom1Attendence />
        </PrivateRouting>
      )
    },
    {
      path: "/Bcom2Attendence",
      element:(
        <PrivateRouting>
            <Bcom2Attendence />
        </PrivateRouting>
      )
    },
     {
      path: "/Bcom3Attendence",
      element:(
        <PrivateRouting>
            <Bcom3Attendence />
        </PrivateRouting>
      )
    },

       // Group routes
      {
        path: "/ba1",
        element:(
          <PrivateRouting>
              <Ba1 />
          </PrivateRouting>
        )
      },
      {
        path: "/ba2",
        element:(
          <PrivateRouting>
              <Ba2/>
          </PrivateRouting>
        )
      },
      {
        path: "/ba3",
        element:(
          <PrivateRouting>
              <Ba3 />
          </PrivateRouting>
        )
      },
      {
        path: "/bcom1",
        element:(
          <PrivateRouting>
              <Bcom1/>
          </PrivateRouting>
        )
      },
      {
        path: "/bcom2",
        element:(
          <PrivateRouting>
              <Bcom2 />
          </PrivateRouting>
        )
      },
      {
        path: "/bcom3",
        element:(
          <PrivateRouting>
              <Bcom3 />
          </PrivateRouting>
        )
      },
      {
        path: "/bscmpcs1",
        element:(
          <PrivateRouting>
              <BscMpcs1 />
          </PrivateRouting>
        )
      },
      {
        path: "/bscmpcs2",
        element:(
          <PrivateRouting>
              <BscMpcs2 />
          </PrivateRouting>
        )
      },
      {
        path: "/bscmpcs3",
        element:(
          <PrivateRouting>
              <BscMpcs3 />
          </PrivateRouting>
        )
      },
      {
        path: "/bscbzc1",
        element:(
          <PrivateRouting>
              <BscBzc1 />
          </PrivateRouting>
        )
      },
      {
        path: "/bscbzc2",
        element:(
          <PrivateRouting>
              <BscBzc2 />
          </PrivateRouting>
        )
      },
      {
        path: "/bscbzc3",
        element:(
          <PrivateRouting>
              <BscBzc3 />
          </PrivateRouting>
        )
      },
      {
        path: "/bscmzc1",
        element:(
          <PrivateRouting>
              <BscMzc1 />
          </PrivateRouting>
        )
      },
      {
        path: "/bscmzc2",
        element:(
          <PrivateRouting>
              <BscMzc2 />
          </PrivateRouting>
        )
      },
      {
        path: "/bscmzc3",
        element:(
          <PrivateRouting>
              <BscMzc3 />
          </PrivateRouting>
        )
      },
      {
        path: "/announcement",
        element: (
          <PrivateRouting>
            <Announcement />
           </PrivateRouting>
        ),
      },
      {
        path: "/announcementinput",
        element: (
          <PrivateRouting>
            <AnnouncementInput />
          </PrivateRouting>
        ),
      },

     

      {
        path:"/students",
        element:(
          <PrivateRouting>
            <AsideBar/>
          </PrivateRouting>
        )
      },

      { path: "/notes", element: <Notes /> },
      { path: "/notesforstudents", element: <NotesForStudents /> },
      {
        path: "/notesdisplay",
        element: (
          <PrivateRouting>
            <NotesDisplay />
          </PrivateRouting>
        ),
      },
      {
        path: "/updatenotes/:id",
        element: (
          <PrivateRouting>
            <UpdateNotes />
          </PrivateRouting>
        ),
      },
      {
        path: "/viewall",
        element: (
          <PrivateRouting>
            <ViewAll />
          </PrivateRouting>
        ),
       },
      {
        path: "/create",
        element: (
          <PrivateRouting>
            <CreateStudent />
          </PrivateRouting>
        ),
      },
      {
        path: "/viewAllPersuing",
        element: (
          <PrivateRouting>
            <ViewAllPersuing />
          </PrivateRouting>
        ),
      },
      {
        path: "/viewsingle/:id",
        element: (
          <PrivateRouting>
            <ViewSingle />
          </PrivateRouting>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <AdminRouting>
            <Update />
          </AdminRouting>
        ),
      },

      {
        path: "/deleteStudent/:id",
        element: (
          <AdminRouting>
            <DeleteStudent />
          </AdminRouting>
        ),
      },

      { path: "/faculty", element: <Faculty /> },
      {path:"/facultyupload",element:<FacultyUpload/>},
      { path: "/timetable", element: <TimeTable /> },
      { path: "/timetablestudent", element: <TimeTableStudent /> },
      {
        path: "/edittimetable/:id",
        element: (
          <PrivateRouting>
            <EditTimeTable />
          </PrivateRouting>
        ),
      },
      {
        path: "/createtimetable",
        element: (
          <PrivateRouting>
            <CreateTimeTable />
          </PrivateRouting>
        ),
      },
     
      {
        path: "/stats",
        element: (
          <RestrictedRouting>
            <Stats />
          </RestrictedRouting>
        ),
      },
      {
        path: "/transactionList",
        element: (
          <RestrictedRouting>
            <TransactionList />
          </RestrictedRouting>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <AdminRouting>
            <Payment />
          </AdminRouting>
        ),
      },
      
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);
