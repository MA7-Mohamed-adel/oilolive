import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiServices } from "../services/Apisl/SpiltApi";
import  authSlice  from "../futers/auth/authSlice";
import cartSlice  from "../futers/cartSlice";

const rootReducer = combineReducers({
  auth:authSlice,
  cart:cartSlice,
  [apiServices.reducerPath]: apiServices.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth","cart"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ ضروري مع redux-persist
    }).concat(apiServices.middleware),
});

export const persistor = persistStore(store);
