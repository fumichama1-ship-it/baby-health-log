export default function Home() {
  const btn = {
    width: "100%",
    height: 60,
    borderRadius: 18,
    border: "none",
    background: "#2563eb",
    color: "white",
    fontSize: 18,
    marginTop: 14,
  };

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
          fontSize: 42,
          fontWeight: "bold",
          color: "#0f172a",
        }}
      >
        Baby Health Log
      </h1>

      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 20,
          marginTop: 20,
          color: "#0f172a",
        }}
      >
        <h2>今日の体温</h2>
        <h1>36.8℃</h1>
      </div>

      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 20,
          marginTop: 20,
          color: "#0f172a",
        }}
      >
        <h2>授乳回数</h2>
        <h1>5回</h1>
      </div>

      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 20,
          marginTop: 20,
          color: "#0f172a",
        }}
      >
        <h2>今日の服装</h2>
        <p>昼：半袖＋薄手おくるみ</p>
        <p>夜：長袖＋スリーパー</p>
      </div>

      <a href="/record">
        <button style={btn}>記録する</button>
      </a>

      <a href="/history">
        <button style={btn}>過去の記録</button>
      </a>

      <a href="/graph">
        <button style={btn}>グラフ</button>
      </a>

      <a href="/clothes">
        <button style={btn}>服装提案</button>
      </a>

      <a href="/night">
        <button style={btn}>夜モード</button>
      </a>
    </main>
  );
}
