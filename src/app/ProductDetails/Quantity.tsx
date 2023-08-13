"use client";
import { useSelector, useDispatch } from "react-redux";
import cartSlice, { cartActions } from "../store/slice/cartSlice";
import { RootState } from "../store/store";
import { useState } from "react";

interface QProps {
  Q1: number;
  increaseQ1: () => void;
  decreaseQ1: () => void;
}

const Quantity = ({ Q1, increaseQ1, decreaseQ1 }: QProps) => {
  // const itemQuantity = useSelector(
  //   (state: RootState) => state.cartSlice.item_quantity
  // );

  // const dispatch = useDispatch();

  // const IncreaseQuantity = () => {
  //   dispatch(cartActions.increment());
  // };

  // const DecreaseQuantity = () => {
  //   dispatch(cartActions.decrement());
  // };
  console.log(`child:`, Q1);

  return (
    <>
      <div className="flex items-center gap-x-10">
        <p>Quantity : </p>
        <div className="flex items-center gap-x-4">
          <button
            onClick={decreaseQ1}
            className="bg-zinc-800 text-zinc-50 px-2 py-1 rounded-md shadow-md">
            -
          </button>

          <p>{Q1}</p>

          <button
            onClick={increaseQ1}
            className="bg-zinc-800 text-zinc-50 px-2 py-1 rounded-md shadow-md">
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default Quantity;
