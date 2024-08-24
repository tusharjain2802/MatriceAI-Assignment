import { Route, Routes } from "react-router-dom";
import Home from "../Pages/HomePage";
import PrivateLayout from "../Layout/PrivateLayout";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";


function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateLayout>
            <Home />
          </PrivateLayout>
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
