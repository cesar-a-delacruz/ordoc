import { useState } from "react";
import supabase from "../../apis/supabase";
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
            class="input-field" 
            placeholder="Ingresa Email" 
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
            class="input-field" 
            placeholder="Ingresa tu Contraseña"
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
    await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }
}

export default Login;
