import { useState } from "react";
import client from "../../supabase/client";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Iniciar Sesión</h1>
        <a href="/register" class="register-link">
          ¿Es tu primera vez? Regístrate
        </a>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit">Ingresar</button>
        </div>
      </form>
    </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await client.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }
}

export default Login;
