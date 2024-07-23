import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      toast.error("You must be logged in to view this page");
      navigate("/login");
    }
  }, [token, navigate]);

  if (token === null) {
    // Optionally, you can return a loading spinner or null here while the redirection is taking place
    return null;
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default ProtectedRoute;

