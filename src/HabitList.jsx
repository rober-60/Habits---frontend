import { useState, useEffect } from "react";
import { getHabits, createHabit, logHabit, getHabitStats, deleteHabit, updateHabit } from "./api";

export default function HabitList({ token }) {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");
  const [stats, setStats] = useState({});
  const [editingHabit, setEditingHabit] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    const data = await getHabits(token);
    setHabits(data);

    const statsEntries = await Promise.all(
      data.map(async (habit) => {
        const s = await getHabitStats(token, habit.id);
        return [habit.id, s];
      })
    );
    setStats(Object.fromEntries(statsEntries));
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!name.trim()) return;
    await createHabit(token, name, "daily");
    setName("");
    loadHabits();
  }

  async function handleLog(habitId) {
    await logHabit(token, habitId);
    const s = await getHabitStats(token, habitId);
    setStats((prev) => ({ ...prev, [habitId]: s }));
  }

  async function handleDelete(habitId) {
    await deleteHabit(token, habitId);
    loadHabits();
  }

  async function changeFrequency(habit) {
    const newFrequency = habit.frequency === "daily" ? "weekly" : "daily";
    await updateHabit(token, habit.id, { frequency: newFrequency });
    loadHabits();
  }

  async function handleSaveEdit(e) {
    e.preventDefault();
    if (!editName.trim() || !editingHabit) return;
    await updateHabit(token, editingHabit.id, { name: editName });
    setEditingHabit(null);
    loadHabits();
  }

  return (
    <div>
      <h2>Your Habits</h2>
      <form className="add-habit-form" onSubmit={handleCreate}>
        <input
          placeholder="New habit name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="habit-list">
        {habits.map((habit) => (
          <li className="habit-item" key={habit.id}>
            <div className="habit-name">
              {habit.name} <span className="habit-frequency">({habit.frequency})</span>
            </div>
            <div className="habit-actions">
              <button onClick={() => handleLog(habit.id)}>Mark done today</button>
              {stats[habit.id] && (
                <span className="habit-stats">
                  🔥 {stats[habit.id].current_streak} | {(stats[habit.id].completion_rate_week * 100).toFixed(0)}%
                </span>
              )}
              <button onClick={() => {
                setEditingHabit(habit);
                setEditName(habit.name);
              }}>
                Edit
              </button>
              <button onClick={() => handleDelete(habit.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingHabit && (
        <div style={{ marginTop: "20px" }}>
          <h2>Edit Habit</h2>
          <form 
            className="add-habit-form" 
            onSubmit={handleSaveEdit}
            style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}
          >
            <input
              placeholder="Edit habit name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{ width: "100%", maxWidth: "300px" }}
            />
            
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button type="button" onClick={() => changeFrequency(editingHabit)}>
                Switch to {editingHabit.frequency === "daily" ? "weekly" : "daily"}
              </button>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingHabit(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}