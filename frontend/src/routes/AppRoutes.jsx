import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppLayout from "../Layouts/AppLayout";

import Dashboard from "../pages/Dashboard";
import AIWorkspace from "../pages/AIWorkspace";
import Analytics from "../pages/Analytics";
import Doctors from "../pages/Doctors";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="ai"
            element={<AIWorkspace />}
          />

          <Route
            path="analytics"
            element={<Analytics />}
          />

          <Route
            path="doctors"
            element={<Doctors />}
          />

          <Route
            path="reports"
            element={<Reports />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
}