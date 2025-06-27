import React from "react";
import ReactionBar from "./ReactionBar";

const ProductList = ({ items, onReact }) => (
  <div className="space-y-4">
    {items.map((item) => (
      <div key={item._id} className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold">
          {item.product?.title || "Untitled Product"}
        </h2>
        <p>{item.product?.description}</p>
        <ReactionBar item={item} onReact={onReact} />
      </div>
    ))}
  </div>
);

export default ProductList;
