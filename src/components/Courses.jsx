import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../confing";


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);

  // Fetch all courses function
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/api/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch all courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Add a new course or update an existing one
  const saveCourse = async () => {
    try {
      if (!name || !level || !description || !imageUrl) {
        alert("Please fill in all fields.");
        return;
      }
      const courseData = { name, level, description, imageUrl };
      if (editMode) {
        await axios.put(
          `${config.baseURL}/api/courses/${editCourseId}`,
          courseData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(`${config.baseURL}/api/courses`, courseData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setEditMode(false);
      setName("");
      setLevel("");
      setDescription("");
      setImageUrl("");
      setEditCourseId(null);
      fetchCourses(); // Refresh course list
    } catch (error) {
      console.error(`Error ${editMode ? "updating" : "adding"} course:`, error);
    }
  };

  // Delete a course
  const deleteCourse = async (id) => {
    try {
      await axios.delete(`${config.baseURL}/api/courses/${id}`);
      fetchCourses(); // Refresh course list
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Edit a course
  const editCourseHandler = (course) => {
    setEditMode(true);
    setEditCourseId(course._id);
    setName(course.name);
    setLevel(course.level);
    setDescription(course.description);
    setImageUrl(course.imageUrl);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Courses</h2>

      {/* Add/Edit Course Form */}
      <form className="mt-4 mb-4">
        <div className="form-row">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Course Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control-file"
              onChange={(e) => setImageUrl(e.target.files[0])}
            />
          </div>
          <div className="col-auto">
            {editMode ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveCourse}
              >
                Update Course
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveCourse}
              >
                Add Course
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Course Table */}
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Course Name</th>
            <th>Level</th>
            <th>Description</th>
            <th>Image URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.level}</td>
              <td>{course.description}</td>
              <td>
                <img
                  src={course.imageUrl ? `${config.baseURL}/${course.imageUrl.replace('uploads\\', '')}` : ""}
                  alt="React Image"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning btn-sm mx-1"
                  onClick={() => editCourseHandler(course)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCourse(course._id)}
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

export default Courses;
