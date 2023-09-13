import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CheckOutBtn from "./CheckOutBtn";
const TotalPrice = () => {
  const { totalPrice } = useSelector((state: RootState) => state.cartSlice);
  const [localTotal, setLocalTotal] = useState(totalPrice);
  useEffect(() => {
    setLocalTotal(totalPrice);
  }, [totalPrice]);
  return (
    <>
      <div className="flex flex-col gap-y-2">
        {isNaN(localTotal) ? (
          <p className="font-bold text-zinc-700 text-xl lg:text-2xl"> ...</p>
        ) : (
          <p className="font-bold text-zinc-700 text-xl lg:text-2xl">
            {" "}
            SUBTOTAL : ${localTotal.toFixed(2)}
          </p>
        )}
        <div className="self-end">
          {" "}
          <CheckOutBtn />
        </div>
      </div>
    </>
  );
};

export default TotalPrice;

{
  /* {CartItems.length ? (
          <div className="p-4 w-full mx-auto lg:max-w-7xl lg:mx-auto grid place-content-end">
          
          </div>
        ) : (
          ""
        )} */
}
// {!isNaN(totalPrice) && (

//   )}
