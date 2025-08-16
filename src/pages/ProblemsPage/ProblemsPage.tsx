import { Bookmark, BookOpen, CheckCircle, Plus, Search, Star, Target, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTab, setSelectedTab] = useState("all");

  const [favorites, setFavorites] = useState<Record<number, string>>({}); // 題目ID -> 收藏庫名稱
  const [collections, setCollections] = useState<string[]>(["我的最愛", "重點複習"]); // 收藏庫列表
  const [newCollectionName, setNewCollectionName] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);
  const [currentProblemId, setCurrentProblemId] = useState<number | null>(null);

  const problems = [
    {
      id: 1,
      title: "二次方程的判別式",
      description: "利用判別式判斷二次方程根的性質",
      category: "代數",
      difficulty: "簡單",
      timeEstimate: "15分鐘",
      solvedBy: 234,
      totalAttempts: 312,
      rating: 4.5,
      tags: ["二次方程", "判別式", "基礎"],
      solved: true,
    },
    {
      id: 2,
      title: "三角函數恆等式證明",
      description: "證明複雜的三角函數恆等式",
      category: "三角函數",
      difficulty: "困難",
      timeEstimate: "45分鐘",
      solvedBy: 89,
      totalAttempts: 156,
      rating: 4.8,
      tags: ["三角函數", "恆等式", "證明"],
      solved: false,
    },
    {
      id: 3,
      title: "導數的幾何意義",
      description: "理解導數作為切線斜率的幾何意義",
      category: "微積分",
      difficulty: "中等",
      timeEstimate: "30分鐘",
      solvedBy: 167,
      totalAttempts: 203,
      rating: 4.3,
      tags: ["導數", "幾何", "切線"],
      solved: true,
    },
    {
      id: 4,
      title: "機率分布計算",
      description: "計算離散和連續機率分布",
      category: "機率統計",
      difficulty: "中等",
      timeEstimate: "25分鐘",
      solvedBy: 145,
      totalAttempts: 198,
      rating: 4.2,
      tags: ["機率", "分布", "統計"],
      solved: false,
    },
    {
      id: 5,
      title: "複數的極坐標表示",
      description: "將複數轉換為極坐標形式並進行運算",
      category: "複數",
      difficulty: "中等",
      timeEstimate: "20分鐘",
      solvedBy: 123,
      totalAttempts: 167,
      rating: 4.4,
      tags: ["複數", "極坐標", "轉換"],
      solved: true,
    },
    {
      id: 6,
      title: "矩陣特徵值計算",
      description: "計算矩陣的特徵值和特徵向量",
      category: "線性代數",
      difficulty: "困難",
      timeEstimate: "50分鐘",
      solvedBy: 67,
      totalAttempts: 134,
      rating: 4.6,
      tags: ["矩陣", "特徵值", "線性代數"],
      solved: false,
    },
  ];

  const categories = ["all", "代數", "幾何", "微積分", "三角函數", "機率統計", "複數", "線性代數"];
  const difficulties = ["all", "簡單", "中等", "困難"];

  const getDifficultyLevel = (difficulty: string) => {
    switch (difficulty) {
      case "簡單":
        return 2;
      case "中等":
        return 3;
      case "困難":
        return 5;
      default:
        return 1;
    }
  };

  const DifficultyBookmarks = ({ difficulty }: { difficulty: string }) => {
    const level = getDifficultyLevel(difficulty);
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((bookmark) => (
          <Bookmark
            key={bookmark}
            className={`w-4 h-4 ${bookmark <= level ? "text-yellow-400 fill-yellow-400" : "text-slate-400"}`}
          />
        ))}
      </div>
    );
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

  const handleFavoriteClick = (problemId: number) => {
    if (favorites[problemId]) {
      // 取消收藏
      const newFavorites = { ...favorites };
      delete newFavorites[problemId];
      setFavorites(newFavorites);
    } else {
      // 添加收藏 - 打開選擇收藏庫對話框
      setCurrentProblemId(problemId);
      setShowCollectionDialog(true);
    }
  };

  const handleAddToCollection = () => {
    if (currentProblemId && selectedCollection) {
      setFavorites((prev) => ({
        ...prev,
        [currentProblemId]: selectedCollection,
      }));
      setShowCollectionDialog(false);
      setSelectedCollection("");
      setCurrentProblemId(null);
    }
  };

  const handleCreateCollection = () => {
    if (newCollectionName.trim() && !collections.includes(newCollectionName.trim())) {
      setCollections((prev) => [...prev, newCollectionName.trim()]);
      setSelectedCollection(newCollectionName.trim());
      setNewCollectionName("");
    }
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || problem.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" || problem.difficulty === selectedDifficulty;
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "solved" && problem.solved) ||
      (selectedTab === "unsolved" && !problem.solved) ||
      (selectedTab === "favorites" && favorites[problem.id]);

    return matchesSearch && matchesCategory && matchesDifficulty && matchesTab;
  });

  const stats = {
    total: problems.length,
    solved: problems.filter((p) => p.solved).length,
    inProgress: Math.floor(problems.length * 0.2),
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">總題目數</p>
                  <p className="text-2xl   text-white">{stats.total}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">已完成</p>
                  <p className="text-2xl   text-white">{stats.solved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div className="mt-2">
                <Progress value={(stats.solved / stats.total) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">進行中</p>
                  <p className="text-2xl   text-white">{stats.inProgress}</p>
                </div>
                <Target className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">已收藏</p>
                  <p className="text-2xl   text-white">{Object.keys(favorites).length}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-400" />
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
                  placeholder="搜尋題目、標籤或描述..."
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

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-32 bg-slate-700/50 border-blue-400/30 text-white">
                    <SelectValue placeholder="難度" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-400/30">
                    {difficulties.map((difficulty) => (
                      <SelectItem
                        key={difficulty}
                        value={difficulty}
                        className="text-white hover:bg-slate-700"
                      >
                        {difficulty === "all" ? "所有難度" : difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problem Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="bg-slate-800/50 border-blue-400/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
              全部題目 ({problems.length})
            </TabsTrigger>
            <TabsTrigger value="unsolved" className="data-[state=active]:bg-blue-600">
              未完成 ({problems.filter((p) => !p.solved).length})
            </TabsTrigger>
            <TabsTrigger value="solved" className="data-[state=active]:bg-blue-600">
              已完成 ({problems.filter((p) => p.solved).length})
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-blue-600">
              我的收藏 ({Object.keys(favorites).length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Problems Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProblems.map((problem) => (
            <Card
              key={problem.id}
              className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <a href={`/problems/${problem.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getCategoryColor(problem.category)}>
                          {problem.category}
                        </Badge>
                        <DifficultyBookmarks difficulty={problem.difficulty} />
                        {problem.solved && <CheckCircle className="w-4 h-4 text-green-400" />}
                      </div>
                      <CardTitle className="text-white text-lg mb-2">{problem.title}</CardTitle>
                      <CardDescription className="text-blue-200">
                        {problem.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`ml-2 p-1 ${
                        favorites[problem.id]
                          ? "text-yellow-400 hover:text-yellow-300"
                          : "text-slate-400 hover:text-yellow-400"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavoriteClick(problem.id);
                      }}
                    >
                      <Star className={`w-5 h-5 ${favorites[problem.id] ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                  <div className="mt-2 h-6 flex items-center">
                    {favorites[problem.id] ? (
                      <Badge
                        variant="outline"
                        className="text-xs text-yellow-400 border-yellow-400/30"
                      >
                        收藏於: {favorites[problem.id]}
                      </Badge>
                    ) : (
                      <div className="h-5" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-blue-200">
                        <Users className="w-4 h-4 mr-1" />
                        {problem.solvedBy}/{problem.totalAttempts}
                      </div>
                      <div className="text-blue-200 text-sm">
                        {Math.round((problem.solvedBy / problem.totalAttempts) * 100)}% 通過率
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {problem.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={`tag-${problem.id}-${index}`}
                          variant="outline"
                          className="text-xs text-blue-300 border-blue-400/30"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      className={`w-full ${problem.solved ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/problems/${problem.id}`;
                      }}
                    >
                      {problem.solved ? "重新挑戰" : "開始挑戰"}
                    </Button>
                  </div>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-blue-400/50 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">沒有找到相關題目</h3>
              <p className="text-blue-200">請嘗試調整搜尋條件或選擇不同的篩選選項</p>
            </CardContent>
          </Card>
        )}

        {/* 收藏庫選擇對話框 */}
        <Dialog open={showCollectionDialog} onOpenChange={setShowCollectionDialog}>
          <DialogContent className="bg-slate-800 border-blue-400/20">
            <DialogHeader>
              <DialogTitle className="text-white">選擇收藏庫</DialogTitle>
              <DialogDescription className="text-blue-200">
                選擇要將題目加入的收藏庫，或創建新的收藏庫
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* 現有收藏庫列表 */}
              <div className="space-y-2">
                <label htmlFor="collection-select" className="text-sm font-medium text-blue-200">
                  選擇收藏庫
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {collections.map((collection) => (
                    <Button
                      key={collection}
                      variant={selectedCollection === collection ? "default" : "outline"}
                      className={`justify-start ${
                        selectedCollection === collection
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-blue-400/30 text-blue-400 bg-transparent hover:bg-blue-400/10"
                      }`}
                      onClick={() => setSelectedCollection(collection)}
                    >
                      {collection}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 創建新收藏庫 */}
              <div className="space-y-2">
                <label htmlFor="new-collection-name" className="text-sm font-medium text-blue-200">
                  創建新收藏庫
                </label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="輸入收藏庫名稱"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    className="bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200"
                    onKeyDown={(e) => e.key === "Enter" && handleCreateCollection()}
                  />
                  <Button
                    variant="outline"
                    className="border-blue-400/30 text-blue-400 bg-transparent hover:bg-blue-400/10"
                    onClick={handleCreateCollection}
                    disabled={!newCollectionName.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                className="border-blue-400/30 text-blue-400 bg-transparent hover:bg-blue-400/10"
                onClick={() => setShowCollectionDialog(false)}
              >
                取消
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleAddToCollection}
                disabled={!selectedCollection}
              >
                加入收藏
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
