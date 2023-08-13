import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import { POST } from '@/app/api/cart/route';

export interface Cart {
    CartItems : Array<any>;
    product_id:string;
    item_quantity: number;
    totalItems:number;
    
    }


const initialState : Cart = {
  CartItems : [],
  product_id:'',
  item_quantity :1,
  totalItems:0
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
    state.item_quantity += 1
    },
    decrement: (state) => {
      state.item_quantity -=1
     },
    addToCart : (state,action : PayloadAction<{ pid : string, itemQuantity:number  }>) =>{
      state.totalItems += action.payload.itemQuantity
      state.CartItems = [
          ...state.CartItems,
         {
          product_id:action.payload.pid,
          item_quantity:action.payload.itemQuantity,
          
         }

      ]
      console.log(state.CartItems)
  },
  }
})
// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const cartActions = cartSlice.actions

export default cartSlice.reducer