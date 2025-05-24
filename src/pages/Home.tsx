import { useState, useEffect } from 'react';
import type { HomeApiResponse } from '@/types/api';

const Home = (): React.JSX.Element => {
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res: Response) => res.text())
      .then((data: HomeApiResponse) => setMessage(data))
      .catch((error: Error) => {
        console.error('Failed to fetch data:', error);
        setMessage('Failed to load message');
      });
  }, []);

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-bold">MathHub</h1>
      {/* MathHub 內容部分 */}
      <div>
        MathHub 內容部分
      </div>
      <div className="card">
        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setCount((count: number) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      {message && (
        <div className="bg-gray-900 text-white">
          <h1 className="text-5xl font-bold">{message}</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
