import { Route, Routes } from "react-router-dom";
// import Home from "../Pages/HomePage";
import PrivateLayout from "../Layout/PrivateLayout";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import ProtectedRoute from "../utils/ProtectedRoute";
import AdminDashboard from "../Pages/AdminDashboard";
import { useSelector } from 'react-redux';
import ProjectManagerDashboard from "../Pages/ProjectManagerDashboard";
import TeamMemberDashboard from "../Pages/TeamMemberDashboard";

function AllRoutes() {

  const role = useSelector((state) => state.auth.role);
  
  return (
    <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                {role === 'admin' && <AdminDashboard />}
                {role === 'project manager' && <ProjectManagerDashboard />}
                {role === 'team member' && <TeamMemberDashboard />}
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
      <Route
        path="/login"
        element={
          <PrivateLayout>
            <LoginPage />
          </PrivateLayout>
        }
      />
      <Route
        path="/register"
        element={
          <PrivateLayout>
            <RegisterPage />
          </PrivateLayout>
        }
      />
    </Routes>
  );
}

export default AllRoutes;
