"use client";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#e0f2fe",
        padding: 20,
      }}
    >
      <h1
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color: "#0f172a",
        }}
      >
        Baby Health Log
      </h1>

      {[
        ["今日の体温", "36.8℃"],
        ["授乳回数", "5回"],
        ["昼の服装", "半袖＋薄手おくるみ"],
        ["夜の服装", "長袖＋スリーパー"],
      ].map((x) => (
        <div
          key={x[0]}
          style={{
            background: "white",
            padding: 20,
            marginTop: 20,
            borderRadius: 20,
            color: "#0f172a",
          }}
        >
          <h2>{x[0]}</h2>
          <h1>{x[1]}</h1>
        </div>
      ))}

      <div
        style={{
          marginTop: 20,
          display: "grid",
          gap: 14,
        }}
      >
        <a href="/record">
          <button style={btn}>
            記録する
          </button>
        </a>

        <a href="/history">
          <button style={btn}>
            過去の記録
          </button>
        </a>

        <a href="/graph">
          <button style={btn}>
            グラフ
          </button>
        </a>

        <a href="/clothes">
          <button style={btn}>
            服装提案
          </button>
        </a>

        <a href="/night">
          <button style={btn}>
            夜モード
          </button>
        </a>
      </div>
    </main>
  );
}

const btn = {
  width: "100%",
  height: 60,
  borderRadius: 18,
  border: "none",
  background: "#2563eb",
  color: "white",
  fontSize: 18,
};
