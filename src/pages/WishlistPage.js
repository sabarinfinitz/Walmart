import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import CommentSection from "../components/CommentSection";
import Poll from "../components/Poll";

const WishlistPage = () => {
  const { id } = useParams();
  const [wishlist, setWishlist] = useState(null);
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await API.get(`/wishlist/${id}`);
        setWishlist(res.data);
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      }
    };
    const fetchPoll = async () => {
      try {
        const res = await API.get(`/polls?wishlist=${id}`);
        setPoll(res.data);
      } catch (err) {
        setPoll(null);
      }
    };
    fetchWishlist();
    fetchPoll();
  }, [id]);

  const handleReact = async (itemId, emoji) => {
    await API.post(`/wishlist/${id}/item/${itemId}/react`, { emoji });
    const res = await API.get(`/wishlist/${id}`);
    setWishlist(res.data);
  };

  const handleComment = async (itemId, text) => {
    await API.post(`/wishlist/${id}/item/${itemId}/comment`, { text });
    const res = await API.get(`/wishlist/${id}`);
    setWishlist(res.data);
  };

  const handleVote = async (productId) => {
    if (!poll) return;
    await API.post(`/polls/${poll._id}/vote`, { productId });
    const res = await API.get(`/polls/${poll._id}/results`);
    setPoll({ ...poll, options: res.data.results });
  };

  if (!wishlist) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{wishlist.name}</h1>
      {poll && <Poll poll={poll} onVote={handleVote} />}
      {wishlist.items.length === 0 ? (
        <p className="text-gray-500">No items yet.</p>
      ) : (
        wishlist.items.map((item, idx) => (
          <div
            key={item._id || idx}
            className="bg-white p-4 rounded-xl shadow-md mb-4"
          >
            <h2 className="text-xl font-semibold">
              {item.product?.title || "Untitled Product"}
            </h2>
            <p>{item.product?.description}</p>
            <ProductList items={[item]} onReact={handleReact} />
            <CommentSection item={item} onComment={handleComment} />
          </div>
        ))
      )}
    </div>
  );
};

export default WishlistPage;
