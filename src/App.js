import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Instructors from './components/Instructors';
import Courses from './components/Courses';
import Lectures from './components/Lectures';
import InstructorDashboard from './components/InstructorDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/instructordashboard" element={<InstructorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

