"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, HelpCircle } from "lucide-react"
import { useState } from "react"

export default function FaqsPage() {
  const faqCategories = [
    {
      title: "基本介紹",
      items: ["什麼是 MathHub", "如何開始使用", "帳號註冊問題", "平台功能介紹"],
    },
    {
      title: "題庫使用",
      items: ["如何搜尋題目", "題目難度分級", "解題步驟說明", "答案驗證方式"],
    },
    {
      title: "觀念學習",
      items: ["學習路徑規劃", "概念關聯圖", "進度追蹤", "學習建議"],
    },
    {
      title: "LaTeX 編輯器",
      items: ["基本語法教學", "常用符號快捷鍵", "公式渲染問題", "匯出功能說明"],
    },
    {
      title: "技術支援",
      items: ["瀏覽器相容性", "效能優化建議", "常見錯誤排除", "聯絡客服方式"],
    },
  ]

  const popularQuestions = ["什麼是專案", "如何建立專案", "下一步"]

  const [expandedCategories, setExpandedCategories] = useState<number[]>([])

  const toggleCategory = (index: number) => {
    setExpandedCategories((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="">
      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-slate-800/30 border-r border-blue-400/20 p-4">
          <div className="mb-6">
            <div className="flex items-center text-blue-300 text-sm mb-2">
              <a href="/" className="hover:text-blue-400">
                首頁
              </a>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-blue-400">FAQ</span>
            </div>
          </div>

          <nav className="space-y-2">
            {faqCategories.map((category, index) => (
              <div key={`faq-category-${category.title}-${index}`} className="mb-2">
                  <button
                    type="button"
                    onClick={() => toggleCategory(index)}
                    className="flex items-center justify-between w-full text-white font-medium mb-2 px-2 py-1 hover:bg-slate-700/30 rounded transition-colors"
                  >
                  <span>{category.title}</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedCategories.includes(index) ? "rotate-90" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedCategories.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="space-y-1 ml-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={`faq-item-${item.replace(/\s+/g, "-").toLowerCase()}-${itemIndex}`}>
                        <a
                          href={`#${item.replace(/\s+/g, "-").toLowerCase()}`}
                          className="block px-2 py-1 text-blue-300 hover:text-blue-400 hover:bg-slate-700/30 rounded text-sm transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl   text-white mb-6">常見問題 FAQ</h1>
            <p className="text-blue-200 mb-8">在 MathHub 上學習數學之前，你需要先了解一些基本概念。</p>
            <p className="text-blue-200 mb-12">你可以按照以下步驟建立一個學習計畫。</p>

            {/* What is MathHub Section */}
            <section className="mb-12">
              <h2 className="text-2xl   text-white mb-6 border-b border-blue-400/20 pb-2">什麼是 MathHub</h2>
              <div className="text-blue-200 space-y-4">
                <p>
                  MathHub
                  是一個專為數學學習者設計的綜合平台，同一平台中的功能可以透過內部網路相互通信，你可以在不同的學習模組間無縫切換。
                  並在每個學習階段中累積你的學習成果。
                </p>
                <p>
                  除此之外，你也可以為學習{" "}
                  <a href="#latex-editor" className="text-blue-400 hover:underline">
                    設定預設數學編輯器
                  </a>
                  、{" "}
                  <a href="#problem-settings" className="text-blue-400 hover:underline">
                    選擇其他題目設定
                  </a>{" "}
                  來客製化學習等。
                </p>
              </div>
            </section>

            {/* How to Get Started Section */}
            <section className="mb-12">
              <h2 className="text-2xl   text-white mb-6 border-b border-blue-400/20 pb-2">如何開始使用</h2>
              <div className="text-blue-200 space-y-4">
                <p>
                  首先，你需要導航到{" "}
                  <a href="/register" className="text-blue-400 hover:underline">
                    註冊頁面
                  </a>
                  。
                </p>
                <p>如果你是第一次使用 MathHub，你會看到一個歡迎引導頁面。</p>

                {/* Screenshot placeholder */}
                <div className="my-8 p-6 bg-slate-800/50 border border-blue-400/20 rounded-lg">
                  <div className="bg-slate-700/50 rounded-lg p-8 text-center">
                    <HelpCircle className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">開始學習數學</h3>
                    <p className="text-blue-200 mb-4">你還沒有任何學習記錄，點擊下方面板開始你的數學學習之旅。</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">+ 建立新的學習計畫</Button>
                  </div>
                </div>

                <p>
                  如果你之前建立過學習計畫，你可以直接點擊{" "}
                  <code className="bg-slate-700 px-2 py-1 rounded text-blue-300">建立學習計畫</code> 按鈕，或者按下{" "}
                  <code className="bg-slate-700 px-2 py-1 rounded text-blue-300">Cmd + K</code> 或{" "}
                  <code className="bg-slate-700 px-2 py-1 rounded text-blue-300">Ctrl + K</code> 打開命令面板選擇{" "}
                  <code className="bg-slate-700 px-2 py-1 rounded text-blue-300">建立學習計畫</code>
                  ，然後選擇你想要建立學習計畫的適合，專案將會自動建立並分配一個隨機域名。
                </p>
              </div>
            </section>

            {/* Popular Templates Section */}
            <section className="mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">或者使用我們最受歡迎的學習模板</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "基礎代數", icon: "📐" },
                  { name: "微積分入門", icon: "📊" },
                  { name: "線性代數", icon: "📈" },
                  { name: "統計學基礎", icon: "📉" },
                ].map((template, index) => (
                  <Card
                    key={`faq-template-${template.name}-${index}`}
                    className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{template.icon}</div>
                      <h4 className="text-white font-medium">{template.name}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-64 p-4">
          <div className="sticky top-4">
            <h3 className="text-white font-medium mb-4">On This Page</h3>
            <nav className="space-y-2">
              {popularQuestions.map((question, index) => (
                <a
                  key={`faq-question-${question.replace(/\s+/g, "-").toLowerCase()}-${index}`}
                  href={`#${question.replace(/\s+/g, "-").toLowerCase()}`}
                  className="block text-blue-300 hover:text-blue-400 text-sm transition-colors"
                >
                  {question}
                </a>
              ))}
            </nav>
            <div className="mt-8 pt-4 border-t border-blue-400/20">
              <p className="text-blue-300 text-sm mb-2">Question? Give us feedback →</p>
              <p className="text-blue-300 text-sm">Edit this page</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
