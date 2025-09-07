import i18n from "@/language/i18n";
import { buildQueryString } from "@/lib/apiUtils";
import type { BaseItem } from "@/types/baseApi";
import type { UserCreateRequest, UserListResponse, UserUpdateRequest } from "@/types/userApi";
import { apiRequest } from "./authService";
import { apiResponse, mockApiResponse } from "./responseService";

export const userAPI = {
  // 取得公告列表
  getUserByPagination: async (postData: object) => {
    return mockApiResponse("user");

    const queryParams = buildQueryString(postData);

    const response: BaseItem<UserListResponse> = await apiRequest<BaseItem<UserListResponse>>(
      `/admin/users${queryParams ? `?${queryParams}` : ""}`,
      {
        method: "GET",
      },
    );

    return apiResponse(response);
  },

  // 新增用戶
  createUser: async (postData: UserCreateRequest) => {
    const response: BaseItem<UserCreateRequest> = await apiRequest<BaseItem<UserCreateRequest>>(
      `/admin/users`,
      {
        method: "POST",
        body: JSON.stringify(postData),
      },
    );

    return apiResponse(response, i18n.t("slot.create.success", { label: i18n.t("common.user") }));
  },

  // 更新用戶
  updateUser: async (postData: UserUpdateRequest) => {
    const { id, ...rest } = postData;

    const response: BaseItem<UserUpdateRequest> = await apiRequest<BaseItem<UserUpdateRequest>>(
      `/admin/users/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(rest),
      },
    );

    return apiResponse(response, i18n.t("slot.edit", { label: i18n.t("common.user") }));
  },

  // 刪除用戶
  deleteUser: async (postData: { id: string }) => {
    const response: BaseItem<{ id: string }> = await apiRequest<BaseItem<{ id: string }>>(
      `/admin/users/${postData.id}`,
      {
        method: "DELETE",
      },
    );

    return apiResponse(response, i18n.t("slot.delete", { label: i18n.t("common.user") }));
  },
};
