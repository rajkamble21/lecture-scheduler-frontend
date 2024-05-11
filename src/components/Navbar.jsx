import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };
  const handleLogin = async () => {
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-brand btn btn-link text-dark">
          Lecture Scheduler
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {token ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-primary m-2" onClick={handleDashboardClick}>
                    Dashboard
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger m-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-primary m-2" onClick={handleLogin}>
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger m-2" onClick={handleRegisterClick}>
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
