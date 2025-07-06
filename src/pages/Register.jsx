import { useState } from "react";
import client from "../supabase/client";
import "../styles/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [passwordError, setPasswordError] = useState("");

   const validatePassword = (pass) => {
    if (pass.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
    if (!/\d/.test(pass)) {
      return "La contraseña debe incluir al menos un número";
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) {
      return "La contraseña debe incluir al menos un símbolo";
    }
    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }
    
    if (!privacyAccepted) {
      setPasswordError("Debes aceptar la política de privacidad");
      return;
    }
    
    setPasswordError("");

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
     <div className="register-container">
      <h2>Nueva Cuenta</h2>
      <p className="subtitle">Completa el formulario para crear tu cuenta</p>
      
      <form onSubmit={handleSubmit} className="register-form">
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
          <div className="password-requirements">
            <p>Mínimo 8 caracteres, incluir números y símbolos</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="privacy-box">
          <input
            type="checkbox"
            id="privacy"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
          />
          <label htmlFor="privacy">
            Acepto que mis datos personales se utilizarán para procesar mi pedido, 
            mejorar mi experiencia en esta web, gestionar el acceso a mi cuenta y 
            otros propósitos descritos en nuestra política de privacidad.
          </label>
        </div>

        {passwordError && <div className="error-message">{passwordError}</div>}

        <div className="button-group">
          <button type="submit" className="register-button">Registrar</button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => window.history.back()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
