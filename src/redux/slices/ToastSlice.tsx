import { createSlice } from "@reduxjs/toolkit";

import { getUUID } from "@/lib/utils";

interface Toast {
  id: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

interface ToastState {
  toasts: Toast[];
}

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    toasts: [],
  } as ToastState,

  reducers: {
    AddToast(state, action: { payload: Omit<Toast, "id"> }) {
      state.toasts = [...state.toasts, { ...action.payload, id: getUUID() }];
    },

    RemoveToast(state, _action) {
      state.toasts = state.toasts.slice(0, state.toasts.length - 1);
    },
  },
});

export const { AddToast, RemoveToast } = toastSlice.actions;

export default toastSlice.reducer;
