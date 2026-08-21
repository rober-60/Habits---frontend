import { useState } from "react";
import { login, register } from "./api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      if (isRegistering) {
        await register(email, password);
      }
      const data = await login(email, password);
      onLogin(data.access_token);
    } catch (err) {
      setError(isRegistering ? "Registration or login failed" : "Wrong email or password");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      {error && <p className="error-text">{error}</p>}
      <button
        type="button"
        className="link-button"
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering ? "Already have an account? Login" : "Register"}
      </button>
    </form>
  );
}