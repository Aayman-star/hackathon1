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
  const increaseQ1 = () => {
    setQ1(Q1 + 1);
  };
  const decreaseQ1 = () => {
    setQ1(Q1 > 1 ? Q1 - 1 : 1);
  };

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
    //dispatch(fetchCartItems(userId));
  };
  // const incrementInDB = async (i: number, tempQ: number) => {
  //   const qty = Q1 + 1;
  //   const newPrice = qty * iPrice;
  //   const res = await fetch(`/api/cart?product_id=${pid}&user_id=${userId}`, {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       quantity: qty,
  //       total_price: newPrice,
  //     }),
  //   });
  //   dispatch(fetchCartItems(userId));
  // };
  // /**UPDATING ITEMS IN THE DATABASE */
  const updateInDb = async (tempQuant: number) => {
    const qty = Q1 + tempQuant; //tempQ
    const newPrice = qty * iPrice;
    const res = await fetch(`/api/cart?product_id=${pid}&user_id=${userId}`, {
      method: "PUT",
      body: JSON.stringify({
        quantity: qty,
        total_price: newPrice,
      }),
    });
    //dispatch(fetchCartItems(userId));
  };
  const AddToCart = () => {
    const index = CartItems.findIndex((item) => item.product_id === pid);

    //1.Item Exists in the Database
    if (index > -1) {
      //const tempQuant = CartItems[index];
      const tempItem = CartItems[index];
      //console.log("Value of quantity in the database", tempItem.item_quantity);
      toast.promise(updateInDb(tempItem.item_quantity), {
        loading: `Adding ${Q1} item(s) to the cart`,
        success: `Item(s) added successfully`,
        error: `Failed to add data`,
      });
      dispatch(
        cartActions.addToCart({
          pid: pid,
          itemQuantity: Q1,
          iName: productName,
          price: iPrice,
          pImage: image,
        })
      );
    } else {
      toast.promise(addToDb(), {
        loading: `Adding ${Q1} item(s) to the cart`,
        success: `Item(s) added successfully`,
        error: `Failed to add data`,
      });
      dispatch(
        cartActions.addToCart({
          pid: pid,
          itemQuantity: Q1,
          iName: productName,
          price: iPrice,
          pImage: image,
        })
      );
    }
  };

  //const index = CartItems.findIndex((item) => item.product_id === pid);
  // if (index > -1) {
  //   //Item already exists in the CartItems array
  //   // There are two possible scenarios : 1.Q1 === 1 2. Q1 > 1
  //   //1. Q1 === 1
  //   if (Q1 === 1) {
  //     const tempQuantity = CartItems[index].item_quantity;
  //     console.log(`TEMP QUANTITY---`, tempQuantity);
  //     toast.promise(incrementInDB(index, tempQuantity), {
  //       loading: `In progress`,
  //       success: `Item updated successfully`,
  //       error: `Could not add`,
  //     });
  //     // dispatch(cartActions.IncrementItem({ pid: pid, price: iPrice }));
  //     dispatch(
  //       cartActions.addToCart({
  //         pid: pid,
  //         itemQuantity: Q1,
  //         iName: productName,
  //         price: iPrice,
  //         pImage: image,
  //       })
  //     );
  //   }

  //   if (Q1 > 1) {
  //     const tempQuantity = CartItems[index].item_quantity;
  //     toast.promise(updateInDb(index, tempQuantity), {
  //       loading: `In progress`,
  //       success: `Item updated successfully`,
  //       error: `Could not add`,
  //     });
  //     dispatch(
  //       cartActions.addToCart({
  //         pid: pid,
  //         itemQuantity: Q1,
  //         iName: productName,
  //         price: iPrice,
  //         pImage: image,
  //       })
  //     );
  //   }
  //} //else {

  // };

  return (
    <>
      <div className="mb-8 flex items-center gap-x-10 lg:mb-10">
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
