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
          fontSize: 36,
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
        }}
      >
        <h2>今日の体温</h2>
        <p>36.8℃</p>
      </div>

      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 20,
          marginTop: 20,
        }}
      >
        <h2>授乳回数</h2>
        <p>5回</p>
      </div>

      <a href="/history">
        <button
          style={{
            marginTop: 30,
            width: "100%",
            height: 60,
            background: "#2563eb",
            color: "white",
            borderRadius: 20,
          }}
        >
          過去の記録を見る
        </button>
      </a>
    </main>
  );
}
