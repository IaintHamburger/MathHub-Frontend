import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Lightbulb,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ConceptDetailPage() {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [currentChapter, setCurrentChapter] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);

  // 模擬觀念數據
  const concept = {
    id: Number.parseInt(conceptId || "1", 10),
    title: "二次函數基礎",
    description: "了解二次函數的定義、圖形特徵和基本性質",
    category: "代數",
    level: "基礎",
    timeEstimate: "30分鐘",
    completedBy: 1234,
    totalLearners: 1500,
    rating: 4.7,
    tags: ["二次函數", "拋物線", "頂點"],
    progress: 60,
    chapters: [
      {
        id: 1,
        title: "二次函數的定義",
        duration: "5分鐘",
        content: `
# 二次函數的定義

二次函數是數學中最重要的函數類型之一。

## 標準形式
二次函數的標準形式為：
$$f(x) = ax^2 + bx + c$$

其中：
- $a \\neq 0$（這是二次函數的必要條件）
- $a$、$b$、$c$ 是常數
- $a$ 稱為二次項係數
- $b$ 稱為一次項係數
- $c$ 稱為常數項

## 圖形特徵
二次函數的圖形是一條**拋物線**：
- 當 $a > 0$ 時，拋物線開口向上
- 當 $a < 0$ 時，拋物線開口向下
        `,
        completed: true,
      },
      {
        id: 2,
        title: "拋物線的性質",
        duration: "8分鐘",
        content: `
# 拋物線的性質

## 對稱軸
二次函數 $f(x) = ax^2 + bx + c$ 的對稱軸方程為：
$$x = -\\frac{b}{2a}$$

## 頂點
頂點坐標為：
$$\\left(-\\frac{b}{2a}, f\\left(-\\frac{b}{2a}\\right)\\right)$$

## 最值
- 當 $a > 0$ 時，函數有最小值，在頂點處取得
- 當 $a < 0$ 時，函數有最大值，在頂點處取得
        `,
        completed: true,
      },
      {
        id: 3,
        title: "頂點式與因式分解式",
        duration: "7分鐘",
        content: `
# 二次函數的不同表示形式

## 頂點式
$$f(x) = a(x - h)^2 + k$$
其中 $(h, k)$ 是頂點坐標。

## 因式分解式
當二次函數有實根時：
$$f(x) = a(x - r_1)(x - r_2)$$
其中 $r_1$ 和 $r_2$ 是函數的零點。

## 形式轉換
這三種形式可以相互轉換，每種形式都有其特定的用途。
        `,
        completed: false,
      },
      {
        id: 4,
        title: "二次函數的應用",
        duration: "6分鐘",
        content: `
# 二次函數的實際應用

## 物理應用
- 拋物運動的軌跡
- 自由落體運動

## 經濟應用
- 利潤最大化問題
- 成本最小化問題

## 幾何應用
- 面積最大化問題
- 距離最短問題
        `,
        completed: false,
      },
      {
        id: 5,
        title: "練習與總結",
        duration: "4分鐘",
        content: `
# 練習與總結

## 重點回顧
1. 二次函數的標準形式：$f(x) = ax^2 + bx + c$
2. 拋物線的開口方向由 $a$ 的符號決定
3. 對稱軸：$x = -\\frac{b}{2a}$
4. 頂點式和因式分解式的應用

## 練習題
完成以下練習來鞏固所學知識...
        `,
        completed: false,
      },
    ],
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "基礎":
        return "bg-green-600";
      case "中等":
        return "bg-yellow-600";
      case "進階":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      代數: "bg-blue-600",
      幾何: "bg-purple-600",
      微積分: "bg-orange-600",
      三角函數: "bg-pink-600",
      機率統計: "bg-teal-600",
      複數: "bg-indigo-600",
      線性代數: "bg-cyan-600",
    };
    return colors[category as keyof typeof colors] || "bg-gray-600";
  };

  const handleChapterComplete = (chapterId: number) => {
    if (!completedChapters.includes(chapterId)) {
      setCompletedChapters([...completedChapters, chapterId]);
    }
  };

  const currentChapterData = concept.chapters.find((ch) => ch.id === currentChapter);
  const overallProgress = (completedChapters.length / concept.chapters.length) * 100;

  return (
    <div className="">
      <div className="max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <Button variant="ghost" className="text-blue-400 hover:text-blue-300 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <a href="/concepts">返回觀念列表</a>
        </Button>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Chapter List */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-blue-400/20 mb-6">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={getCategoryColor(concept.category)}>{concept.category}</Badge>
                  <Badge className={getLevelColor(concept.level)}>{concept.level}</Badge>
                </div>
                <CardTitle className="text-white text-lg">{concept.title}</CardTitle>
                <CardDescription className="text-blue-200">{concept.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-blue-200">整體進度</span>
                      <span className="text-white">{Math.round(overallProgress)}%</span>
                    </div>
                    <Progress value={overallProgress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-blue-200">
                      <Clock className="w-4 h-4 mr-1" />
                      {concept.timeEstimate}
                    </div>
                    <div className="flex items-center text-blue-200">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {concept.chapters.length} 章節
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <CardTitle className="text-white">章節列表</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {concept.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        currentChapter === chapter.id
                          ? "bg-blue-600/20 border border-blue-400/30"
                          : "bg-slate-700/30 hover:bg-slate-700/50"
                      }`}
                      onClick={() => setCurrentChapter(chapter.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {completedChapters.includes(chapter.id) || chapter.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-slate-500" />
                          )}
                          <span className="text-white text-sm font-medium">{chapter.title}</span>
                        </div>
                      </div>
                      <p className="text-blue-300 text-xs mt-1 ml-6">{chapter.duration}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Chapter Header */}
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-xl">
                      第 {currentChapter} 章：{currentChapterData?.title}
                    </CardTitle>
                    <CardDescription className="text-blue-200 flex items-center mt-2">
                      <Clock className="w-4 h-4 mr-1" />
                      預計學習時間：{currentChapterData?.duration}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-400/30 text-blue-400 bg-transparent hover:bg-blue-400/10"
                      onClick={() => setCurrentChapter(Math.max(1, currentChapter - 1))}
                      disabled={currentChapter === 1}
                    >
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className={`${isPlaying ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"}`}
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 mr-2" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      {isPlaying ? "暫停" : "開始學習"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-400/30 text-blue-400 bg-transparent hover:bg-blue-400/10"
                      onClick={() =>
                        setCurrentChapter(Math.min(concept.chapters.length, currentChapter + 1))
                      }
                      disabled={currentChapter === concept.chapters.length}
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Chapter Content */}
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardContent className="p-8">
                <div className="prose prose-invert max-w-none">
                  <div
                    className="text-blue-100 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html:
                        currentChapterData?.content
                          .replace(
                            /\$\$(.*?)\$\$/g,
                            '<div class="math-block text-center my-4 text-lg">$1</div>',
                          )
                          .replace(/\$(.*?)\$/g, '<span class="math-inline">$1</span>') || "",
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Chapter Actions */}
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      className="border-blue-400/30 text-blue-400 bg-transparent hover:bg-blue-400/10"
                      onClick={() => setCurrentChapter(Math.max(1, currentChapter - 1))}
                      disabled={currentChapter === 1}
                    >
                      <SkipBack className="w-4 h-4 mr-2" />
                      上一章
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleChapterComplete(currentChapter)}
                      disabled={
                        completedChapters.includes(currentChapter) || currentChapterData?.completed
                      }
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {completedChapters.includes(currentChapter) || currentChapterData?.completed
                        ? "已完成"
                        : "標記完成"}
                    </Button>
                    <Button
                      onClick={() =>
                        setCurrentChapter(Math.min(concept.chapters.length, currentChapter + 1))
                      }
                      disabled={currentChapter === concept.chapters.length}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      下一章
                      <SkipForward className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="text-blue-200 text-sm">
                    {currentChapter} / {concept.chapters.length} 章節
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Tips */}
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                  學習建議
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                    <h4 className="text-blue-400 font-medium mb-2">理解重點</h4>
                    <p className="text-blue-200 text-sm">
                      專注理解二次函數的基本概念，不要急於記憶公式。先理解圖形特徵，再學習代數表示。
                    </p>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-400/20 rounded-lg">
                    <h4 className="text-green-400 font-medium mb-2">練習方法</h4>
                    <p className="text-green-200 text-sm">
                      多畫圖形，觀察不同參數對拋物線的影響。結合具體例子來理解抽象概念。
                    </p>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-400/20 rounded-lg">
                    <h4 className="text-purple-400 font-medium mb-2">常見錯誤</h4>
                    <p className="text-purple-200 text-sm">
                      注意 a ≠ 0 的條件，混淆對稱軸公式，忽略開口方向與 a 的符號關係。
                    </p>
                  </div>
                  <div className="p-4 bg-orange-500/10 border border-orange-400/20 rounded-lg">
                    <h4 className="text-orange-400 font-medium mb-2">延伸學習</h4>
                    <p className="text-orange-200 text-sm">
                      學完基礎後，可以探索二次函數的應用問題，如最值問題和實際應用場景。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
