import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../confing";


const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editInstructorId, setEditInstructorId] = useState(null);

  // Fetch all instructors function
  const fetchInstructors = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/api/instructors`);
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  // Fetch all instructors on component mount
  useEffect(() => {
    fetchInstructors();
  }, []);

  // Add a new instructor or update an existing one
  const saveInstructor = async () => {
    try {
      if (!username || !password || !name || !email) {
        alert("Please fill in all fields.");
        return;
      }
      const instructorData = { username, password, name, email };
      if (editMode) {
        await axios.put(
          `${config.baseURL}/api/instructors/${editInstructorId}`,
          instructorData
        );
      } else {
        await axios.post(
          `${config.baseURL}/api/instructors`,
          instructorData
        );
      }
      setEditMode(false);
      setUsername("");
      setPassword("");
      setName("");
      setEmail("");
      setEditInstructorId(null);
      fetchInstructors(); // Refresh instructor list
    } catch (error) {
      console.error(
        `Error ${editMode ? "updating" : "adding"} instructor:`,
        error
      );
    }
  };

  // Delete an instructor
  const deleteInstructor = async (id) => {
    try {
      await axios.delete(`${config.baseURL}/api/instructors/${id}`);
      fetchInstructors(); // Refresh instructor list
    } catch (error) {
      console.error("Error deleting instructor:", error);
    }
  };

  // Edit an instructor
  const editInstructorHandler = (instructor) => {
    setEditMode(true);
    setEditInstructorId(instructor._id);
    setUsername(instructor.user.username);
    setPassword(instructor.user.password);
    setName(instructor.name);
    setEmail(instructor.email);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Instructors</h2>

      {/* Add/Edit Instructor Form */}
      <form className="mt-4 mb-4">
        <div className="form-row">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder={editMode ? 'New Password' : 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-auto">
            {editMode ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveInstructor}
              >
                Update Instructor
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveInstructor}
              >
                Add Instructor
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Instructor Table */}
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor._id}>
              <td>{instructor.user.username}</td>
              <td>{instructor.name}</td>
              <td>{instructor.email}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning btn-sm mx-1"
                  onClick={() => editInstructorHandler(instructor)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteInstructor(instructor._id)}
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

export default Instructors;
