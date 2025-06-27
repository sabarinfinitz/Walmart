import React from "react";
import { Link } from "react-router-dom";

const WishlistList = ({ wishlists }) => (
  <div className="space-y-4">
    {wishlists.map((w) => (
      <Link
        key={w._id}
        to={`/wishlist/${w._id}`}
        className="block bg-white p-4 rounded-lg shadow hover:bg-blue-50 border border-gray-200"
      >
        <div className="font-bold text-lg text-blue-900">{w.name}</div>
        <div className="text-sm text-gray-500">{w.members.length} members</div>
      </Link>
    ))}
  </div>
);

export default WishlistList;
