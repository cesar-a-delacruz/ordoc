import { useState } from "react";
import supabase from "../../apis/supabase";
import "./Login.css";
import FormLayout from "../../layouts/FormLayout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <FormLayout>
      <div className="form-container">
        <div className="form-header">
          <h2>Iniciar Sesión</h2>
          <a href="/register" className="register-link">
            ¿No tienes una Cuenta? Regístrate aquí
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

          <p id="validation"></p>
          <div className="button-group">
            <button type="submit">Ingresar</button>
          </div>
        </form>
      </div>
    </FormLayout>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    const validation = document.getElementById("validation");

    if (credentials.error) {
      validation.style.display = "block";
      validation.innerHTML = "Las credenciales son incorrectas";
      validation.style.color = "#880000";
      validation.style.backgroundColor = "#e68f8f";
    } else {
      location.replace("/documents");
    }
  }
}

export default Login;
