import React, { useState, useEffect } from "react";
import axios from "axios";

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editLectureId, setEditLectureId] = useState(null);

  // Fetch all lectures function
  const fetchLectures = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/lectures");
      setLectures(response.data);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  // Fetch all courses function
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch all instructors function
  const fetchInstructors = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/instructors");
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchLectures();
    fetchCourses();
    fetchInstructors();
  }, []);

  // Add or update a lecture
  const saveLecture = async () => {
    try {
      if (!courseId || !instructorId || !date || !time) {
        alert("Please fill in all fields.");
        return;
      }
      const lectureData = { courseId, instructorId, date, time };
      if (editMode) {
        await axios.put(
          `http://localhost:4000/api/lectures/${editLectureId}`,
          lectureData
        );
      } else {
        await axios.post("http://localhost:4000/api/lectures", lectureData);
      }
      setCourseId("");
      setInstructorId("");
      setDate("");
      setTime("");
      setEditMode(false);
      setEditLectureId(null);
      fetchLectures(); // Refresh lecture list
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error saving lecture:", error);
    }
  };

  // Delete a lecture
  const deleteLecture = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this lecture?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:4000/api/lectures/${id}`);
        fetchLectures(); // Refresh lecture list
      }
    } catch (error) {
      console.error("Error deleting lecture:", error);
    }
  };

  // Edit a lecture
  const editLectureHandler = (lecture) => {
    setEditMode(true);
    setEditLectureId(lecture._id);
    setCourseId(lecture.course);
    setInstructorId(lecture.instructor);
    setDate(lecture.date.substring(0, 10)); // Extract date part only
    setTime(lecture.time);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lectures</h2>

      {/* Add Lecture Form */}
      <form className="mt-4 mb-4">
        <div className="form-row">
          <div className="mb-3">
            <select
              className="form-control"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-control"
              value={instructorId}
              onChange={(e) => setInstructorId(e.target.value)}
            >
              <option value="">Select Instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="time"
              className="form-control"
              placeholder="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="col-auto">
            {editMode ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveLecture}
              >
                Update Lecture
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveLecture}
              >
                Add Lecture
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Lecture Table */}
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Course</th>
            <th>Instructor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lectures.map((lecture) => (
            <tr key={lecture._id}>
              <td>
                {courses.find((course) => course._id === lecture.course)?.name}
              </td>
              <td>
                {
                  instructors.find(
                    (instructor) => instructor._id === lecture.instructor
                  )?.name
                }
              </td>
              <td>{new Date(lecture.date).toLocaleDateString()}</td>
              <td>{lecture.time}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning btn-sm mx-1"
                  onClick={() => editLectureHandler(lecture)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteLecture(lecture._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lectures;
