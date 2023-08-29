import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
//import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    cartSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
