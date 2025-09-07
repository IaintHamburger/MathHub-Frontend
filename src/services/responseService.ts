import i18n from "@/language/i18n";
import { AddToast } from "@/redux/slices/ToastSlice";
import { store } from "@/redux/store/app";
import type { BaseItem } from "@/types/baseApi";

import mockData from "./mockData.json";

const dispatch = store.dispatch;

export const apiResponse = (response: BaseItem, callbackStr = "", hiddenToast = false) => {
  if (response.success !== true) {
    if (!hiddenToast) {
      dispatch(
        AddToast({
          message: i18n.t(response.message),
          type: "error",
        }),
      );

      return new ApiResponseModel(response);
    }
  }

  if (callbackStr) {
    dispatch(
      AddToast({
        message: callbackStr,
      }),
    );
  }

  return response || new ApiResponseModel(response);
};

export const mockApiResponse = (key: string) => {
  const data = mockData[key as keyof typeof mockData];
  const totalNum = data.length;
  return {
    success: true,
    message: "success",
    data: data,
    totalNum: totalNum,
  };
};

export class ApiResponseModel {
  data: any;
  success: boolean;
  message: string;
  error: string;
  totalNum: number;

  constructor(response: BaseItem) {
    this.data = response?.data || [];
    this.success = response?.success || false;
    this.message = response?.message || "";
    this.error = response?.error || "";
    this.totalNum = response?.totalNum || 0;
  }
}
