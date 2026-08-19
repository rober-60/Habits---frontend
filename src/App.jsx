import { useState } from "react";
import Login from "./Login";
import HabitList from "./HabitList";

export default function App() {
  const [token, setToken] = useState(null);

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return (
    <div>
      <button onClick={() => setToken(null)}>Logout</button>
      <HabitList token={token} />
    </div>
  );
}