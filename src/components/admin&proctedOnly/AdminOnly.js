import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectEmail } from "../../redux/features/authSlice";

const AdminOnly = ({ children }) => {
  const email = useSelector(selectEmail);
  if (email === "test@a.com") {
    return children;
  }
  return <Navigate to="/" />;
};

export const AdminLink = ({ children }) => {
  const email = useSelector(selectEmail);
  if (email === "test@a.com") {
    return children;
  }
  return null;
};

export default AdminOnly;
