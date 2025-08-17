import i18n from "@/language/i18n";
import { buildQueryString } from "@/lib/apiUtils";
import type { BaseItem } from "@/types/baseApi";
import type {
  NoticeCreateRequest,
  NoticeListResponse,
  NoticeUpdateRequest,
} from "@/types/noticeApi";
import { apiRequest } from "./authService";
import { apiResponse } from "./responseService";

export const noticeAPI = {
  // 取得公告列表
  getNoticeByPagination: async (postData: object) => {
    const queryParams = buildQueryString(postData);

    const response: BaseItem<NoticeListResponse> = await apiRequest<BaseItem<NoticeListResponse>>(
      `/admin/noticeBoards${queryParams ? `?${queryParams}` : ""}`,
      {
        method: "GET",
      },
    );

    return apiResponse(response);
  },

  // 新增公告
  createNotice: async (postData: NoticeCreateRequest) => {
    const response: BaseItem<NoticeCreateRequest> = await apiRequest<BaseItem<NoticeCreateRequest>>(
      `/admin/noticeBoards`,
      {
        method: "POST",
        body: JSON.stringify(postData),
      },
    );

    return apiResponse(response, i18n.t("slot.create", { label: i18n.t("common.notice") }));
  },

  // 更新公告
  updateNotice: async (postData: NoticeUpdateRequest) => {
    const { id, ...rest } = postData;

    const response: BaseItem<NoticeUpdateRequest> = await apiRequest<BaseItem<NoticeUpdateRequest>>(
      `/admin/noticeBoards/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(rest),
      },
    );

    return apiResponse(response, i18n.t("slot.edit", { label: i18n.t("common.notice") }));
  },

  // 刪除公告
  deleteNotice: async (postData: { id: string }) => {
    const response: BaseItem<{ id: string }> = await apiRequest<BaseItem<{ id: string }>>(
      `/admin/noticeBoards/${postData.id}`,
      {
        method: "DELETE",
      },
    );

    return apiResponse(response, i18n.t("slot.delete", { label: i18n.t("common.notice") }));
  },
};
