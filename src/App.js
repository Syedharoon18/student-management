import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";

function App() {
  // Load students from localStorage
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents
      ? JSON.parse(savedStudents)
      : [
          {
            id: 1,
            firstName: "Syed",
            lastName: "Haroon",
            phone: "1234567890",
            email: "haroon@gmail.com",
            gender: "Male",
            address: "Chennai, India",
            dob: "2000-01-15",
          },
        ];
  });

  // Save students to localStorage on change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  return (
    <Router>
      {/* 🔔 Toast Notifications (Global) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <Routes>
        {/* Student List */}
        <Route
          path="/"
          element={
            <StudentList students={students} setStudents={setStudents} />
          }
        />

        {/* Add Student */}
        <Route
          path="/add-student"
          element={
            <AddStudent students={students} setStudents={setStudents} />
          }
        />

        {/* Edit Student */}
        <Route
          path="/edit-student/:id"
          element={
            <EditStudent students={students} setStudents={setStudents} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
