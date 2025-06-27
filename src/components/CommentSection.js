import React, { useState } from "react";

const CommentSection = ({ item, onComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onComment(item._id, text);
    setText("");
  };

  return (
    <div className="mt-2">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Post
        </button>
      </form>
      <div className="mt-2 space-y-1">
        {item.comments?.map((c, i) => (
          <div
            key={i}
            className="text-sm text-gray-700 bg-gray-100 rounded px-2 py-1"
          >
            <span className="font-semibold">{c.user?.name || "User"}:</span>{" "}
            {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
