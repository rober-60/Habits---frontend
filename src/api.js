const API_URL = "http://localhost:8000";

export async function register(email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function login(email, password) {
  const body = new URLSearchParams();
  body.append("username", email);
  body.append("password", password);

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function getHabits(token) {
  const res = await fetch(`${API_URL}/habits/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createHabit(token, name, frequency) {
  const res = await fetch(`${API_URL}/habits/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, frequency }),
  });
  return res.json();
}

export async function logHabit(token, habitId) {
  const res = await fetch(`${API_URL}/habits/${habitId}/log`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getHabitStats(token, habitId) {
  const res = await fetch(`${API_URL}/habits/${habitId}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function deleteHabit(token, habitId) {
    const res = await fetch(`${API_URL}/habits/${habitId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}