import React from "react";

const emojis = ["👍", "❤️", "😂", "🎉", "😮"];

const ReactionBar = ({ item, onReact }) => (
  <div className="flex items-center space-x-2 mt-2">
    {emojis.map((emoji) => (
      <button
        key={emoji}
        className="text-2xl hover:scale-110 transition-transform"
        onClick={() => onReact(item._id, emoji)}
      >
        {emoji}
        <span className="ml-1 text-sm text-gray-600">
          {item.reactions?.filter((r) => r.emoji === emoji).length || ""}
        </span>
      </button>
    ))}
  </div>
);

export default ReactionBar;
