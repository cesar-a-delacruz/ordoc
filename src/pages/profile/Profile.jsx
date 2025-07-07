import { useState, useEffect } from "react";
import supabase from "../../apis/supabase";
import "./Profile.css";
import logo from "../../assets/images/user.png";
import CardLayout from "../../layouts/CardLayout";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const user = (await supabase.auth.getUser()).data.user;
      setName(user.user_metadata.display_name);
      setEmail(user.user_metadata.email);
    })();
  }, []);

  return (
    <CardLayout>
      <div className="profile-sidebar">
        <div className="heading-container">
          <h2>Datos Personales</h2>
        </div>
        <div className="avatar-container">
          <div className="avatar">
            <img src={logo} alt="Avatar" />
          </div>
          <h3 className="profile-name">{name}</h3>
          <p className="profile-email">{email}</p>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-value">12</div>
            <div className="stat-label">Documentos</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">4</div>
            <div className="stat-label">Vigentes</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">3</div>
            <div className="stat-label">Expirados</div>
          </div>
        </div>
      </div>
    </CardLayout>
  );
  // return (
  //   <div className="form-container profile">
  //     <div className="form-header">
  //       <h1>Datos Personales</h1>
  //     </div>
  //     <form>
  //       <div className="form-group">
  //         <label htmlFor="name">Nombre Completo:</label>
  //         <input
  //           type="text"
  //           id="name"
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="email">E-mail:</label>
  //         <input
  //           type="email"
  //           id="email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           required
  //         />
  //       </div>

  //       <div className="button-group">
  //         <button>Actualizar</button>
  //       </div>
  //     </form>
  //   </div>
  // );
}

export default Profile;
