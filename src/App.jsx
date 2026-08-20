import { useState } from "react";
import Login from "./Login";
import HabitList from "./HabitList";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="app-container">
      <div className="card">
        {!token ? (
          <Login onLogin={setToken} />
        ) : (
          <>
            <button className="logout-btn" onClick={() => setToken(null)}>
              Logout
            </button>
            <HabitList token={token} />
          </>
        )}
      </div>
    </div>
  );
}