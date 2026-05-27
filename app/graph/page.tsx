export default function GraphPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#e0f2fe", padding: 20 }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold", color: "#0f172a" }}>
        体温グラフ
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
        <p>グラフ機能は準備中です。</p>
        <p>次にrechartsを追加して体温推移を表示します。</p>
      </div>

      <a href="/">
        <button
          style={{
            marginTop: 20,
            width: "100%",
            height: 60,
            borderRadius: 18,
            border: "none",
            background: "#2563eb",
            color: "white",
            fontSize: 18,
          }}
        >
          ホームに戻る
        </button>
      </a>
    </main>
  );
}
