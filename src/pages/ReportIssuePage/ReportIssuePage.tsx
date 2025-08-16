import { AlertTriangle, Bug, Lightbulb, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ReportIssuePage() {
  const { t } = useTranslation();

  return (
    <div className="">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl   text-white mb-4">{t("reportIssue.title")}</h1>
          <p className="text-blue-200 text-lg">{t("reportIssue.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Issue Types */}
          <Card className="bg-slate-800/50 border-blue-400/20 hover:border-red-400/40 transition-colors">
            <CardContent className="p-6 text-center">
              <Bug className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("reportIssue.types.bug.title")}
              </h3>
              <p className="text-blue-200 text-sm">{t("reportIssue.types.bug.description")}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-400/20 hover:border-yellow-400/40 transition-colors">
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("reportIssue.types.feature.title")}
              </h3>
              <p className="text-blue-200 text-sm">{t("reportIssue.types.feature.description")}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-400/20 hover:border-orange-400/40 transition-colors">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("reportIssue.types.content.title")}
              </h3>
              <p className="text-blue-200 text-sm">{t("reportIssue.types.content.description")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Report Form */}
        <Card className="bg-slate-800/50 border-blue-400/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl">{t("reportIssue.form.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="issueType" className="block text-white font-medium mb-2">
                  {t("reportIssue.form.issueType")}
                </label>
                <Select>
                  <SelectTrigger className="bg-slate-700/50 border-blue-400/30 text-white">
                    <SelectValue placeholder={t("reportIssue.form.issueTypePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-400/30">
                    <SelectItem value="bug" className="text-white hover:bg-slate-700">
                      {t("reportIssue.options.bug")}
                    </SelectItem>
                    <SelectItem value="feature" className="text-white hover:bg-slate-700">
                      {t("reportIssue.options.feature")}
                    </SelectItem>
                    <SelectItem value="content" className="text-white hover:bg-slate-700">
                      {t("reportIssue.options.content")}
                    </SelectItem>
                    <SelectItem value="other" className="text-white hover:bg-slate-700">
                      {t("reportIssue.options.other")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-white font-medium mb-2">
                  {t("reportIssue.form.priority")}
                </label>
                <Select>
                  <SelectTrigger className="bg-slate-700/50 border-blue-400/30 text-white">
                    <SelectValue placeholder={t("reportIssue.form.priorityPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-400/30">
                    <SelectItem value="low" className="text-white hover:bg-slate-700">
                      {t("reportIssue.priority.low")}
                    </SelectItem>
                    <SelectItem value="medium" className="text-white hover:bg-slate-700">
                      {t("reportIssue.priority.medium")}
                    </SelectItem>
                    <SelectItem value="high" className="text-white hover:bg-slate-700">
                      {t("reportIssue.priority.high")}
                    </SelectItem>
                    <SelectItem value="critical" className="text-white hover:bg-slate-700">
                      {t("reportIssue.priority.critical")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-white font-medium mb-2">
                {t("reportIssue.form.issueTitle")}
              </label>
              <Input
                placeholder={t("reportIssue.form.issueTitlePlaceholder")}
                className="bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-white font-medium mb-2">
                {t("reportIssue.form.description")}
              </label>
              <Textarea
                placeholder={t("reportIssue.form.descriptionPlaceholder")}
                rows={8}
                className="bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  {t("reportIssue.form.email")}
                </label>
                <Input
                  type="email"
                  placeholder={t("reportIssue.form.emailPlaceholder")}
                  className="bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200"
                />
                <p className="text-blue-300 text-sm mt-1">{t("reportIssue.form.emailHelp")}</p>
              </div>

              <div>
                <label htmlFor="browser" className="block text-white font-medium mb-2">
                  {t("reportIssue.form.browser")}
                </label>
                <Input
                  placeholder={t("reportIssue.form.browserPlaceholder")}
                  className="bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200"
                />
                <p className="text-blue-300 text-sm mt-1">{t("reportIssue.form.browserHelp")}</p>
              </div>
            </div>

            <div>
              <label htmlFor="screenshot" className="block text-white font-medium mb-2">
                {t("reportIssue.form.screenshot")}
              </label>
              <div className="border-2 border-dashed border-blue-400/30 rounded-lg p-8 text-center hover:border-blue-400/50 transition-colors cursor-pointer">
                <div className="text-blue-300">
                  <p className="mb-2">{t("reportIssue.form.screenshotHelp")}</p>
                  <p className="text-sm">{t("reportIssue.form.screenshotFormat")}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                className="border-blue-400/30 text-blue-300 hover:bg-slate-700/50 bg-transparent"
              >
                {t("reportIssue.form.cancel")}
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                {t("reportIssue.form.submit")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
