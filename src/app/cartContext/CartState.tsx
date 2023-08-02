// "use client";
// import CartContext from "./cartContext";
// import { useState, ReactNode, useReducer } from "react";
// import { POST } from "../api/cart/route";

// interface cartStateProps {
//   children: ReactNode;
// }

// const CartState = ({ children }: cartStateProps) => {
//   // const [Quantity, setQuantity] = useState(1);

//   // const [Quantity, setQuantity] = useState(1);

//   // const IncreaseQuantity = () => {
//   //   setQuantity(Quantity + 1);
//   // };

//   // const DecreaseQuantity = () => {
//   //   setQuantity(Quantity - 1);
//   // };

//   const addToCart = async (_id: string) => {
//     const res = await fetch("/api/cart", {
//       method: "POST",
//       body: JSON.stringify({
//         product_id: _id,
//         quantity: Quantity,
//       }),
//     });
//     const result = await res.json();
//     console.log(`Here is the data: `);
//     console.log(result);
//   };
//   interface cartItemProps {
//     id: string;
//     Quantity: number;
//   }
//   const initCartItem: cartItemProps = {
//     id: "",
//     Quantity: 1,
//   };

//   type Action =
//     | { type: "INCREMENT" }
//     | { type: "DECREMENT" }
//     | { type: "ADD_ITEM"; payload?: string };

//   const reducer = (state: typeof initCartItem, action: Action) => {
//     switch (action.type) {
//       case "INCREMENT": {
//         return {
//           ...state,
//           Quantity: state.Quantity + 1,
//         };
//       }
//       case "DECREMENT": {
//         return {
//           ...state,
//           Quantity: state.Quantity - 1,
//         };
//       }
//       case "ADD_ITEM": {
//         return {
//          ...state,
//          id:action.payload,
//         };
//         addToCart()
//       }
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         Quantity,
//         IncreaseQuantity,
//         DecreaseQuantity,
//         addToCart,
//       }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartState;
