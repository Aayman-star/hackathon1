import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
 import { POST } from '@/app/api/cart/route';
 import { Image as IImage } from 'sanity';
 import { urlForImage } from '../../../../sanity/lib/image';



  
 

export interface Product{
  
  product_id:string;
  product_name:string;
  item_quantity: number;
  price:number;
  totalItemPrice:number;
  pImage:string;

}


export interface Cart {
    CartItems : Array<Product>;
    totalItems:number;
    totalPrice:number;
    
 }


const initialState : Cart = {
  CartItems : [],
  totalItems:0,
  totalPrice:0,
}
  
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems',
  async  (userId : string) =>{
    try{
      const result = await fetch(`/api/cart?user_id=${userId}`);
      if(!result.ok){
       throw new Error(`Had trouble fetching data`)
      }
      else{
        const Result = result.json();
        return Result;
      }
    }
    catch(error){
      console.log(`ERROR :`,error)
    }
    

  }
)

 
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart : (state,action : PayloadAction< {pid:string,itemQuantity:number,iName:string,pImage:string,price:number} >)=>{
      state.totalItems = state.totalItems + action.payload.itemQuantity
      state.totalPrice = state.totalPrice + action.payload.price * action.payload.itemQuantity
      const index =  state.CartItems.findIndex((item)=> item.product_id === action.payload.pid)
      
      if(index > -1 ){
        /**THIS IS WHERE WE DEAL WITH THE EXISITNG ITEM */
       
       console.log(`index : ${index}`)
       const tempQuantity = state.CartItems[index].item_quantity +action.payload.itemQuantity
       const tempTotalPrice = state.CartItems[index].totalItemPrice + action.payload.itemQuantity * action.payload.price
       state.CartItems[index].item_quantity = tempQuantity
       state.CartItems[index].totalItemPrice = tempTotalPrice
       /** */
      }
      else{
        state.CartItems = [
          ...state.CartItems,
          {
            product_id : action.payload.pid,
            item_quantity:action.payload.itemQuantity,
            product_name:action.payload.iName,
            price:action.payload.price,
            totalItemPrice: action.payload.itemQuantity * action.payload.price,
            pImage:action.payload.pImage,
            
          }
        ]
        console.log(`Here are the CART ITEMS`)
        console.log(state.CartItems)
      }
      
    },
    removeFromCart:(state, action: PayloadAction<{pid:string}>)=>{
      state.CartItems = state.CartItems.filter((item) => item.product_id !== action.payload.pid)
      /**updating the total quantity of items from the new CartItems */
      state.totalItems = state.CartItems.reduce((total,item) => total + item.item_quantity,0)
      /**updating the total price/amount of items from the new CartItems array */
      state.totalPrice = state.CartItems.reduce((total,item) => total + item.totalItemPrice,0)

    },
    IncrementItem:(state,action:PayloadAction<{ pid: string , price:number }>)=>{
      const index =  state.CartItems.findIndex((item)=> item.product_id === action.payload.pid)
      state.CartItems[index].item_quantity += 1;
      state.CartItems[index].totalItemPrice += action.payload.price
       /**updating the total quantity of items from the new CartItems */
       state.totalItems = state.CartItems.reduce((total,item) => total + item.item_quantity,0)
       /**updating the total price/amount of items from the new CartItems array */
       state.totalPrice = state.CartItems.reduce((total,item) => total + item.totalItemPrice,0)

    },
    DecrementItem:(state,action:PayloadAction<{ pid: string , price:number }>)=>{
      const index =  state.CartItems.findIndex((item)=> item.product_id === action.payload.pid)
      state.CartItems[index].item_quantity -= 1;
      state.CartItems[index].totalItemPrice -= action.payload.price
       /**updating the total quantity of items from the new CartItems */
       state.totalItems = state.CartItems.reduce((total,item) => total + item.item_quantity,0)
       /**updating the total price/amount of items from the new CartItems array */
       state.totalPrice = state.CartItems.reduce((total,item) => total + item.totalItemPrice,0)

    }

},
extraReducers:(builder)=>{
  builder.addCase(fetchCartItems.fulfilled,(state,action:PayloadAction<any>)=>{
    state.CartItems = action.payload.cartItems
    
  
    state.totalItems = action.payload.totalQuantity;
    state.totalPrice = action.payload.totalPrice;
    console.log(`From the async reducer :`,state.CartItems,state.totalItems,state.totalPrice)
    console.log(`TRYING TO FIND THE DATATYPE OF IMAGES:`,state.CartItems.map((item)=> typeof item.pImage))
  })
  
}
    
})
 

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const cartActions = cartSlice.actions

export default cartSlice.reducer


//  extraReducers:(builder) => {
//   builder.addCase( addToCart.fulfilled,(state, action:PayloadAction<any> )=>{
//     console.log(`Here is some data:`)
//     console.log(action.payload.quantity,action.payload.product_id)
//     state.totalItems = state.totalItems + action.payload.quantity;
//     state.CartItems = [
//       ...state.CartItems,
//       {
//         product_id: action.payload.product_id,
//         item_quantity:action.payload.quantity
//       }
//     ]
//   },
// )}
// const itemExists = state.CartItems.find((item) => item.product_id === action.payload.pid)
      // console.log(`Existing Item :`)
      // console.log(itemExists)

  //     export const addToCart = createAsyncThunk(
  // 'addtoCart',
  // async  (data:CartData,{ rejectWithValue }) =>{
  //   const res = await fetch('/api/cart',{
  //     method : 'POST',
  //     headers:{
  //       'Content-Type':'application/json',
  //     },
  //     body : JSON.stringify({
  //       product_id : data.pid,
  //       quantity:data.itemQuantity,
  //     })
      
      
//     })
//     try{
//       const result = await res.json();
//       console.log(`Here is the stored data :`)
//       console.log(result)
      

//      console.log(`Here is some more:`)
//       console.log(result.res[0])
//       return result.res[0]
//     }
//     catch{
//         return rejectWithValue
//     }
         
//   }

// )
 
  // isLoading:false,
  // error:null

// interface CartData{
//   pid:string;
//   itemQuantity:number;
// }
// interface Data{
//   product_id:string;
//   user_id:string;
//   quantity:number;
//   id:number;
// }
// const data : Data[] =[];