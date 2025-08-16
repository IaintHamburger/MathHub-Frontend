import {
  BookOpen,
  CheckCircle,
  Clock,
  Lightbulb,
  Lock,
  Play,
  Search,
  Target,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ConceptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedTab, setSelectedTab] = useState("all");

  const concepts = [
    {
      id: 1,
      title: "二次函數基礎",
      description: "了解二次函數的定義、圖形特徵和基本性質",
      category: "代數",
      level: "基礎",
      timeEstimate: "30分鐘",
      completedBy: 1234,
      totalLearners: 1500,
      rating: 4.7,
      tags: ["二次函數", "拋物線", "頂點"],
      completed: true,
      progress: 100,
      chapters: 5,
    },
    {
      id: 2,
      title: "三角恆等式",
      description: "掌握常用的三角恆等式及其證明方法",
      category: "三角函數",
      level: "進階",
      timeEstimate: "45分鐘",
      completedBy: 567,
      totalLearners: 890,
      rating: 4.8,
      tags: ["三角函數", "恆等式", "證明"],
      completed: false,
      progress: 0,
      chapters: 7,
    },
    {
      id: 3,
      title: "導數的幾何意義",
      description: "理解導數作為切線斜率的幾何解釋",
      category: "微積分",
      level: "中等",
      timeEstimate: "40分鐘",
      completedBy: 890,
      totalLearners: 1200,
      rating: 4.5,
      tags: ["導數", "切線", "幾何"],
      completed: true,
      progress: 100,
      chapters: 6,
    },
    {
      id: 4,
      title: "機率分布概念",
      description: "學習離散和連續機率分布的基本概念",
      category: "機率統計",
      level: "中等",
      timeEstimate: "35分鐘",
      completedBy: 678,
      totalLearners: 950,
      rating: 4.4,
      tags: ["機率", "分布", "統計"],
      completed: false,
      progress: 60,
      chapters: 8,
    },
    {
      id: 5,
      title: "複數的基本運算",
      description: "掌握複數的四則運算和基本性質",
      category: "複數",
      level: "基礎",
      timeEstimate: "25分鐘",
      completedBy: 1100,
      totalLearners: 1300,
      rating: 4.6,
      tags: ["複數", "運算", "基礎"],
      completed: true,
      progress: 100,
      chapters: 4,
    },
    {
      id: 6,
      title: "矩陣運算進階",
      description: "深入學習矩陣的乘法、逆矩陣和行列式",
      category: "線性代數",
      level: "進階",
      timeEstimate: "60分鐘",
      completedBy: 234,
      totalLearners: 456,
      rating: 4.9,
      tags: ["矩陣", "線性代數", "進階"],
      completed: false,
      progress: 0,
      chapters: 10,
      locked: true,
      prerequisite: "線性代數基礎",
    },
  ];

  const categories = ["all", "代數", "幾何", "微積分", "三角函數", "機率統計", "複數", "線性代數"];
  const levels = ["all", "基礎", "中等", "進階"];

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

  const filteredConcepts = concepts.filter((concept) => {
    const matchesSearch =
      concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || concept.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || concept.level === selectedLevel;
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "completed" && concept.completed) ||
      (selectedTab === "in-progress" && concept.progress > 0 && concept.progress < 100) ||
      (selectedTab === "not-started" && concept.progress === 0);

    return matchesSearch && matchesCategory && matchesLevel && matchesTab;
  });

  const stats = {
    total: concepts.length,
    completed: concepts.filter((c) => c.completed).length,
    inProgress: concepts.filter((c) => c.progress > 0 && c.progress < 100).length,
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">總觀念��</p>
                  <p className="text-2xl   text-white">{stats.total}</p>
                </div>
                <Lightbulb className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">已完成</p>
                  <p className="text-2xl   text-white">{stats.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div className="mt-2">
                <Progress value={(stats.completed / stats.total) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">學習中</p>
                  <p className="text-2xl   text-white">{stats.inProgress}</p>
                </div>
                <Target className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="bg-slate-800/50 border-blue-400/20 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                <Input
                  placeholder="搜尋觀念、標籤或描述..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200"
                />
              </div>
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 bg-slate-700/50 border-blue-400/30 text-white">
                    <SelectValue placeholder="選擇分類" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-400/30">
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="text-white hover:bg-slate-700"
                      >
                        {category === "all" ? "所有分類" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-32 bg-slate-700/50 border-blue-400/30 text-white">
                    <SelectValue placeholder="難度" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-400/30">
                    {levels.map((level) => (
                      <SelectItem
                        key={level}
                        value={level}
                        className="text-white hover:bg-slate-700"
                      >
                        {level === "all" ? "所有難度" : level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Concept Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="bg-slate-800/50 border-blue-400/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
              全部觀念 ({concepts.length})
            </TabsTrigger>
            <TabsTrigger value="not-started" className="data-[state=active]:bg-blue-600">
              未開始 ({concepts.filter((c) => c.progress === 0).length})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-blue-600">
              學習中 ({concepts.filter((c) => c.progress > 0 && c.progress < 100).length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600">
              已完成 ({concepts.filter((c) => c.completed).length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Concepts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredConcepts.map((concept) => (
            <Card
              key={concept.id}
              className={`bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 cursor-pointer ${
                concept.locked ? "opacity-60" : ""
              }`}
            >
              <a href={`/concepts/${concept.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getCategoryColor(concept.category)}>
                          {concept.category}
                        </Badge>
                        <Badge className={getLevelColor(concept.level)}>{concept.level}</Badge>
                        {concept.completed && <CheckCircle className="w-4 h-4 text-green-400" />}
                        {concept.locked && <Lock className="w-4 h-4 text-slate-400" />}
                      </div>
                      <CardTitle className="text-white text-lg mb-2">{concept.title}</CardTitle>
                      <CardDescription className="text-blue-200">
                        {concept.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-blue-200">
                        <Clock className="w-4 h-4 mr-1" />
                        {concept.timeEstimate}
                      </div>
                      <div className="flex items-center text-blue-200">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {concept.chapters} 章節
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-blue-200">
                        <Users className="w-4 h-4 mr-1" />
                        {concept.completedBy}/{concept.totalLearners}
                      </div>
                    </div>

                    {concept.progress > 0 && concept.progress < 100 && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-200">學習進度</span>
                          <span className="text-white">{concept.progress}%</span>
                        </div>
                        <Progress value={concept.progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {concept.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={`tag-${concept.id}-${index}`}
                          variant="outline"
                          className="text-xs text-blue-300 border-blue-400/30"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {concept.locked ? (
                      <div className="space-y-2">
                        <p className="text-slate-400 text-sm">需要先完成：{concept.prerequisite}</p>
                        <Button
                          disabled
                          className="w-full bg-slate-700 text-slate-500 cursor-not-allowed"
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          已鎖定
                        </Button>
                      </div>
                    ) : (
                      <Button
                        disabled={concept.locked}
                        className={`w-full ${
                          concept.completed
                            ? "bg-green-600 hover:bg-green-700"
                            : concept.progress > 0
                              ? "bg-yellow-600 hover:bg-yellow-700"
                              : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!concept.locked) {
                            window.location.href = `/concepts/${concept.id}`;
                          }
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {concept.completed
                          ? "重新學習"
                          : concept.progress > 0
                            ? "繼續學習"
                            : "開始學習"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>

        {filteredConcepts.length === 0 && (
          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardContent className="p-12 text-center">
              <Lightbulb className="w-16 h-16 text-blue-400/50 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">沒有找到相關觀念</h3>
              <p className="text-blue-200">請嘗試調整搜尋條件或選擇不同的篩選選項</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
