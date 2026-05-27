"use client";

import { useEffect, useState } from "react";

type BabyLog = {
	date: string;
	temp: string;
	feed: string;
	cough: string;
	memo: string;
};

export default function HistoryPage() {
	const [logs, setLogs] = useState<BabyLog[]>([]);
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [keyword, setKeyword] = useState("");
	const [selectedDate, setSelectedDate] = useState("");

	useEffect(() => {
		const savedLogs = localStorage.getItem("babyLogs");
		if (savedLogs) setLogs(JSON.parse(savedLogs));
	}, []);

	function saveLogs(newLogs: BabyLog[]) {
		setLogs(newLogs);
		localStorage.setItem("babyLogs", JSON.stringify(newLogs));

		if (newLogs.length > 0) {
			localStorage.setItem("babyLog", JSON.stringify(newLogs[0]));
		} else {
			localStorage.removeItem("babyLog");
		}
	}

	function deleteLog(index: number) {
		if (!confirm("削除しますか？")) return;
		saveLogs(logs.filter((_, i) => i !== index));
	}

	function updateLog(index: number, field: keyof BabyLog, value: string) {
		const newLogs = [...logs];
		newLogs[index] = { ...newLogs[index], [field]: value };
		setLogs(newLogs);
	}

	function finishEdit() {
		saveLogs(logs);
		setEditIndex(null);
		alert("保存しました");
	}

	function logDateToInputDate(dateText: string) {
		const date = new Date(dateText);
		if (isNaN(date.getTime())) return "";

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	}

	const filteredLogs = logs.filter((log) => {
		const keywordMatch =
			log.memo.includes(keyword) ||
			log.temp.includes(keyword) ||
			log.feed.includes(keyword) ||
			log.cough.includes(keyword);

		const dateMatch =
			selectedDate === "" || logDateToInputDate(log.date) === selectedDate;

		return keywordMatch && dateMatch;
	});

	return (
		<main className="min-h-screen bg-sky-100 p-6 text-gray-900">
			<h1 className="text-3xl font-bold mb-6">過去の記録</h1>

			<div className="bg-white rounded-2xl p-5 shadow mb-5 space-y-3">
				<input
					type="date"
					value={selectedDate}
					onChange={(e) => setSelectedDate(e.target.value)}
					className="w-full p-3 border rounded-xl bg-white text-gray-900"
				/>

				<input
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					className="w-full p-3 border rounded-xl bg-white text-gray-900"
					placeholder="検索：咳・37.5・メモなど"
				/>

				<button
					onClick={() => {
						setKeyword("");
						setSelectedDate("");
					}}
					className="w-full bg-gray-300 text-gray-900 p-3 rounded-xl"
				>
					条件をリセット
				</button>
			</div>

			<div className="space-y-4">
				{filteredLogs.length === 0 ? (
					<div className="bg-white rounded-2xl p-5 shadow">
						該当する記録がありません
					</div>
				) : (
					filteredLogs.map((log) => {
						const originalIndex = logs.indexOf(log);

						return (
							<div
								key={originalIndex}
								className="bg-white rounded-2xl p-5 shadow border-l-8 border-sky-500"
							>
								<p className="text-xl font-bold text-sky-800 mb-4">
									{log.date}
								</p>

								{editIndex === originalIndex ? (
									<>
										<input
											value={log.temp}
											onChange={(e) =>
												updateLog(originalIndex, "temp", e.target.value)
											}
											className="w-full p-3 mb-3 rounded-xl border bg-white text-gray-900"
										/>

										<input
											value={log.feed}
											onChange={(e) =>
												updateLog(originalIndex, "feed", e.target.value)
											}
											className="w-full p-3 mb-3 rounded-xl border bg-white text-gray-900"
										/>

										<textarea
											value={log.memo}
											onChange={(e) =>
												updateLog(originalIndex, "memo", e.target.value)
											}
											className="w-full p-3 mb-3 rounded-xl border bg-white text-gray-900"
										/>

										<button
											onClick={finishEdit}
											className="w-full bg-green-500 text-white p-4 rounded-xl"
										>
											保存
										</button>
									</>
								) : (
									<>
										<div className="space-y-2 text-gray-800">
											<p>🌡️ 体温：{log.temp}℃</p>
											<p>🍼 授乳：{log.feed}回</p>
											<p>😷 咳：{log.cough}</p>
											<p>📝 メモ：{log.memo || "なし"}</p>
										</div>

										<div className="grid grid-cols-2 gap-3 mt-5">
											<button
												onClick={() => setEditIndex(originalIndex)}
												className="bg-blue-500 text-white p-4 rounded-xl"
											>
												編集
											</button>

											<button
												onClick={() => deleteLog(originalIndex)}
												className="bg-red-500 text-white p-4 rounded-xl"
											>
												削除
											</button>
										</div>
									</>
								)}
							</div>
						);
					})
				)}

				<a
					href="/"
					className="block text-center bg-blue-500 text-white p-4 rounded-2xl"
				>
					ホームに戻る
				</a>
			</div>
		</main>
	);
}
