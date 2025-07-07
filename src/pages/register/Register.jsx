import { useState } from "react";
import supabase from "../../apis/supabase";
import "./Register.css";
import FormLayout from "../../layouts/FormLayout";

function Register() {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <FormLayout>
      <div className="form-container">
        <div className="form-header">
          <h2>Crear Cuenta</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre Completo:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="birth">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="birth"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
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
            <button type="submit">Registrar</button>
            <div className="form-link">
              <a href="/login">Cancelar</a>
            </div>
          </div>
        </form>
      </div>
    </FormLayout>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          birth: birth,
        },
      },
    });
  }
}

export default Register;
