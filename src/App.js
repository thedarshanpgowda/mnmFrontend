import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";

import Mainhodblock from "./hod/Mainhodblock";
import Mainteacherblock from "./teacherblock/Mainteacherblock";
import Mainstudentblock from "./Student/Mainstudentblock";
import FacultyLogin from "./Login/FacultyLogin";
import Signup from "./Login/Signup";
import Newstate from "./context/Newstate";
import FacultyState from "./context/FacultyState";
import Landing from "./components/Landing";

function App() {


  return (
    <>
      <FacultyState>
        <Newstate>
          <Router>
            <Routes>
              <Route exact path="/" element={<Landing/>} />
              <Route exact path="/mnm/" element={<Signup />} />
              <Route path="/mnm/faculty" element={<FacultyLogin />} />
              <Route path="/mnm/student" element={<Mainstudentblock />} />
              <Route path="/mnm/HOD" element={<Mainhodblock />} />
              <Route path="/mnm/teacher" element={<Mainteacherblock />} />
            </Routes>
          </Router>
        </Newstate>
      </FacultyState>
    </>
  );



}

export default App;





