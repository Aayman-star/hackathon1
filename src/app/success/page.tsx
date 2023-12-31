"use client";
import React, { useEffect } from "react";
import { getCookie } from "cookies-next";
import { cartActions, fetchCartItems } from "../store/slice/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

const clearCart = async (userId: string) => {
  try {
    await fetch(`/api/clearcart?user_id=${userId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(`Something went wrong: `, error);
  }
};

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = getCookie("user_id") as string;

  useEffect(() => {
    dispatch(cartActions.ClearCart());
    clearCart(userId);
  }, [userId]);

  return (
    <>
      <div className="w-full h-screen p-4 mt-2 lg:max-w-7xl lg:mx-auto lg:grid lg:place-content-center lg:mt-0 lg:p-0">
        <p className="bg-white text-gray-900 text-5xl font-semibold">
          Order Placed Successfully...
        </p>
      </div>
    </>
  );
};

export default Page;
