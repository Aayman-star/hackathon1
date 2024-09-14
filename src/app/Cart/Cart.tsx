"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchCartItems } from "../store/slice/cartSlice";

import SingleCartItem from "./SingleCartItem";
import TotalPrice from "./TotalPrice";

interface CartProp {
  userId: string;
}
interface CartItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  image: string;
}

const Cart = ({ userId }: CartProp) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCartItems(userId));
  }, [dispatch, userId]);

  const { CartItems, totalPrice } = useSelector(
    (state: RootState) => state.cartSlice
  );

  // console.log(`Here is the data from the CART ITEMS:`);
  // console.log(`FROM THE CART PAGE:`, CartItems);
  // console.log(`DETAILED INFO HERE :`);
  // console.log(CartItems.map((CartItem) => CartItem));

  return (
    <>
      <div className="min-h-screen w-full md:max-w-6xl md:mx-auto">
        <h2 className="text-3xl font-bold text-zinc-900 text-center mb-10">
          Shopping Cart
        </h2>
        <div>
          {CartItems.length ? (
            CartItems.map((item: any, i) => (
              <SingleCartItem key={item.product_id} {...item} userId={userId} />
            ))
          ) : (
            <p className="text-center text-xl italic">Your Cart is Empty</p>
          )}
        </div>
        {CartItems.length ? (
          <div className="p-4 w-full mx-auto lg:max-w-7xl lg:mx-auto grid place-content-end">
            <TotalPrice />
          </div>
        ) : (
          ""
        )}
        <div className="mt-10 grid place-content-center">
          <Link
            href={"/"}
            className="bg-zinc-800 text-zinc-50 font-light  px-6 py-4 rounded-md shadow-lg transform transition-all  hover:scale-110 duration-300">
            Return to Shop
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
