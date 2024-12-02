import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutConfirmation: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold text-gray-800">You have been logged out successfully!</h2>
        <p className="text-gray-600 mt-2">Redirecting to the homepage...</p>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
