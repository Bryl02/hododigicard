import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { auth } from "./firebase";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateCard from "./pages/CreateCard";
import EditCard from "./pages/EditCard";
import PublicCard from "./pages/PublicCard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <p>
        Loading HodoDigiCard...
      </p>
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Login />
            )
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            user ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Register />
            )
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* CREATE CARD */}
        <Route
          path="/create-card"
          element={
            user ? (
              <CreateCard />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* EDIT CARD */}
        <Route
          path="/edit-card/:cardId"
          element={
            user ? (
              <EditCard />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* PUBLIC CARD */}
        <Route
          path="/card/:cardId"
          element={
            <PublicCard />
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                user
                  ? "/dashboard"
                  : "/login"
              }
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;