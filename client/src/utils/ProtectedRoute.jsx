import { Navigate } from 'react-router-dom';
import { getAuthToken } from './auth';
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default ProtectedRoute;
