import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import Home from "./pages/Home";
import WishlistPage from "./pages/WishlistPage";
import FakeStore from "./pages/FakeStore";
import Navbar from "./components/Navbar";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  useEffect(() => {
    const handler = () => {};
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <Routes>
          <Route path="/login" element={<LoginRegister onAuth={() => {}} />} />
          <Route
            path="/fakestore"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <FakeStore />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <Navigate
                to={localStorage.getItem("token") ? "/fakestore" : "/login"}
                replace
              />
            }
          />
          <Route
            path="/wishlist/:id"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <WishlistPage />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Home />
                </>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
