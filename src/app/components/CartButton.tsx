import React from "react";
import Link from "next/link";

const CartButton = () => {
  return (
    <>
      <Link href={"/Cart"}>
        <button className="bg-gray-200 grid place-content-center rounded-full w-12 h-12 hover:scale-125">
          <svg
            className="w-5 h-5 font-bold"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              stroke-linecap="round"
              stroke-linejoin="round"></path>
          </svg>
        </button>
      </Link>
    </>
  );
};

export default CartButton;