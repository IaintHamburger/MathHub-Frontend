import { AddToast } from "@/redux/slices/ToastSlice";

// 簡單的驗證函數
export const validateForm = (
  data: Record<string, any>,
  requiredFields: { key: string; label: string }[],
  t: (key: string, options?: any) => string,
  dispatch: any,
) => {
  for (const field of requiredFields) {
    if (
      !data[field.key] ||
      (typeof data[field.key] === "string" && data[field.key].trim() === "")
    ) {
      const errorMessage = t("slot.input.placeholder", { label: field.label });
      dispatch(
        AddToast({
          type: "error",
          message: errorMessage,
        }),
      );
      return false;
    }

    if (
      field.key?.toLowerCase().includes("email") &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data[field.key])
    ) {
      const errorMessage = t("slot.input.invalidEmail");
      dispatch(
        AddToast({
          type: "error",
          message: errorMessage,
        }),
      );
      return false;
    }
  }
  return true;
};
