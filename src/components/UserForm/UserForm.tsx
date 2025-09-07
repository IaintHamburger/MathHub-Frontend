import dayjs from "dayjs";
import type React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateForm } from "@/lib/formValidation";
import type { UserCreateRequest, UserUpdateRequest } from "@/types/userApi";

const UserForm = (props: {
  currentData: UserCreateRequest | UserUpdateRequest | null;
  setCurrentData: (data: UserCreateRequest | UserUpdateRequest | null) => void;
  onSubmitData: (data: UserCreateRequest | UserUpdateRequest) => void;
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

    setCurrentData(data as UserCreateRequest | UserUpdateRequest);
  };

  const onSubmit = () => {
    const postData = { ...(currentData as UserCreateRequest) };

    const requiredFields = [
      { key: "name", label: t("userPage.table.name") },
      { key: "email", label: t("userPage.table.email") },
      { key: "role", label: t("userPage.form.role") },
      { key: "birthday", label: t("userPage.form.birthday") },
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
          {t(`slot.${mode}`, { label: t("common.user") })}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label className="text-blue-200 mb-1 block">{t("userPage.table.name")}</Label>
          <Input
            value={currentData?.name || ""}
            onChange={(e) => onChangeData("name", e)}
            placeholder={t("slot.input.placeholder", { label: t("userPage.table.name") })}
            className="bg-slate-900/50 border-blue-400/30 text-white"
          />
        </div>

        <div>
          <Label className="text-blue-200 mb-1 block">{t("userPage.table.email")}</Label>
          <Input
            value={currentData?.email || ""}
            onChange={(e) => onChangeData("email", e)}
            placeholder={t("slot.input.placeholder", { label: t("userPage.table.email") })}
            className="bg-slate-900/50 border-blue-400/30 text-white"
          />
        </div>

        <div>
          <span className="text-sm font-medium text-blue-200 block mb-1">
            {t("userPage.form.role")}
          </span>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
              {t("role.admin")}
            </Button>
            <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
              {t("role.general")}
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-blue-200 mb-1 block">{t("userPage.form.birthday")}</Label>
          <Input
            value={dayjs(currentData?.birthday).format("YYYY-MM-DD") || ""}
            type="date"
            onChange={(e) => onChangeData("birthday", e)}
            placeholder={t("slot.input.placeholder", { label: t("userPage.form.birthday") })}
            max={new Date().toISOString().split("T")[0]}
            className="bg-slate-900/50 border-blue-400/30 text-white"
          />
        </div>

        <div>
          <Label className="text-blue-200 mb-1 block">{t("userPage.form.grade")}</Label>
          <Input
            value={currentData?.grade || ""}
            onChange={(e) => onChangeData("grade", e)}
            placeholder={t("slot.input.placeholder", { label: t("userPage.form.grade") })}
            className="bg-slate-900/50 border-blue-400/30 text-white"
          />
        </div>

        <div className="flex space-x-2 pt-4">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={onSubmit}>
            {t("userPage.btn.addUser")}
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

export default UserForm;
