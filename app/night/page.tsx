"use client";

import { useEffect, useState } from "react";

type NightLog = {
  time: string;
  event: string;
};

export default function NightPage() {
  const [logs, setLogs] = useState<NightLog[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("nightLogs");
    if (saved) {
      setLogs(JSON.parse(saved));
    }
  }, []);

  function addLog(event: string) {
    const now = new Date();
    const time = now.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newLogs = [
      {
        time,
        event,
      },
      ...logs,
    ];

    setLogs(newLogs);
    localStorage.setItem("nightLogs", JSON.stringify(newLogs));
  }

  function clearLogs() {
    localStorage.removeItem("nightLogs");
    setLogs([]);
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">夜モード</h1>

      <div className="grid gap-4 mb-6">
        <button
          onClick={() => addLog("咳")}
          className="w-full bg-red-500 p-6 rounded-2xl text-2xl font-bold"
        >
          咳した
        </button>

        <button
          onClick={() => addLog("起きた")}
          className="w-full bg-yellow-500 p-6 rounded-2xl text-2xl font-bold text-gray-900"
        >
          起きた
        </button>

        <button
          onClick={() => addLog("授乳")}
          className="w-full bg-blue-500 p-6 rounded-2xl text-2xl font-bold"
        >
          授乳した
        </button>
      </div>

      <div className="bg-white/10 rounded-2xl p-4 mb-4">
        <h2 className="text-xl font-bold mb-3">夜中の記録</h2>

        {logs.length === 0 ? (
          <p className="text-gray-300">まだ記録はありません</p>
        ) : (
          <div className="space-y-2">
            {logs.map((log, index) => (
              <div
                key={index}
                className="flex justify-between bg-white/10 p-3 rounded-xl"
              >
                <span>{log.time}</span>
                <span>{log.event}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={clearLogs}
        className="w-full bg-gray-700 p-4 rounded-xl mb-4"
      >
        夜中の記録をリセット
      </button>

      <a
        href="/"
        className="block text-center w-full bg-white text-gray-900 p-4 rounded-xl"
      >
        ホームに戻る
      </a>
    </main>
  );
}
