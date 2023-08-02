import React, { createContext } from "react";

// interface cartContextProps{

//     Quantity : number;
//     IncreaseQuantity : () => void;
//     DecreaseQuantity : () => void;
   
//     addToCart : (_id : string) => void;
//     // removeFromCart : (id:string) =>void;
// }

// const cartItem : cartContextProps = {
//     Quantity : 1,
//     IncreaseQuantity : () => {},
//     DecreaseQuantity : () =>{},
  
//     addToCart : (_id) =>{},
//     // removeFromCart : (id) =>{}

// }

interface cartItemProps{
id:string;
Quantity:number;
}

const cartItem : cartItemProps = {
    id: '',
    Quantity:1,
}

const CartContext = createContext<cartItemProps>(cartItem);

export default CartContext