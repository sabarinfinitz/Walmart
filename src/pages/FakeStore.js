import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

const FakeStore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  const addToWishlist = async (product) => {
    setAdding((a) => ({ ...a, [product.id]: true }));
    setMessage("");
    try {
      // Create a wishlist if not exists, or use the first one
      let wishlists = await API.get("/wishlist");
      let wishlistId;
      if (wishlists.data.length === 0) {
        const wl = await API.post("/wishlist", { name: "My Wishlist" });
        wishlistId = wl.data._id;
      } else {
        wishlistId = wishlists.data[0]._id;
      }
      // Add product to wishlist
      await API.post(`/wishlist/${wishlistId}/item`, {
        title: product.title,
        description: product.description,
        image: product.image,
        price: product.price,
        category: product.category,
        link: product.id,
      });
      setMessage(`Added '${product.title}' to wishlist!`);
    } catch (err) {
      setMessage("Failed to add product.");
    }
    setAdding((a) => ({ ...a, [product.id]: false }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">FakeStore Products</h1>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded shadow p-4 flex flex-col"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-32 object-contain mb-2"
              />
              <div className="font-semibold mb-1">{p.title}</div>
              <div className="text-gray-600 text-sm mb-2">{p.category}</div>
              <div className="mb-2">${p.price}</div>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded mt-auto disabled:opacity-50"
                onClick={() => addToWishlist(p)}
                disabled={adding[p.id]}
              >
                {adding[p.id] ? "Adding..." : "Add to Wishlist"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FakeStore;
