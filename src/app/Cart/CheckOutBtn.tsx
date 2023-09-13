"use client";
import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

const CheckOutBtn = () => {
  const handleCheckOut = () => {};
  return (
    <div>
      <button
        onClick={handleCheckOut}
        className="bg-zinc-800 text-zinc-50 rounded-md shadow-md px-2 py-2 lg:px-5 lg:py-3 flex items-center gap-x-2">
        <ShoppingCartIcon className="w-5 h-5" />
        <p>Check Out</p>
      </button>
    </div>
  );
};

export default CheckOutBtn;
