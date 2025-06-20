import { useState } from "react";
import client from "../supabase/client";

function Register() {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await client.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          birth: birth,
        },
      },
    });
  };

  return (
    <div>
      <h2>Nueva Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre Completo:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />
        <label htmlFor="birth">Fecha de Nacimiento:</label>
        <input
          type="date"
          id="birth"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          required
        />
        <br />
        <br />
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
