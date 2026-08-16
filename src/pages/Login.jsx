import { useState } from "react";
import { loginUser } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setMessage("");

    try {
      await loginUser(email, password);
      setMessage("Login successful!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main>
      <h1>HodoDigiCard</h1>
      <p>Digital Identity in a Tap.</p>

      <h2>Welcome back</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Your password"
            required
          />
        </div>

        <br />

        <button type="submit">
          Sign In
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}

export default Login;