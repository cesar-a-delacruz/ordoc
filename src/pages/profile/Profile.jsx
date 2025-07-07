import { useState, useEffect } from "react";
import supabase from "../../apis/supabase";
import "./Profile.css";

function Profile() {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      // const user = (await supabase.auth.getUser()).data.user;
      // const profile = (
      //   await supabase.from("profiles").select("name, birth").eq("id", user.id)
      // ).data[0];
      // setName(profile.name);
      // setBirth(profile.birth);
      // setEmail(user.email);
    })();
  }, []);

  return (
    <div className="form-container profile">
      <div className="form-header">
        <h1>Datos Personales</h1>
      </div>
      <form>
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

        <div className="button-group">
          <button>Actualizar</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
