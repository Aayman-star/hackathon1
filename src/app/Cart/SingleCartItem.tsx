"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { Toaster, toast } from "react-hot-toast";
import { cartActions } from "../store/slice/cartSlice";
import { fetchCartItems } from "../store/slice/cartSlice";

import {
  TrashIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/20/solid";
interface CartItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  total_price: number;
  image: string;
  userId: string;
}

const SingleCartItem = ({
  product_id,
  userId,
  quantity,
  product_name,
  image,
  price,
}: CartItem) => {
  const [localquantity, setLocalQuantity] = useState<number>(quantity);

  const dispatch = useDispatch<AppDispatch>();

  const localQtyUp = () => {
    setLocalQuantity(localquantity + 1);
  };
  const localQtyDown = () => {
    setLocalQuantity(localquantity - 1);
  };

  /**DELETING FROM DATABASE */
  const deleteFromDb = async () => {
    try {
      await fetch(`/api/cart?product_id=${product_id}&user_id=${userId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(`Something went wrong: `, error);
    }
    dispatch(fetchCartItems(userId));
  };
  /**INCREASING ITEM QUANTITY IN THE DATABASE */
  const increaseItemQty = async () => {
    const qtyUp = quantity + 1;
    console.log(`qtyUp : ${qtyUp}`);
    const newPrice = qtyUp * price;

    const res = await fetch(
      `/api/cart?product_id=${product_id}&user_id=${userId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          quantity: qtyUp,
          total_price: newPrice,
        }),
      }
    );
    dispatch(fetchCartItems(userId));
  };

  /**DeCREASING ITEM QUANTITY IN THE DATABASE */
  const decreaseItemQty = async () => {
    const qtyDown = quantity - 1;
    console.log(`qtyDown : ${qtyDown}`);
    const newPrice = qtyDown * price;

    const res = await fetch(
      `/api/cart?product_id=${product_id}&user_id=${userId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          quantity: qtyDown,
          total_price: newPrice,
        }),
      }
    );
    dispatch(fetchCartItems(userId));
  };

  const handleDelete = () => {
    toast.promise(deleteFromDb(), {
      loading: `Deleting product from the cart`,
      success: `Item deleted successfully`,
      error: `Could not delete item from the cart`,
    });
    dispatch(cartActions.removeFromCart({ pid: product_id }));
  };
  const handleOneUp = () => {
    localQtyUp();
    toast.promise(increaseItemQty(), {
      loading: `Update in progress`,
      success: `update successful`,
      error: `update failed`,
    });
    dispatch(
      cartActions.IncrementItem({
        pid: product_id,
        price: price,
      })
    );
  };
  const handleOneDown = () => {
    localQtyDown();
    toast.promise(decreaseItemQty(), {
      loading: `Update in progress`,
      success: `update successful`,
      error: `update failed`,
    });
    dispatch(
      cartActions.DecrementItem({
        pid: product_id,
        price: price,
      })
    );
  };
  return (
    <>
      <div className="w-[95%] p-2 grid grid-cols-[repeat(4,minmax(0,1fr))] mt-10  border-y-[0.8px] border-zinc-900/50 border-x-0   md:rounded-md md:border-[1px] md:border-zinc-900/50 md:max-w-6xl mx-auto ">
        <div className="col-span-2 p-2 flex lg:place-items-center gap-x-2 md:col-span-4 lg:col-span-1">
          <Image
            className="transform transition-all hover:scale-105 duration-300 hidden md:block"
            src={image}
            alt="product"
            width={120}
            height={100}
          />
          <Image
            className="transform transition-all hover:scale-105 duration-300 md:hidden"
            src={image}
            alt="product"
            width={120}
            height={75}
          />
          <div className="hidden md:block mt-8">
            <h2 className=" text-zinc-800">{product_name}</h2>
            <button onClick={handleDelete}>
              <TrashIcon className="h-4 w-4 sm:h-7 sm:w-7" />
            </button>
          </div>
        </div>
        <div className="p-2 col-span-2 md:col-span-4 md:border-t-2 border-t-zinc-900 lg:border-none md:flex justify-between lg:col-span-3 lg:flex items-center lg:justify-around ">
          <div className="sm:block md:hidden">
            <h2 className="text-base md:text-xl text-zinc-900 font-medium">
              {product_name}
            </h2>
            <button onClick={handleDelete}>
              <TrashIcon className="h-5 w-5 sm:h-7 sm:w-7" />
            </button>
          </div>
          <h3 className="text-base text-zinc-800 font-normal md:text-lg">
            ${price.toFixed(2)}
          </h3>
          <div className="flex items-center gap-x-4 ">
            {quantity === 1 ? (
              <button onClick={handleDelete}>
                <TrashIcon className="h-5 w-5 sm:h-7 sm:w-7" />
              </button>
            ) : (
              <button onClick={handleOneDown}>
                <MinusCircleIcon className="h-5 w-5 sm:h-7 sm:w-7" />
              </button>
            )}

            <p className="text-base text-zinc-900 font-medium md:text-lg">
              {quantity}
            </p>
            <button onClick={handleOneUp}>
              <PlusCircleIcon className="h-5 w-5 sm:h-7 sm:w-7" />
            </button>
          </div>
          <h3 className="text-base text-zinc-800 font-semibold md:text-lg">
            ${(price * quantity).toFixed(2)}
          </h3>
        </div>
      </div>
    </>
  );
};

export default SingleCartItem;
