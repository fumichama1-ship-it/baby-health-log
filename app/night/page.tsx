export default function NightPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", padding: 20 }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold", color: "white" }}>
        夜モード
      </h1>

      <button style={nightBtn}>咳した</button>
      <button style={nightBtn}>起きた</button>
      <button style={nightBtn}>授乳した</button>

      <a href="/">
        <button style={homeBtn}>ホームに戻る</button>
      </a>
    </main>
  );
}

const nightBtn = {
  marginTop: 20,
  width: "100%",
  height: 80,
  borderRadius: 20,
  border: "none",
  background: "#2563eb",
  color: "white",
  fontSize: 24,
  fontWeight: "bold",
};

const homeBtn = {
  marginTop: 20,
  width: "100%",
  height: 60,
  borderRadius: 18,
  border: "none",
  background: "white",
  color: "#0f172a",
  fontSize: 18,
};
