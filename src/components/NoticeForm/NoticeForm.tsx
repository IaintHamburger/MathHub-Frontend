import type React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateForm } from "@/lib/formValidation";
import type { NoticeCreateRequest, NoticeUpdateRequest } from "@/types/noticeApi";

const NoticeForm = (props: {
  currentData: NoticeCreateRequest | NoticeUpdateRequest | null;
  setCurrentData: (data: NoticeCreateRequest | NoticeUpdateRequest | null) => void;
  onSubmitData: (data: NoticeCreateRequest | NoticeUpdateRequest) => void;
  onClearData: () => void;
}) => {
  const { currentData, setCurrentData } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const mode = currentData && "id" in currentData ? "edit" : "create";

  const onChangeData = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value =
      e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    const data = { ...currentData, [key]: value };

    setCurrentData(data as NoticeCreateRequest | NoticeUpdateRequest);
  };

  const onSubmit = (status: "public" | "draft") => {
    const postData = { ...(currentData as NoticeCreateRequest), status };

    const requiredFields = [
      { key: "title", label: t("noticePage.form.title") },
      { key: "content", label: t("noticePage.form.content") },
    ];

    if (!validateForm(postData, requiredFields, t, dispatch)) {
      return;
    }

    props.onSubmitData(postData);
  };

  return (
    <Card className="bg-slate-800 border-blue-400/20">
      <CardHeader>
        <CardTitle className="text-white text-left">
          {t(`slot.${mode}`, { label: t("common.notice") })}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label className="text-blue-200 mb-1 block">{t("noticePage.form.title")}</Label>
          <Input
            value={currentData?.title || ""}
            onChange={(e) => onChangeData("title", e)}
            placeholder={t("slot.input.placeholder", { label: t("noticePage.form.title") })}
            className="bg-slate-900/50 border-blue-400/30 text-white"
          />
        </div>

        <div>
          <Label className="text-blue-200 mb-1 block">{t("noticePage.form.content")}</Label>
          <textarea
            value={currentData?.content || ""}
            onChange={(e) => onChangeData("content", e)}
            rows={8}
            className="w-full rounded-md bg-slate-900/50 border-blue-400/30 text-white p-3 placeholder:text-slate-400"
            placeholder={t("slot.input.placeholder", { label: t("noticePage.form.content") })}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={currentData?.pin || false}
            onChange={(e) => onChangeData("pin", e)}
            className="rounded bg-slate-900/50 border-blue-400/30"
          />
          <Label className="text-blue-200">{t("noticePage.form.pin")}</Label>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => onSubmit("public")}>
            {t("noticePage.btn.publish")}
          </Button>
          <Button
            variant="outline"
            className="border-blue-400/30 text-blue-400 bg-transparent"
            onClick={() => onSubmit("draft")}
          >
            {t("noticePage.btn.draft")}
          </Button>
          <Button
            variant="outline"
            className="border-red-400/30 text-red-400 bg-transparent"
            onClick={props.onClearData}
          >
            {t("common.cancel")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoticeForm;
