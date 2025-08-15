import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import { encryptDataWithRSA } from "@/lib/rsaService";
import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as GitHubIcon } from "@/assets/icons/icon_github.svg";
import { ReactComponent as GoogleIcon } from "@/assets/icons/icon_google.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, MessageCircle } from "lucide-react";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login, isFetching, error } = useAuth();
  const { goToHome, goToRegister } = useNavigation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};

    // Email 驗證
    if (!formData.email) {
      errors.email = t("login.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t("login.validation.emailInvalid");
    }

    // 密碼驗證
    if (!formData.password) {
      errors.password = t("login.validation.passwordRequired");
    } else if (formData.password.length < 6) {
      errors.password = t("login.validation.passwordMinLength");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 清除對應的驗證錯誤
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }


    try {
      // 加密登入憑證
      const encryptedCredentials = await Promise.all([
        encryptDataWithRSA(formData.email),
        encryptDataWithRSA(formData.password)
      ]);

      const result = await login({
        email: encryptedCredentials[0],
        password: encryptedCredentials[1]
      });

      if (result.success) {
        goToHome();
      }
    } catch (error) {
      console.error("登入失敗:", error);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="text-blue-400 hover:text-blue-300 mb-6"
          onClick={goToHome}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("common.backToHome")}
        </Button>

        <Card className="bg-slate-800/50 border-blue-400/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl   text-white">{t("login.title")}</CardTitle>
            <CardDescription>{t("login.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-200">
                  {t("login.form.email")}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("login.form.emailPlaceholder")}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
                    required
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-red-400 text-sm">{validationErrors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-200">
                  {t("login.form.password")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.form.passwordPlaceholder")}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {validationErrors.password && (
                  <p className="text-red-400 text-sm">{validationErrors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-blue-400/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="remember" className="text-blue-200 text-sm cursor-pointer">
                    {t("login.form.rememberMe")}
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="link"
                  className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                  onClick={() => {/* TODO: 實作忘記密碼功能 */}}
                >
                  {t("login.form.forgotPassword")}
                </Button>
              </div>

              {/* Error Messages */}
              {error && (
                <div className="rounded-md bg-red-900/50 border border-red-400/30 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-300">{t("login.error.loginFailed")}</h3>
                      <div className="mt-2 text-sm text-red-200">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Login Button */}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isFetching}>
                {isFetching ? t("login.button.loggingIn") : t("login.button.login")}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-800 px-2 text-blue-300">{t("login.divider.or")}</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="flex justify-center space-x-6">
                {/* Google */}
                <Button
                    type="button"
                    variant="ghost"
                    className="w-12 h-12 rounded-full border border-blue-400/30 hover:bg-slate-700/50 p-0"
                  >
                  <GoogleIcon />
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="text-blue-200">{t("login.signup.noAccount")}</span>
                <Button
                  type="button"
                  variant="link"
                  className="text-blue-400 hover:text-blue-300 p-0 ml-1"
                  onClick={goToRegister}
                >
                  {t("login.signup.registerNow")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-blue-300 text-sm">
            {t("login.terms.agreement")}
            <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 mx-1 h-auto">
              {t("login.terms.serviceTerms")}
            </Button>
            {t("login.terms.and")}
            <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 mx-1 h-auto">
              {t("login.terms.privacyPolicy")}
            </Button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-800/50 backdrop-blur-sm border-t border-blue-400/20 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-center space-x-6">
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
            <GitHubIcon className="w-4 h-4 mr-2" />
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300" asChild>
            <a href="/faq">{t("navigate.faqs")}</a>
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300" asChild>
            <a href="/about">{t("navigate.about")}</a>
          </Button>
        </div>
        <div className="text-center mt-2">
          <p className="text-blue-200 text-sm">{t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;

