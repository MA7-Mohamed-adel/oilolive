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
        // لو المنتج موجود، نزود الكمية بمقدار اللي المستخدم اختاره
        const updatedProduct = state.cart[index];
        updatedProduct.qty += action.payload.qty || 1;
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `تم تحديث الكمية لـ ${updatedProduct.name}`,
          html: `
            <div style="display: flex; align-items: center; text-align: left; direction: ltr;">
              <img src="${updatedProduct.images[0]}" alt="${updatedProduct.name}" style="width: 60px; height: 60px; margin-right: 15px; border-radius: 8px; object-fit: cover;" />
              <div>
                <div><strong>Price:</strong> ${updatedProduct.price.toFixed(2)} EGP</div>
                <div><strong>New Quantity:</strong> ${updatedProduct.qty}</div>
              </div>
            </div>
            <div style="margin-top: 15px; display: flex; justify-content: space-around; width: 100%;">
              <a href="/cart" style="background-color: #f0f0f0; color: #333; border: none; padding: 8px 16px; border-radius: 5px; text-decoration: none; font-size: 14px; cursor: pointer;">
                عرض السلة
              </a>
              <a href="/checkout" style="background-color: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; text-decoration: none; font-size: 14px; cursor: pointer;">
                الدفع
              </a>
            </div>
          `,
          showConfirmButton: false,
          timer: 3500,
          timerProgressBar: true,
        });
      } else {
        // لو المنتج جديد، نحفظ الكمية اللي المستخدم اختارها
        const newProduct = { ...action.payload, qty: action.payload.qty || 1 };
        state.cart.push(newProduct);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `تمت إضافة ${newProduct.name} إلى السلة`,
          html: `
            <div style="display: flex; align-items: center; text-align: left; direction: ltr;">
              <img src="${newProduct.images[0]}" alt="${newProduct.name}" style="width: 60px; height: 60px; margin-right: 15px; border-radius: 8px; object-fit: cover;" />
              <div>
                <div><strong>Price:</strong> ${newProduct.price.toFixed(2)} EGP</div>
                <div><strong>Quantity:</strong> ${newProduct.qty}</div>
              </div>
            </div>
            <div style="margin-top: 15px; display: flex; justify-content: space-around; width: 100%;">
              <a href="/cart" style="background-color: #f0f0f0; color: #333; border: none; padding: 8px 16px; border-radius: 5px; text-decoration: none; font-size: 14px; cursor: pointer;">
                عرض السلة
              </a>
              <a href="/checkout" style="background-color: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; text-decoration: none; font-size: 14px; cursor: pointer;">
                الدفع
              </a>
            </div>
          `,
          showConfirmButton: false,
          timer: 3500,
          timerProgressBar: true,
        });
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
