import React from "react";

const Poll = ({ poll, onVote }) => (
  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 my-4">
    <div className="font-bold text-lg mb-2">{poll.title}</div>
    <div className="space-y-2">
      {poll.options.map((opt) => (
        <button
          key={opt.product._id}
          className="block w-full text-left px-4 py-2 rounded bg-white border hover:bg-yellow-100"
          onClick={() => onVote(opt.product._id)}
        >
          {opt.product.title}{" "}
          <span className="ml-2 text-gray-500">({opt.votes.length} votes)</span>
        </button>
      ))}
    </div>
  </div>
);

export default Poll;
