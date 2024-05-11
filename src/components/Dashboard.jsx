import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [instructorsCount, setInstructorsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [lecturesCount, setLecturesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructorsResponse = await axios.get('http://localhost:4000/api/instructors');
        const coursesResponse = await axios.get('http://localhost:4000/api/courses');
        const lecturesResponse = await axios.get('http://localhost:4000/api/lectures');
        setInstructorsCount(instructorsResponse.data.length);
        setCoursesCount(coursesResponse.data.length);
        setLecturesCount(lecturesResponse.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Welcome to Admin Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Instructors</div>
            <div className="card-body">
              <h5 className="card-title">{instructorsCount}</h5>
              <p className="card-text">Total number of instructors</p>
              <Link to="/instructors" className="btn btn-light">View Instructors</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Courses</div>
            <div className="card-body">
              <h5 className="card-title">{coursesCount}</h5>
              <p className="card-text">Total number of courses</p>
              <Link to="/courses" className="btn btn-light">View Courses</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">Lectures</div>
            <div className="card-body">
              <h5 className="card-title">{lecturesCount}</h5>
              <p className="card-text">Total number of lectures</p>
              <Link to="/lectures" className="btn btn-light">View Lectures</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
