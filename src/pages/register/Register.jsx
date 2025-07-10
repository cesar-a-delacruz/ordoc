import { useState } from "react";
import supabase from "../../apis/supabase";
import "./Register.css";
import FormLayout from "../../layouts/FormLayout";

function Register() {
  if (localStorage.getItem("logged") === "yes") location.replace("/documents");
  document.title = "Ordoc: Crear Cuenta";
  const [name, setName] = useState("");
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
              placeholder="John Smith"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="john.smith@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirm"
              onChange={(e) => validatePassword(e)}
              required
            />
          </div>

          <p id="validation"></p>
          <div className="button-group">
            <button type="submit">Registrar</button>
            <div
              className="form-link"
              onClick={() => (location.href = "/login")}
            >
              Cancelar
            </div>
          </div>
        </form>
      </div>
    </FormLayout>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const signup = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: name,
        },
      },
    });
    if (signup.error) alert(signup.error);
    location.replace("/login");
  }
  function validatePassword(e) {
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm");
    const validation = document.getElementById("validation");

    if (confirm.value === password.value) {
      setPassword(e.target.value);
      validation.innerHTML = "Las contraseñas coinciden";
      validation.style.color = "#008812";
      validation.style.backgroundColor = "#8fe695";
    } else {
      setPassword("");
      validation.innerHTML = "Las contraseñas no coinciden";
      validation.style.color = "#880000";
      validation.style.backgroundColor = "#e68f8f";
    }
  }
}

export default Register;
