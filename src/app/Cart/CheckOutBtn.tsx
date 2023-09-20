"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import getStripePromise from "@/lib1/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { cartActions } from "../store/slice/cartSlice";

const CheckOutBtn = () => {
  const cartItems = useSelector(
    (state: RootState) => state.cartSlice.CartItems
  );
  const dispatch = useDispatch<AppDispatch>();
  // console.log(`DATA FROM THE STRIPE FOLDER:`, cartItems);
  const handleCheckOut = async () => {
    // console.log(`HELLO FROM HANDLE CHECKOUT`);
    const stripe = await getStripePromise();

    // console.log(`STRIPE:`, stripe);
    const res = await fetch(`/api/stripe-session/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(cartItems),
    });
    if (!res.ok) {
      console.log(`Something wrong with the checkout...`);
    } else {
      const data = await res.json();
      // console.log(`Data in session:`, data.session);

      // console.log(`DATA IN CHECKOUT:`, data.session);
      if (data.session) {
        dispatch(cartActions.ClearCart());
        stripe?.redirectToCheckout({ sessionId: data.session.id });
        // stripe?.redirectToCheckout({
        //   sessionId: data.session.id,
        //   userId: userId,
        // });
      }
    }
  };
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
