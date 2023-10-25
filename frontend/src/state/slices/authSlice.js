import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/products.json";

const initialState = {
  mode: "dark",
  registeredUsers: [],
  user: "",
  // token: "",
  products: products.products,
  cartItems: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload;
      // state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = "";
      // state.token = null;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setRegisteredUsers: (state, action) => {
      state.registeredUsers = [...state.registeredUsers, action.payload];
    },
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    deleteCartItem: (state, action) => {
      state.cartItems.splice(action.payload, 1);
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setRegisteredUsers,
  addToCart,
  deleteCartItem,
} = authSlice.actions;
export default authSlice;
