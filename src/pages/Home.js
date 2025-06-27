import React, { useEffect, useState } from "react";
import API from "../api";
import WishlistList from "../components/WishlistList";

const Home = () => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const res = await API.get("/wishlist");
        setWishlists(res.data);
      } catch (err) {
        setWishlists([]);
      }
      setLoading(false);
    };
    fetchWishlists();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">
        Collaborative Wishlists
      </h1>
      {loading ? (
        <div>Loading...</div>
      ) : wishlists.length === 0 ? (
        <div className="text-gray-500">No wishlists found.</div>
      ) : (
        <WishlistList wishlists={wishlists} />
      )}
    </div>
  );
};

export default Home;
