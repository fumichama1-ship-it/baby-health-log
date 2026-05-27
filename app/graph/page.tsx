"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type BabyLog = {
  date: string;
  temp: string;
};

export default function GraphPage() {
  const [logs, setLogs] = useState<BabyLog[]>([]);

  useEffect(() => {
    const savedLogs = localStorage.getItem("babyLogs");
    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs);

      const graphData = parsedLogs
        .slice()
        .reverse()
        .map((log: BabyLog) => ({
          date: log.date,
          temp: Number(log.temp),
        }));

      setLogs(graphData);
    }
  }, []);

  return (
    <main className="min-h-screen bg-sky-100 p-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">体温グラフ</h1>

      <div className="bg-white rounded-2xl p-5 shadow h-80">
        {logs.length === 0 ? (
          <p>まだ記録がありません</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={logs}>
              <XAxis dataKey="date" hide />
              <YAxis domain={[35, 40]} />
              <Tooltip />
              <Line type="monotone" dataKey="temp" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <a
        href="/"
        className="block text-center bg-blue-500 text-white p-4 rounded-2xl mt-6"
      >
        ホームに戻る
      </a>
    </main>
  );
}
