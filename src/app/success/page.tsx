"use client";
import React, { useEffect } from "react";
import { getCookie } from "cookies-next";
import { cartActions, fetchCartItems } from "../store/slice/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { BadgeCheck } from "lucide-react";

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
    // dispatch(cartActions.ClearCart());
    // clearCart(userId);
    /**The following function is being created and called if userId exists */
    if (userId) {
      const clearcart = async () => {
        await clearCart(userId);
        dispatch(cartActions.ClearCart());
      };
      clearcart();
    }
  }, [dispatch, userId]);

  return (
    <>
      <div className="w-full h-[80vh] md:h-[75vh] grid place-content-center">
        <div className="w-full  md:max-w-6xl md:mx-auto flex flex-col items-center gap-y-2">
          <BadgeCheck className="mx-auto text-zinc-100 fill-[#22c55e]  w-12 h-12 md:w-20 md:h-20" />
          <p className="text-zinc-800 text-2xl font-medium md:text-4xl md:font-semibold text-center">
            Order Placed Successfully...
          </p>
          <p className="text-center">
            Thank you for shopping with us,
            <span className="block">We look forward to your next order😊</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
