"use client";

// import React, { useContext } from "react";

// import CartContext from "../cartContext/cartContext";
import { useSelector, useDispatch } from "react-redux";
import cartSlice, { cartActions } from "../store/slice/cartSlice";
import { RootState } from "../store/store";
import { useState } from "react";

interface QuantityProps {
  itemQuantity: number;
  Up: () => void;
  Down: () => void;
}

const Quantity = ({ itemQuantity, Up, Down }: QuantityProps) => {
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

  return (
    <>
      <div className="flex items-center gap-x-10">
        <p>Quantity : </p>
        <div className="flex items-center gap-x-4">
          <button
            onClick={Down}
            className="bg-zinc-800 text-zinc-50 px-2 py-1 rounded-md shadow-md">
            -
          </button>

          <p>{itemQuantity}</p>

          <button
            onClick={Up}
            className="bg-zinc-800 text-zinc-50 px-2 py-1 rounded-md shadow-md">
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default Quantity;
