export default function GraphPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#e0f2fe", padding: 20 }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold", color: "#0f172a" }}>
        体温グラフ
      </h1>

      <div style={{ background: "white", padding: 20, borderRadius: 20, marginTop: 20 }}>
        <p style={{ color: "#0f172a" }}>
          グラフ機能は準備中です。次に体温データをグラフ化します。
        </p>
      </div>

      <a href="/">
        <button style={btn}>ホームに戻る</button>
      </a>
    </main>
  );
}

const btn = {
  marginTop: 20,
  width: "100%",
  height: 60,
  borderRadius: 18,
  border: "none",
  background: "#2563eb",
  color: "white",
  fontSize: 18,
};
