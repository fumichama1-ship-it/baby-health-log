"use client";

import { useState } from "react";

export default function RecordPage() {
  const [temp, setTemp] = useState("");
  const [feed, setFeed] = useState("");
  const [cough, setCough] = useState("★★☆☆☆");
const [memo, setMemo] = useState("");

  function save() {
  const now = new Date();

  const newLog = {
    date: now.toLocaleString("ja-JP"),
    temp,
    feed,
    cough,
    memo,
  };

  const savedLogs = localStorage.getItem("babyLogs");
  const logs = savedLogs ? JSON.parse(savedLogs) : [];

  const newLogs = [newLog, ...logs];

  localStorage.setItem("babyLogs", JSON.stringify(newLogs));
  localStorage.setItem("babyLog", JSON.stringify(newLog));

  alert("保存しました");
  window.location.href = "/";
}

  return (
    <main className="min-h-screen bg-sky-100 p-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">今日の記録</h1>

      <div className="space-y-4">
        <input
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          className="w-full p-4 border rounded-xl bg-white"
          placeholder="体温 例：37.1"
        />

        <input
          value={feed}
          onChange={(e) => setFeed(e.target.value)}
          className="w-full p-4 border rounded-xl bg-white"
          placeholder="授乳回数 例：6"
        />
<textarea
  value={memo}
  onChange={(e) => setMemo(e.target.value)}
  className="w-full p-4 border rounded-xl bg-white"
  placeholder="症状メモ（例：咳が増えた、鼻水黄色、寝付き悪い）"
/>

        <select
          value={cough}
          onChange={(e) => setCough(e.target.value)}
          className="w-full p-4 border rounded-xl bg-white"
        >
          <option>★☆☆☆☆</option>
          <option>★★☆☆☆</option>
          <option>★★★☆☆</option>
          <option>★★★★☆</option>
          <option>★★★★★</option>
        </select>

        <button
          onClick={save}
          className="w-full bg-blue-500 text-white p-4 rounded-xl"
        >
          保存
        </button>

        <a
          href="/"
          className="block text-center w-full bg-gray-300 text-gray-900 p-4 rounded-xl"
        >
          ホームに戻る
        </a>
      </div>
    </main>
  );
}
