
"use client";

import { useEffect, useState } from "react";

export default function ClothesPage() {
	const [dayTemp, setDayTemp] = useState<number | null>(null);
	const [nightTemp, setNightTemp] = useState<number | null>(null);
	const [status, setStatus] = useState("現在地を取得中...");

	const [roomTemp, setRoomTemp] = useState("");
	const [humidity, setHumidity] = useState("");
	const [ageMonth, setAgeMonth] = useState("4");
	const [condition, setCondition] = useState("普通");

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;

				setStatus("天気を取得中...");

				const res = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=Asia%2FTokyo&forecast_days=1`
				);

				const data = await res.json();

				const times = data.hourly.time;
				const temps = data.hourly.temperature_2m;

				const dayIndex = times.findIndex((time: string) =>
					time.includes("12:00")
				);

				const nightIndex = times.findIndex((time: string) =>
					time.includes("21:00")
				);

				setDayTemp(temps[dayIndex]);
				setNightTemp(temps[nightIndex]);
				setStatus("現在地の天気を表示中");
			},
			() => {
				setStatus("現在地を取得できませんでした");
			}
		);
	}, []);

	function recommendByRoom() {
		const temp = Number(roomTemp);
		const hum = Number(humidity);

		if (!roomTemp) {
			return "室温を入れると、より正確におすすめできます";
		}

		let result = "";

		if (temp >= 27) {
			result = "半袖肌着、または薄手ロンパース。着せすぎ注意";
		} else if (temp >= 24) {
			result = "半袖肌着＋薄手ロンパース";
		} else if (temp >= 21) {
			result = "半袖肌着＋薄手長袖、または薄手スリーパー";
		} else {
			result = "長袖肌着＋長袖ロンパース＋スリーパー";
		}

		if (humidity && hum >= 70) {
			result += "。湿度が高いので、汗・蒸れに注意";
		}

		if (humidity && hum <= 40) {
			result += "。乾燥気味なので、加湿も意識";
		}

		if (condition === "汗あり") {
			result += "。汗があるなら1枚減らすか薄手に変更";
		}

		if (condition === "背中が冷たい") {
			result += "。背中が冷たいなら薄手を1枚追加";
		}

		return result;
	}

	function recommendOutside(temp: number | null) {
		if (temp === null) return "読み込み中...";
		if (temp >= 27) return "外出時は薄着＋日差し対策";
		if (temp >= 24) return "薄手ロンパースでOK";
		if (temp >= 21) return "薄手長袖があると安心";
		return "外出時は羽織りやブランケットも検討";
	}

	return (
		<main className="min-h-screen bg-sky-100 p-6 text-gray-900">
			<h1 className="text-3xl font-bold mb-6">今日の服装おすすめ</h1>

			<div className="bg-white rounded-2xl p-4 shadow mb-4">
				{status}
			</div>

			<div className="space-y-4">
				<div className="bg-white rounded-2xl p-5 shadow">
					<h2 className="font-bold mb-3">部屋の状態</h2>

					<input
						value={roomTemp}
						onChange={(e) => setRoomTemp(e.target.value)}
						className="w-full p-4 border rounded-xl mb-3"
						placeholder="室温 例：24"
					/>

					<input
						value={humidity}
						onChange={(e) => setHumidity(e.target.value)}
						className="w-full p-4 border rounded-xl mb-3"
						placeholder="湿度 例：55"
					/>

					<select
						value={ageMonth}
						onChange={(e) => setAgeMonth(e.target.value)}
						className="w-full p-4 border rounded-xl mb-3"
					>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						<option>6</option>
						<option>7</option>
						<option>8</option>
						<option>9</option>
					</select>

					<select
						value={condition}
						onChange={(e) => setCondition(e.target.value)}
						className="w-full p-4 border rounded-xl"
					>
						<option>普通</option>
						<option>汗あり</option>
						<option>背中が冷たい</option>
					</select>
				</div>

				<div className="bg-orange-100 rounded-2xl p-5 shadow">
					<h2 className="font-bold mb-2">室内のおすすめ</h2>
					<p>{recommendByRoom()}</p>
				</div>

				<div className="bg-white rounded-2xl p-5 shadow">
					<h2 className="text-gray-500">昼の外気温</h2>
					<p className="text-4xl font-bold">
						{dayTemp === null ? "--" : dayTemp}℃
					</p>
					<p className="mt-3">{recommendOutside(dayTemp)}</p>
				</div>

				<div className="bg-white rounded-2xl p-5 shadow">
					<h2 className="text-gray-500">夜の外気温</h2>
					<p className="text-4xl font-bold">
						{nightTemp === null ? "--" : nightTemp}℃
					</p>
					<p className="mt-3">{recommendOutside(nightTemp)}</p>
				</div>

				<div className="bg-yellow-100 rounded-2xl p-5">
					最終判断は、背中の汗・冷え・機嫌・寝つきを見て調整してください。
				</div>

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
