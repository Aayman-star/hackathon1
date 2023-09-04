"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { cartActions } from "../store/slice/cartSlice";
import { Toaster, toast } from "react-hot-toast";
import { fetchCartItems } from "../store/slice/cartSlice";

interface CartProp {
  userId: string;
}
interface CartItemprop {
  productId: string;
  productQuantity: number;
  productName: string;
  pImage: string;
  iPrice: number;
}
const CartDisplay1 = ({ userId }: CartProp) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    fetchCartItems(userId);
  }, [dispatch]);
  const { CartItems, totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cartSlice
  );
  console.log(`RECEIVED DATA:`, CartItems, totalItems, totalPrice);
  /**DELETING FROM DATABASE */
  const deleteFromDb = async (productId:string) => {
    try {
      await fetch(`/api/cart?product_id=${productId}&user_id=${userId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(`Something went wrong: `, error);
    }
  };
    /**INCREASING ITEM QUANTITY IN THE DATABASE */
    const increaseItemQty = async () => {
        const qtyUp = ;
        console.log(`qtyUp : ${qtyUp}`);
        const newPrice = qtyUp * iPrice;
    
        const res = await fetch(
          `/api/cart?product_id=${productId}&user_id=${userId}`,
          {
            method: "PUT",
            body: JSON.stringify({
              quantity: qtyUp,
              total_price: newPrice,
            }),
          }
        );
      };
};
export default CartDisplay1;
