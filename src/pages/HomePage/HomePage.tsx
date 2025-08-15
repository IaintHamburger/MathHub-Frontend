import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getUUID } from "@/lib/utils"
import { useTranslation } from "react-i18next"

import { Bell, BookOpen, Calendar, PenTool, Search } from "lucide-react"

import { ReactComponent as MathCatLogo } from "@/assets/logo/MathCat_Full.svg"

const Home = (): React.JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="mb-8">
            <div className="w-[320px] mx-auto flex mb-4">
              <MathCatLogo />
            </div>
            <p className="text-xl text-blue-200 mb-8">{t("home.subtitle")}</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder={t("home.search.placeholder")}
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-blue-400/30 bg-slate-800/50 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              />
              <Button
                size="sm"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full bg-blue-600 hover:bg-blue-700"
              >
                <Search className="w-4 h-4 mr-1" />
                {t("home.search.button")}
              </Button>
            </div>
          </div>

          {/* 公告預覽區域 - 移到搜尋欄下方 */}
          <section className="mb-16">
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    {t("home.announcements.title")}
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300" asChild>
                    <a href="/announcements">{t("home.announcements.more")}</a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: t("home.announcements.maintenance.title"),
                      date: "2025-01-02",
                      preview: t("home.announcements.maintenance.preview"),
                    },
                    {
                      title: t("home.announcements.feature.title"),
                      date: "2025-01-01",
                      preview: t("home.announcements.feature.preview"),
                    },
                    {
                      title: t("home.announcements.daily.title"),
                      date: "2024-12-30",
                      preview: t("home.announcements.daily.preview"),
                    },
                  ].map((announcement, i) => (
                    <div
                      key={getUUID()}
                      className="p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer text-left"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-white font-medium text-left">{announcement.title}</h4>
                        <span className="text-xs text-slate-400">{announcement.date}</span>
                      </div>
                      <p className="text-blue-200 text-sm text-left">{announcement.preview}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 快速功能入口 */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{t("home.features.problems.title")}</h3>
                <p className="text-blue-200 mb-4">{t("home.features.problems.description")}</p>
                <Button className="bg-green-600 hover:bg-green-700" asChild>
                  <a href="/problems">{t("home.features.problems.button")}</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{t("home.features.daily.title")}</h3>
                <p className="text-blue-200 mb-4">{t("home.features.daily.description")}</p>
                <Button className="bg-orange-600 hover:bg-orange-700" asChild>
                  <a href="/daily-problem">{t("home.features.daily.button")}</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <PenTool className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{t("home.features.concepts.title")}</h3>
                <p className="text-blue-200 mb-4">{t("home.features.concepts.description")}</p>
                <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                  <a href="/concepts">{t("home.features.concepts.button")}</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 分類 Section */}
          <section className="mb-16">
            <h2 className="text-3xl   text-center text-white mb-8">{t("home.categories.title")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {Array.from({ length: 10 }).map((_, i) => (
                <Card
                  key={getUUID()}
                  className="aspect-square hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer transform bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40"
                >
                  <CardContent className="flex items-center justify-center h-full">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-lg" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-blue-200 mt-4">{t("home.categories.description")}</p>
          </section>

          {/* 問題 Section */}
          <section className="mb-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-800/50 border-blue-400/20 border rounded-lg p-8 shadow-lg mb-4">
                  <div className="w-full h-48 bg-slate-700/50 rounded-lg mb-4" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl   text-white mb-2">{t("home.problems.title")}</h3>
                <p className="text-blue-200 mb-4">
                  <span className="font-semibold">{t("home.problems.description")}</span>
                </p>
                <Input
                  placeholder={t("home.problems.search")}
                  className="max-w-md mx-auto bg-slate-800/50 border-blue-400/30 text-white placeholder:text-blue-200 focus:border-blue-400"
                />
              </div>
            </div>
          </section>

          {/* 觀念 Section */}
          <section className="mb-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-800/50 border-blue-400/20 border rounded-lg p-8 shadow-lg mb-4">
                <div className="w-full h-48 bg-slate-700/50 rounded-lg mb-4" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl   text-white mb-2">{t("home.concepts.title")}</h3>
                <p className="text-blue-200 mb-4">
                  <span className="font-semibold">{t("home.concepts.description")}</span>
                </p>
                <Input
                  placeholder={t("home.concepts.search")}
                  className="max-w-md mx-auto bg-slate-800/50 border-blue-400/30 text-white placeholder:text-blue-200 focus:border-blue-400"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
