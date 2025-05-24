import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import type { QuestItem, QuestListResponse } from '@/types/api';

const Quest = (): React.JSX.Element => {
    const [data, setData] = useState<QuestItem[]>([]);           // 查詢題目
    const [loading, setLoading] = useState<boolean>(true);   // 載入狀態

    useEffect(() => {
        fetch("http://localhost:5000/quest/getList?begin=0&end=9")
            .then((res: Response) => res.json())
            .then((data: QuestListResponse) => {
                setData(data);
                setLoading(false);
            })
            .catch((error: Error) => {
                console.error('Failed to fetch quest list:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex items-center flex-col justify-start h-screen bg-gray-900, text-white">
            <h1 className="text-5xl font-bold mb-4 mt-8">題目</h1>
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                    {loading ? (<p>加載中...</p>) : (
                        <table className="min-w-[25vw]">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="p-2">標題</th>
                                    <th className="p-2">標籤</th>
                                    <th className="p-2">發佈者</th>
                                    <th className="p-2">發佈時間</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item: QuestItem) => (
                                    <tr key={item.id} className="border-t border-gray-700">
                                        <td className="p-2">
                                            <Link to={`/exam/${item.id}`} className="text-white hover:text-gray-300 transition-colors">
                                                {item.title}
                                            </Link>
                                        </td>
                                        <td className="p-2">{item.tags}</td>
                                        <td className="p-2">{item.publisher}</td>
                                        <td className="p-2">
                                            {new Date(item.publish_time).toLocaleString("en-US", { timeZone: "Asia/Taipei" })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quest;