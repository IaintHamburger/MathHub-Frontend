export const useDailyInfo = () => {
  const userProgress = {
    consecutiveDays: 51, // 連續天數
    correctAnswers: 12, // 答對題數
    lastCorrect: 3, // 上題答對天數
    basicCompleted: true, // 基礎是否完成
    advancedUnlocked: true, // 進階是否解鎖（簡化邏輯）
  };

  const getGradeDescription = (grade: string, level: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      國中二年級: {
        基礎: "一元一次方程式",
        進階: "二元一次聯立方程式",
      },
      高中二年級: {
        基礎: "二次函數基本性質",
        進階: "二次函數圖形變換",
      },
      // 可以繼續添加其他年級...
    };

    return descriptions[grade]?.[level] || `${grade}${level}數學題目`;
  };
  return { userProgress, getGradeDescription };
};
