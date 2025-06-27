import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="flex items-center justify-between bg-blue-600 text-white px-6 py-3 rounded mb-6 shadow">
      <div className="flex items-center space-x-6">
        <Link to="/fakestore" className="font-bold text-lg hover:underline">
          FakeStore
        </Link>
        <Link to="/home" className="hover:underline">
          Wishlist
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/account" className="hover:underline">
          My Account
        </Link>
        <button
          onClick={handleLogout}
          className="bg-yellow-400 text-blue-900 px-3 py-1 rounded font-semibold ml-2 hover:bg-yellow-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
