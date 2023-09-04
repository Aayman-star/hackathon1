"use client";
import React, { useState, useEffect } from "react";
import { client } from "@/lib1/sanityClient";
import Image from "next/image";
import Link from "next/link";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { cartActions } from "../store/slice/cartSlice";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
//import { fetchCartItems } from "../store/slice/cartSlice";
//import Quantity from "../ProductDetails/displayQuantity";

interface CartProps {
  productId: string;
  productQuantity: number;
  productName: string;
  pImage: string;
  iPrice: number;
  userId: string;
}

const CartDisplay = ({
  productId,
  productQuantity,
  productName,
  pImage,
  iPrice,
  userId,
}: CartProps) => {
  // const router = useRouter();
  // console.log(`THIS IS ROUTER VALUE:`, router);
  // const href = "/Cart";
  // useEffect(() => {
  //   router.push(href);
  // }, []);
  const QStore = productQuantity;

  // const [Qty, setQty] = useState(productQuantity);
  // console.log(`Qty:${Qty}`);
  const [localQty, setLocalQty] = useState(productQuantity);

  console.log(`LocalQty:${localQty}`);

  const localQtyUp = () => {
    setLocalQty(localQty + 1);
  };
  const localQtyDown = () => {
    setLocalQty(localQty - 1);
  };

  const dispatch = useDispatch<AppDispatch>();

  const { totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cartSlice
  );

  console.log(`IMAGE IN THE CART DISPLAY : `, pImage);
  console.log(`PRODUCT ID :`, productId);
  console.log(`USER ID : `, userId);
  console.log(`PRODUCT NAME :`, productName);
  console.log(`PRODUCT QUANTITY: `, productQuantity);
  console.log(`TOTAL ITEMS : ${totalItems},TOTAL PRICE : ${totalPrice} `);

  /**FETCH EXISTING DATA FROM THE DATABASE */

  console.log(`RECEIVED USER ID IN THE CARTDISPLAY FILE :${userId}`);
  /**DELETING FROM DATABASE */
  const deleteFromDb = async () => {
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
    const qtyUp = localQty + 1;
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

  /**DeCREASING ITEM QUANTITY IN THE DATABASE */
  const decreaseItemQty = async () => {
    const qtyDown = localQty - 1;
    console.log(`qtyDown : ${qtyDown}`);
    const newPrice = qtyDown * iPrice;

    const res = await fetch(
      `/api/cart?product_id=${productId}&user_id=${userId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          quantity: qtyDown,
          total_price: newPrice,
        }),
      }
    );
  };

  const handleDelete = () => {
    toast.promise(deleteFromDb(), {
      loading: `Deleting product from the cart`,
      success: `Item deleted successfully`,
      error: `Could not delete item from the cart`,
    });
    dispatch(cartActions.removeFromCart({ pid: productId }));
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
        pid: productId,
        price: iPrice,
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
        pid: productId,
        price: iPrice,
      })
    );
  };
  return (
    <>
      <div className="max-w-7xl mx-auto p-2 border-2 border-t-black">
        <div className="flex justify-center items-center gap-x-2 md:justify-between">
          {/* Image */}
          <div className="w-1/4 flex items-center gap-x-4">
            <Image
              className="hover:scale-105 duration-300"
              src={pImage}
              alt="product"
              width={150}
              height={100}
            />
            <div>
              <h2 className="text-xl text-zinc-900 font-medium">
                {productName}
              </h2>
              <button onClick={handleDelete}>
                <Image
                  src="/trash.png"
                  alt="delete icon"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
          {/* Other Product Data */}
          <div className="w-3/4 flex flex-col gap-y-5 md:flex-row grow justify-around">
            <div>
              <h3 className="text-zinc-900 font-medium text-lg">
                ${iPrice.toFixed(2)}
              </h3>
            </div>
            <div className="flex items-center gap-x-4 ">
              {localQty === 1 ? (
                <button onClick={handleDelete}>
                  <Image
                    src="/trash.png"
                    alt="delete icon"
                    width={20}
                    height={20}
                  />
                </button>
              ) : (
                <button onClick={handleOneDown}>
                  <Image
                    src="/minus.png"
                    alt="minus icon"
                    width={20}
                    height={20}
                  />
                </button>
              )}

              <p className="text-zinc-900 font-medium text-lg">{localQty}</p>
              <button onClick={handleOneUp}>
                <Image src="/plus.png" alt="plus icon" width={20} height={20} />
              </button>
            </div>
            <div>
              <h3 className="text-zinc-900 font-medium text-lg">
                ${(iPrice * localQty).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDisplay;

/**Old CODE WHICH IS FUNCTIONAL */
// interface ProductData {
//   title: string;
//   price: number;
//   _id: string;
//   image: IImage;
//   category: { name: string };
//   producttype: { name: string };
// }
// const query = `*[_type == 'product' && _id == $pid]{title,price,image,category->{name}, producttype ->{ name }}`;
// const cartItem: ProductData[] = await client.fetch(query, { pid: productId });
// console.log("Here is the data", typeof cartItem);
// console.log(cartItem);
