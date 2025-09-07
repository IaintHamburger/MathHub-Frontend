import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 使用 LocalStorage

import authSlice from "../slices/AuthSlice.js";
import toastSlice from "../slices/ToastSlice.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [], // 暫時不持久化任何 slice，避免干擾
  blacklist: ["authSlice"], // 明確排除 authSlice
};

const rootReducer = combineReducers({
  authSlice,
  toastSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { persistor, store };
