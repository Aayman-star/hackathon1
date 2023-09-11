import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
const TotalPrice = () => {
  const { totalPrice } = useSelector((state: RootState) => state.cartSlice);
  const [localTotal, setLocalTotal] = useState(totalPrice);
  useEffect(() => {
    setLocalTotal(totalPrice);
  }, [totalPrice]);
  return (
    <>
      {isNaN(localTotal) ? (
        <p className="font-bold text-zinc-700 text-xl lg:text-2xl"> ...</p>
      ) : (
        <p className="font-bold text-zinc-700 text-xl lg:text-2xl">
          {" "}
          SUBTOTAL : ${localTotal.toFixed(2)}
        </p>
      )}
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
