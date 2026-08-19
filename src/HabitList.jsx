import { useState, useEffect } from "react";
import { getHabits, createHabit, logHabit, getHabitStats } from "./api";

export default function HabitList({ token }) {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    const data = await getHabits(token);
    setHabits(data);
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

  return (
    <div>
      <h2>Your Habits</h2>
      <form onSubmit={handleCreate}>
        <input
          placeholder="New habit name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.name} ({habit.frequency})
            <button onClick={() => handleLog(habit.id)}>Mark done today</button>
            {stats[habit.id] && (
              <span>
                {" "}
                🔥 Streak: {stats[habit.id].current_streak} | Week:{" "}
                {(stats[habit.id].completion_rate_week * 100).toFixed(0)}%
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}