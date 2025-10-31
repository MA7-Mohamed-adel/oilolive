import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cart: [],
  itme: null,
  total: 0,
};

export const calculateTotal = (cart) => {
  return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const index = state.cart.findIndex(
        (itme) => itme.id === action.payload.id
      );

      if (index >= 0) {
        const updatedProduct = state.cart[index];
        updatedProduct.qty += action.payload.qty || 1;
      
      } else {
        // لو المنتج جديد، نحفظ الكمية اللي المستخدم اختارها
        const newProduct = { ...action.payload, qty: action.payload.qty || 1 };
        state.cart.push(newProduct);

      }
    },
    Subtotal: (state) => {
      state.total = calculateTotal(state.cart);
    },
    delate: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      
    },
    onIncomaent: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.qty++;
        }
        return item;
      });
    },
    onDecsremat: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.qty > 1) {
          item.qty--;
        }
        return item;
      });

      state.total = calculateTotal(state.cart);
    },
    setCartitma: (state, action) => {
      state.itme = action.payload;
    },
    clearCart:(state) => {
      state.cart = [],
      state.total = 0,
      state.itme = null
    }
  },
});

export const selactCart = (state) => state.cart;
export const selactTotal = (state) => state.cart.total;
export default cartSlice.reducer;
export const {
  addTocart,
  delate,
  Subtotal,
  onIncomaent,
  onDecsremat,
  setCartitma,
  clearCart
} = cartSlice.actions;
