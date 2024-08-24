import { Route, Routes } from "react-router-dom";
import Home from "../Pages/HomePage";
import PrivateLayout from "../Layout/PrivateLayout";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import ProtectedRoute from "../utils/ProtectedRoute";


function AllRoutes() {
  return (
    <Routes>
     <Route
          path="/"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <Home />
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
