"use client";
import { useSelector, useDispatch } from "react-redux";
import cartSlice, { cartActions } from "../store/slice/cartSlice";
import { AppDispatch, RootState } from "../store/store";
import { useState } from "react";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";
import { toast, Toaster } from "react-hot-toast";
import { fetchCartItems } from "../store/slice/cartSlice";

interface QProps {
  pid: string;
  iPrice: number;
  productName: string;
  image: string;
  userId: string;
}
const Quantity = ({ pid, iPrice, productName, image, userId }: QProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { CartItems } = useSelector((state: RootState) => state.cartSlice);
  const [Q1, setQ1] = useState(1);

  console.log(`Hello Girl here I am : ${Q1}`);

  /**ADDING ITEMS TO THE CART */
  const addToDb = async () => {
    const res = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({
        product_id: pid,
        quantity: Q1,
        price: iPrice,
        total_price: Q1 * iPrice,
        product_name: productName,
        image: image,
      }),
    });
  };
  /**UPDATING ITEMS IN THE DATABASE */
  const updateInDb = async (i: number) => {
    const qty = CartItems[i].item_quantity + Q1;
    const newPrice = qty * iPrice;

    const res = await fetch(`/api/cart?product_id=${pid}&user_id=${userId}`, {
      method: "PUT",
      body: JSON.stringify({
        quantity: qty,
        total_price: newPrice,
      }),
    });
  };
  const AddToCart = () => {
    const index = CartItems.findIndex((item) => item.product_id === pid);
    if (index > -1) {
      toast.promise(updateInDb(index), {
        loading: `In progress`,
        success: `Item updated successfully`,
        error: `Could not add`,
      });
    } else {
      toast.promise(addToDb(), {
        loading: `Adding ${Q1} item(s) to the cart`,
        success: `Item(s) added successfully`,
        error: `Failed to add data`,
      });
    }
    dispatch(
      cartActions.addToCart({
        pid: pid,
        itemQuantity: Q1,
        iName: productName,
        price: iPrice,
        pImage: image,
      })
    );
  };

  return (
    <>
      <div className="mb-8 flex items-center gap-x-10 lg:mb-10">
        <p>Quantity : </p>
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              setQ1(Q1 > 1 ? (prev) => prev - 1 : 1);
            }}
            className="bg-zinc-800 text-zinc-50 px-2 py-1 rounded-md shadow-md">
            -
          </button>

          <p>{Q1}</p>

          <button
            onClick={() => {
              setQ1((prev) => prev + 1);
            }}
            className="bg-zinc-800 text-zinc-50 px-2 py-1 rounded-md shadow-md">
            +
          </button>
        </div>
      </div>
      <div className="mt-28 -ml-20 flex items-center  gap-x-3 lg:gap-x-5">
        <div>
          <button
            onClick={AddToCart}
            className="px-8 py-4 ml-20 bg-zinc-900 text-zinc-50 text-sm rounded-sm hover:scale-105">
            {" "}
            Add to Cart
          </button>
        </div>
        <p className="font-semibold text-xl ml-20">${iPrice.toFixed(2)}</p>
      </div>
    </>
  );
};

export default Quantity;
