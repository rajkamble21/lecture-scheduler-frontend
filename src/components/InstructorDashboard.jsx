import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const InstructorDashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role") === "Admin") {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div>InstructorDashboard - due to time constrain, I was unable to complete it,  also not a part of assignment, for now admin can add instructor</div>
  )
}

export default InstructorDashboard