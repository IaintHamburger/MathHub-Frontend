import type React from "react"

import { ReactComponent as MathCatLogo } from "@/assets/logo/MathCat_Full.svg"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SocialIcon from "@/components/ui/social-icon"
import { useNavigation } from "@/hooks/useNavigation"
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { useState } from "react"

export default function RegisterPage() {
  const { goToHome, goToLogin } = useNavigation();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    grade: "",
    agreeTerms: false,
    subscribeNewsletter: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showTermsDialog, setShowTermsDialog] = useState(false)
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false)

  const gradeOptions = [
    { value: "elementary-1", label: "國小一年級" },
    { value: "elementary-2", label: "國小二年級" },
    { value: "elementary-3", label: "國小三年級" },
    { value: "elementary-4", label: "國小四年級" },
    { value: "elementary-5", label: "國小五年級" },
    { value: "elementary-6", label: "國小六年級" },
    { value: "junior-1", label: "國中一年級" },
    { value: "junior-2", label: "國中二年級" },
    { value: "junior-3", label: "國中三年級" },
    { value: "senior-1", label: "高中一年級" },
    { value: "senior-2", label: "高中二年級" },
    { value: "senior-3", label: "高中三年級" },
    { value: "university", label: "大學" },
    { value: "other", label: "其他" },
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = "請輸入用戶名稱"
    } else if (formData.username.length < 2) {
      newErrors.username = "用戶名稱至少需要2個字符"
    }

    if (!formData.email.trim()) {
      newErrors.email = "請輸入電子郵件"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "請輸入有效的電子郵件格式"
    }

    if (!formData.password) {
      newErrors.password = "請輸入密碼"
    } else if (formData.password.length < 6) {
      newErrors.password = "密碼至少需要6個字符"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "請確認密碼"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "密碼確認不一致"
    }

    if (!formData.grade) {
      newErrors.grade = "請選擇您的年級"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "請同意服務條款和隱私政策"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // 模擬註冊過程
    setTimeout(() => {
      setIsLoading(false)
      // 這裡可以添加實際的註冊邏輯
      console.log("註冊資訊:", formData)
      // 註冊成功後跳轉到登入頁面
      goToLogin()
    }, 2000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // 清除該欄位的錯誤訊息
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowTermsDialog(true)
  }

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPrivacyDialog(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="text-blue-400 hover:text-blue-300 mb-6"
          onClick={goToHome}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回首頁
        </Button>

        <Card className="bg-slate-800/50 border-blue-400/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <MathCatLogo />
            </div>
            <CardTitle className="text-2xl   text-white">加入 MathHub</CardTitle>
            <CardDescription className="text-blue-200">創建您的帳戶，開始個人化的數學學習體驗</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-blue-200">
                  用戶名稱 *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="請輸入用戶名稱"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className={`pl-10 bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20 ${
                      errors.username ? "border-red-400" : ""
                    }`}
                  />
                </div>
                {errors.username && <p className="text-red-400 text-sm">{errors.username}</p>}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-200">
                  電子郵件 *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="請輸入您的電子郵件"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20 ${
                      errors.email ? "border-red-400" : ""
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>

              {/* Grade Selection */}
              <div className="space-y-2">
                <Label htmlFor="grade" className="text-blue-200">
                  年級 *
                </Label>
                <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                  <SelectTrigger
                    className={`bg-slate-700/50 border-blue-400/30 text-white ${errors.grade ? "border-red-400" : ""}`}
                  >
                    <SelectValue placeholder="請選擇您的年級" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-400/30">
                    {gradeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.grade && <p className="text-red-400 text-sm">{errors.grade}</p>}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-200">
                  密碼 *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="請輸入密碼（至少6個字符）"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-10 bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20 ${
                      errors.password ? "border-red-400" : ""
                    }`}
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
                {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-blue-200">
                  確認密碼 *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="請再次輸入密碼"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`pl-10 pr-10 bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20 ${
                      errors.confirmPassword ? "border-red-400" : ""
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
              </div>

              {/* Terms Agreement */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                    className={`border-blue-400/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mt-1 ${
                      errors.agreeTerms ? "border-red-400" : ""
                    }`}
                  />
                  <Label htmlFor="agreeTerms" className="text-blue-200 text-sm cursor-pointer leading-relaxed">
                    我同意
                    <button
                      type="button"
                      onClick={handleTermsClick}
                      className="text-blue-400 hover:text-blue-300 underline mx-1"
                    >
                      服務條款
                    </button>
                    和
                    <button
                      type="button"
                      onClick={handlePrivacyClick}
                      className="text-blue-400 hover:text-blue-300 underline mx-1"
                    >
                      隱私政策
                    </button>
                    *
                  </Label>
                </div>
                {errors.agreeTerms && <p className="text-red-400 text-sm">{errors.agreeTerms}</p>}

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked as boolean)}
                    className="border-blue-400/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mt-1"
                  />
                  <Label htmlFor="subscribeNewsletter" className="text-blue-200 text-sm cursor-pointer leading-relaxed">
                    訂閱電子報，接收最新的數學學習資源和活動資訊
                  </Label>
                </div>
              </div>

              {/* Register Button */}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? "註冊中..." : "創建帳戶"}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-slate-800 px-4 text-blue-300">或使用以下方式註冊</span>
                </div>
              </div>

              <SocialIcon />

              {/* Bottom Links */}
              <div className="flex justify-center space-x-6 text-sm pt-4">
                <Button
                  type="button"
                  variant="link"
                  className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal"
                >
                  尋求幫助
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal"
                >
                  忘記密碼?
                </Button>
              </div>

              {/* Login Link */}
              <div className="text-center pt-4">
                <span className="text-blue-200">已經有帳戶了？</span>
                <Button
                  type="button"
                  variant="link"
                  className="text-blue-400 hover:text-blue-300 p-0 ml-1"
                >

                  <a href="/login">立即登入</a>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Terms of Service Dialog */}
      <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
        <DialogContent className="bg-slate-800 border-blue-400/20 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-blue-400">服務條款</DialogTitle>
            <DialogDescription className="text-blue-200">請仔細閱讀以下服務條款</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-blue-100">
            <section>
              <h3 className="font-semibold text-blue-300 mb-2">1. 服務說明</h3>
              <p>
                MathHub 是一個數學學習平台，提供個人化的數學學習體驗。我們致力於幫助學生提升數學能力，培養邏輯思維。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-blue-300 mb-2">2. 用戶責任</h3>
              <p>用戶在使用本服務時，應遵守以下規定：</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>提供真實、準確的個人資訊</li>
                <li>不得濫用平台功能或干擾其他用戶</li>
                <li>不得上傳違法或不當內容</li>
                <li>保護個人帳戶安全，不得與他人共享帳戶</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-blue-300 mb-2">3. 知識產權</h3>
              <p>
                平台上的所有內容，包括但不限於題目、解答、教學材料等，均受知識產權法保護。用戶不得未經授權複製、分發或商業使用。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-blue-300 mb-2">4. 隱私保護</h3>
              <p>我們重視用戶隱私，會按照隱私政策處理用戶資訊。用戶資料僅用於提供服務和改善用戶體驗。</p>
            </section>

            <section>
              <h3 className="font-semibold text-blue-300 mb-2">5. 服務變更</h3>
              <p>我們保留隨時修改或終止服務的權利。重大變更將提前通知用戶。</p>
            </section>

            <section>
              <h3 className="font-semibold text-blue-300 mb-2">6. 免責聲明</h3>
              <p>
                本服務按「現狀」提供，我們不對服務的完整性、準確性或可用性作出保證。用戶使用服務的風險由其自行承擔。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-blue-300 mb-2">7. 聯絡方式</h3>
              <p>如有任何問題或建議，請透過平台內的客服功能或電子郵件與我們聯絡。</p>
            </section>
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setShowTermsDialog(false)} className="bg-blue-600 hover:bg-blue-700">
              我已閱讀
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Dialog */}
      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
        <DialogContent className="bg-slate-800 border-blue-400/20 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-blue-400">隱私政策</DialogTitle>
            <DialogDescription className="text-blue-200">我們如何收集、使用和保護您的個人資訊</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-blue-100">
            <section>
              <h3 className="font-semibold text-blue-300 mb-2">1. 資訊收集</h3>
              <p>我們收集以下類型的資訊：</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>註冊資訊：用戶名稱、電子郵件、年級等</li>
                <li>學習資料：答題記錄、學習進度、成績統計</li>
                <li>技術資訊：IP 地址、瀏覽器類型、設備資訊</li>
                <li>使用資料：登入時間、功能使用情況</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-blue-300 mb-2">2. 資訊使用</h3>
              <p>我們使用收集的資訊用於：</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>提供個人化學習體驗</li>
                <li>分析學習進度和成效</li>
                <li>改善平台功能和服務品質</li>
                <li>發送重要通知和更新資訊</li>
                <li>防止濫用和維護平台安全</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-blue-300 mb-2">3. 資訊分享</h3>
              <p>我們不會向第三方出售、交易或轉讓您的個人資訊，除非：</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>獲得您的明確同意</li>
                <li>法律要求或政府機關要求</li>
                <li>保護我們的權利和安全</li>
                <li>與可信的服務提供商合作（如雲端服務）</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-blue-300 mb-2">4. 資料安全</h3>
              <p>我們採用多種安全措施保護您的資訊：</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>加密傳輸和儲存敏感資料</li>
                <li>定期安全審查和更新</li>
                <li>限制員工存取權限</li>
                <li>使用安全的第三方服務</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-blue-300 mb-2">5. Cookie 使用</h3>
              <p>我們使用 Cookie 和類似技術來改善用戶體驗，包括記住登入狀態、個人化設定和分析網站使用情況。</p>
            </section>

            <section>
              <h3 className="font-semibold text-blue-300 mb-2">6. 用戶權利</h3>
              <p>您有權：</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>查看和更新個人資訊</li>
                <li>要求刪除帳戶和相關資料</li>
                <li>選擇退出電子報訂閱</li>
                <li>了解資料使用情況</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-blue-300 mb-2">7. 政策更新</h3>
              <p>我們可能會不定期更新此隱私政策。重大變更將透過平台通知或電子郵件告知用戶。</p>
            </section>

            <section>
              <h3 className="font-semibold text-blue-300 mb-2">8. 聯絡我們</h3>
              <p>如對隱私政策有任何疑問，請透過客服功能或發送郵件至 privacy@mathhub.com 聯絡我們。</p>
            </section>
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setShowPrivacyDialog(false)} className="bg-blue-600 hover:bg-blue-700">
              我已閱讀
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
