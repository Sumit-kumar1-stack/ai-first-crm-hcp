import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
const Register = lazy(() => import("./pages/Register"));

import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/layout/Layout";

// Lazy Loaded Pages
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AIWorkspace = lazy(() => import("./pages/AIWorkspace"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const History = lazy(() => import("./components/history/HistoryPanel"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Loading...
          </div>
        }
      >
        <Routes>
          {/* =========================
              PUBLIC ROUTES
          ========================= */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Redirect */}

          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          {/* =========================
              PROTECTED ROUTES
          ========================= */}

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/assistant"
              element={<AIWorkspace />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/history"
              element={<History />}
            />

            <Route
              path="/doctors"
              element={<Doctors />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />
          </Route>

          {/* =========================
              404
          ========================= */}

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
