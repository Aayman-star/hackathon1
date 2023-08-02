import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartState {
    product_id:string;
    item_quantity: number;
    totalItems:number;
}


const initialState: CartState = {
  product_id:'',
  item_quantity : 1,
  totalItems:0
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.item_quantity += 1
    },
    decrement: (state) => {
      state.item_quantity -= 1
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
    addToCart : (state,action : PayloadAction<any>) =>{
      state.product_id = action.payload.productId
    //   state.item_quantity = action.payload.itemQuantity
      state.totalItems += state.item_quantity
      
    console.log(state.product_id,state.item_quantity)
    console.log(action)
       
    }
  },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const cartActions = cartSlice.actions

export default cartSlice.reducer