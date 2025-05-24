import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Latex from "react-latex-next";
import type { QuestDetail, QuestDetailResponse } from "@/types/api";

const Exam = (): React.JSX.Element => {
  const params = useParams(); // 從 URL 獲取參數
  const [data, setData] = useState<QuestDetail>({} as QuestDetail); // 查詢題目
  const [loading, setLoading] = useState<boolean>(true); // 載入狀態

  useEffect(() => {
    if (params.questId) {
      fetch(`http://localhost:5000/quest/getQuest/${params.questId}`)
        .then((res: Response) => res.json())
        .then((data: QuestDetailResponse) => {
          setData(data);
          setLoading(false);
        })
        .catch((error: Error) => {
          console.error("Failed to fetch quest detail:", error);
          setLoading(false);
        });
    }
  }, [params.questId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
      <div className="mb-6">
        <Latex>{`$${data.question || ""}$`}</Latex>
      </div>
      <form
        action={`http://localhost:5000/quest/answerQuest/${params.questId}`}
        method="GET"
        className="flex flex-col items-center gap-4"
      >
        <input
          type="text"
          name="answer"
          className="bg-white text-black px-4 py-2 rounded-md"
          placeholder="輸入答案..."
          required
        />
        <input
          type="submit"
          value="提交答案"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Exam;
