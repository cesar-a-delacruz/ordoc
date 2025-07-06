import { useState } from "react";
import client from "../supabase/client";
import "../styles/Login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await client.auth.signInWithPassword({
      email: email,
      password: password,
    });
  };

  return (
       <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
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

        <div className="remember-group">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember">Mantener Sesión</label>
        </div>

        <button type="submit" className="login-button">Acceder</button>

        <div className="Register-link">
          ¿Es tu primera vez? <a href="/register">Regístrate</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
