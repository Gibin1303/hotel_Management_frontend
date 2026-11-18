// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../fetures/auth/authSlice.js";
// import bookingReducer from "../fetures/booking/bookingSlice.js";
// import storage from "redux-persist/lib/storage";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER
// } from 'redux-persist';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,

//     booking: bookingReducer,
//   },
// });

import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "../fetures/auth/authSlice.js";
import bookingReducer from "../fetures/booking/bookingSlice.js";
// import hotelReducer from "../fetures/HotelsDetail/hotelslice.js";
import hotelReducer from "@/fetures/HotelsDetail/hotelslice.js";

import storageModule from "redux-persist/lib/storage";

const storage = storageModule.default;

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["booking"], // only save auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
  hotel: hotelReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
