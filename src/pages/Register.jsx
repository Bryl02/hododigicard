import { useState } from "react";
import { registerUser } from "../services/auth";
import { createUserProfile } from "../services/userService";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(event) {
    event.preventDefault();
    setMessage("");

    try {
      setMessage("Creating account...");

      const userCredential = await registerUser(email, password);

      console.log(
        "Authentication successful:",
        userCredential.user.uid
      );

      setMessage("Account created. Creating profile...");

      await createUserProfile(userCredential.user);

      console.log("Firestore profile created successfully.");

      setMessage("Account and profile created successfully!");
    } catch (error) {
      console.error("Registration error:", error);

      setMessage(
        `Registration error: ${error.code || error.message}`
      );
    }
  }

  return (
    <main>
      <h1>HodoDigiCard</h1>

      <p>Digital Identity in a Tap.</p>

      <h2>Create your account</h2>

      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
            required
          />
        </div>

        <br />

        <button type="submit">
          Create Account
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}

export default Register;