export default function HeatMap({ completedDates }) {
  const dateSet = new Set(completedDates);
  const today = new Date();
  const cells = [];

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().split("T")[0];
    cells.push({ date: iso, done: dateSet.has(iso) });
  }

  return (
    <div className="heatmap">
      {cells.map((cell) => (
        <div
          key={cell.date}
          className={`heatmap-cell ${cell.done ? "done" : ""}`}
          title={cell.date}
        />
      ))}
    </div>
  );
}