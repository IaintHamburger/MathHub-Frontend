import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Flag,
  Lightbulb,
  Send,
  Star,
  Target,
  ThumbsUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function ProblemDetailPage() {
  const { problemId } = useParams<{ problemId: string }>();
  const [userAnswer, setUserAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // 模擬題目數據
  const problem = {
    id: Number.parseInt(problemId || "1", 10),
    title: "二次方程的判別式",
    description: "利用判別式判斷二次方程根的性質",
    category: "代數",
    difficulty: "簡單",
    timeEstimate: "15分鐘",
    solvedBy: 234,
    totalAttempts: 312,
    rating: 4.5,
    tags: ["二次方程", "判別式", "基礎"],
    solved: false,
    content: `
對於二次方程 $ax^2 + bx + c = 0$ (其中 $a \\neq 0$)，判別式定義為：

$$\\Delta = b^2 - 4ac$$

請根據判別式的值，判斷以下二次方程的根的性質：

**題目：** $2x^2 - 5x + 3 = 0$

1. 計算判別式 $\\Delta$ 的值
2. 根據判別式判斷根的性質
3. 求出方程的根（如果存在實根）
    `,
    solution: `
**解答步驟：**

1. **計算判別式：**
   對於方程 $2x^2 - 5x + 3 = 0$
   - $a = 2$, $b = -5$, $c = 3$
   - $\\Delta = b^2 - 4ac = (-5)^2 - 4(2)(3) = 25 - 24 = 1$

2. **判斷根的性質：**
   因為 $\\Delta = 1 > 0$，所以方程有兩個不相等的實根。

3. **求解方程的根：**
   使用求根公式：$x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$

   $x = \\frac{5 \\pm \\sqrt{1}}{2(2)} = \\frac{5 \\pm 1}{4}$

   因此：$x_1 = \\frac{5 + 1}{4} = \\frac{3}{2}$，$x_2 = \\frac{5 - 1}{4} = 1$

**答案：** 方程有兩個不相等的實根：$x = \\frac{3}{2}$ 和 $x = 1$
    `,
    hints: [
      "記住判別式的公式：Δ = b² - 4ac",
      "判別式大於0時，方程有兩個不相等的實根",
      "使用求根公式來計算具體的根值",
    ],
    relatedConcepts: [
      { id: 1, title: "二次函數基礎", category: "代數" },
      { id: 2, title: "求根公式", category: "代數" },
      { id: 3, title: "函數圖形", category: "代數" },
    ],
  };

  const comments = [
    {
      id: 1,
      user: "數學愛好者",
      content: "這題很好地展示了判別式的應用，解釋很清楚！",
      likes: 12,
      time: "2小時前",
    },
    {
      id: 2,
      user: "學習者123",
      content: "一開始不太理解，看了解答後豁然開朗。謝謝！",
      likes: 8,
      time: "5小時前",
    },
    {
      id: 3,
      user: "代數專家",
      content: "建議可以補充一下判別式為0和小於0的情況。",
      likes: 15,
      time: "1天前",
    },
  ];

  const handleSubmit = () => {
    setIsSubmitted(true);
    // 這裡可以添加提交邏輯
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "簡單":
        return "bg-green-600";
      case "中等":
        return "bg-yellow-600";
      case "困難":
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

  return (
    <div className="">
      <div className="max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <Button variant="ghost" className="text-blue-400 hover:text-blue-300 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <a href="/problems">返回題目列表</a>
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Problem Header */}
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className={getCategoryColor(problem.category)}>
                        {problem.category}
                      </Badge>
                      <Badge className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty}
                      </Badge>
                      {problem.solved && <CheckCircle className="w-5 h-5 text-green-400" />}
                    </div>
                    <CardTitle className="text-white text-2xl mb-2">{problem.title}</CardTitle>
                    <CardDescription className="text-blue-200 text-lg">
                      {problem.description}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`ml-4 p-2 ${
                      isFavorited
                        ? "text-yellow-400 hover:text-yellow-300"
                        : "text-slate-400 hover:text-yellow-400"
                    }`}
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Star className={`w-6 h-6 ${isFavorited ? "fill-current" : ""}`} />
                  </Button>
                </div>

                <div className="flex items-center space-x-6 text-sm pt-4 border-t border-slate-700">
                  <div className="flex items-center text-blue-200">
                    <Clock className="w-4 h-4 mr-1" />
                    {problem.timeEstimate}
                  </div>
                  <div className="flex items-center text-blue-200">
                    <Users className="w-4 h-4 mr-1" />
                    {problem.solvedBy}/{problem.totalAttempts} 完成
                  </div>
                  <div className="flex items-center text-blue-200">
                    <Star className="w-4 h-4 mr-1" />
                    {problem.rating}/5.0
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-3">
                  {problem.tags.map((tag, index) => (
                    <Badge
                      key={`tag-${problem.id}-${index}`}
                      variant="outline"
                      className="text-blue-300 border-blue-400/30"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>

            {/* Problem Content */}
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <CardTitle className="text-white">題目內容</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <div
                    className="text-blue-100 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: problem.content.replace(
                        /\$\$(.*?)\$\$/g,
                        '<div class="math-block">$1</div>',
                      ),
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Answer Input */}
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <CardTitle className="text-white">你的解答</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="請在此輸入你的解答過程和答案..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="min-h-32 bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200"
                  disabled={isSubmitted}
                />
                <div className="flex space-x-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={!userAnswer.trim() || isSubmitted}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitted ? "已提交" : "提交答案"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSolution(!showSolution)}
                    className="border-blue-400/30 text-blue-400 bg-transparent hover:bg-blue-400/10"
                  >
                    {showSolution ? "隱藏解答" : "查看解答"}
                  </Button>
                </div>
                {isSubmitted && (
                  <div className="p-4 bg-green-500/10 border border-green-400/20 rounded-lg">
                    <p className="text-green-400 font-medium">答案已提交！</p>
                    <p className="text-green-300 text-sm">系統正在評分中，請稍候...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Solution */}
            {showSolution && (
              <Card className="bg-slate-800/50 border-green-400/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-green-400" />
                    標準解答
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div
                      className="text-blue-100 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: problem.solution.replace(
                          /\$\$(.*?)\$\$/g,
                          '<div class="math-block">$1</div>',
                        ),
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comments Section */}
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <CardTitle className="text-white">討論區</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-white font-medium">{comment.user}</h4>
                        <span className="text-blue-300 text-sm">{comment.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {comment.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-red-400"
                        >
                          <Flag className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-blue-100">{comment.content}</p>
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-700">
                  <Textarea
                    placeholder="分享你的想法或疑問..."
                    className="mb-3 bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    發表評論
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hints */}
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-yellow-400" />
                  提示
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {problem.hints.map((hint, index) => (
                    <div
                      key={`hint-${problem.id}-${index}`}
                      className="p-3 bg-yellow-500/10 border border-yellow-400/20 rounded-lg"
                    >
                      <p className="text-yellow-200 text-sm">{hint}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Concepts */}
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
                  相關觀念
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {problem.relatedConcepts.map((concept) => (
                    <div
                      key={concept.id}
                      className="p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors"
                    >
                      <a href={`/concepts/${concept.id}`}>
                        <h4 className="text-white font-medium">{concept.title}</h4>
                        <p className="text-blue-300 text-sm">{concept.category}</p>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <CardTitle className="text-white">學習進度</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-blue-200">代數題目</span>
                      <span className="text-white">12/20</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: "60%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-blue-200">總體進度</span>
                      <span className="text-white">45/100</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: "45%" }} />
                    </div>
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
