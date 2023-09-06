"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { cartActions } from "../store/slice/cartSlice";
import { Toaster, toast } from "react-hot-toast";
import { fetchCartItems } from "../store/slice/cartSlice";

interface CartItemprop {
  productId: string;
  productQuantity: number;
  productName: string;
  pImage: string;
  iPrice: number;
  userId: string;
}
const CartDisplay1 = ({
  productId,
  userId,
  productQuantity,
  productName,
  pImage,
  iPrice,
}: CartItemprop) => {
  // const router = useRouter();
  // useEffect(() => {
  //   router.push("/Cart");
  // }, []);
  const value: number = productQuantity;
  const [quantity, setQuantity] = useState<number>(productQuantity);
  useEffect(() => {
    setQuantity(productQuantity);
  }, [productQuantity]);

  const dispatch = useDispatch<AppDispatch>();

  const localQtyUp = () => {
    setQuantity(quantity + 1);
  };
  const localQtyDown = () => {
    setQuantity(quantity - 1);
  };
  console.log(`QUANTITY IN THE STATE VARIABLE:${quantity}`);
  console.log(`DATA RECEIVED IN THIS CARTDISPLAY1`);
  console.log(`PRODUCTID: ${productId}`);
  console.log(`PRODUCT QUANTITY IN THE PROP:${productQuantity}`);
  console.log(`PRODUCT NAME:${productName}`);
  console.log(`PRODUCT IMAGE:${pImage}`);
  console.log(`PRODUCT PRICE : ${iPrice}`);

  const { totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cartSlice
  );
  console.log(`RECEIVED DATA:`, totalItems, totalPrice);

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
    dispatch(fetchCartItems(userId));
  };
  /**INCREASING ITEM QUANTITY IN THE DATABASE */
  const increaseItemQty = async () => {
    const qtyUp = quantity + 1;
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
    dispatch(fetchCartItems(userId));
  };

  /**DeCREASING ITEM QUANTITY IN THE DATABASE */
  const decreaseItemQty = async () => {
    const qtyDown = quantity - 1;
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
    dispatch(fetchCartItems(userId));
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
              {quantity === 1 ? (
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

              <p className="text-zinc-900 font-medium text-lg">{quantity}</p>
              <button onClick={handleOneUp}>
                <Image src="/plus.png" alt="plus icon" width={20} height={20} />
              </button>
            </div>
            <div>
              <h3 className="text-zinc-900 font-medium text-lg">
                ${(iPrice * quantity).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDisplay1;
