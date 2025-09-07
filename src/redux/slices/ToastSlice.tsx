import { createSlice } from "@reduxjs/toolkit";

import { getUUID } from "@/lib/utils";

interface Toast {
  id: string;
  message: string;
  type?: "success" | "error";
}

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    currentToast: null as Toast | null,
  },

  reducers: {
    AddToast(state, action: { payload: Omit<Toast, "id"> }) {
      state.currentToast = { ...action.payload, id: getUUID() };
    },

    RemoveToast(state, _action) {
      state.currentToast = null;
    },
  },
});

export const { AddToast, RemoveToast } = toastSlice.actions;

export default toastSlice.reducer;
