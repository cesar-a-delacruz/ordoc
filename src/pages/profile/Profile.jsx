import { useState, useEffect } from "react";
import supabase from "../../apis/supabase";
import "./Profile.css";
import logo from "../../assets/images/user.png";
import CardLayout from "../../layouts/CardLayout";

function Profile() {
  if (localStorage.getItem("logged") !== "yes") location.replace("/login");
  document.title = "Ordoc: Perfil";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [documentsStat, setDocumentsStat] = useState({
    total: null,
    current: null,
    expired: null,
    permanent: null,
  });

  useEffect(() => {
    (async () => {
      const user = (await supabase.auth.getUser()).data.user;
      setName(user.user_metadata.display_name);
      setEmail(user.user_metadata.email);
      document.getElementById("loading").style.display = "none";

      const documentsExpiration = await supabase
        .from("documents")
        .select("expiration")
        .eq("user_id", user.id);
      if (documentsExpiration.error) alert(documentsExpiration.error);
      const currentDate = Date.parse(new Date().toDateString());

      const total = documentsExpiration.data.length;
      const current = documentsExpiration.data.filter(
        (value) => Date.parse(value.expiration) > currentDate,
      ).length;
      const expired = documentsExpiration.data.filter(
        (value) => Date.parse(value.expiration) <= currentDate,
      ).length;
      const permanent = documentsExpiration.data.filter(
        (value) => value.expiration === null,
      ).length;

      setDocumentsStat({
        total: total,
        current: current,
        expired: expired,
        permanent: permanent,
      });
    })();
  }, []);

  return (
    <CardLayout>
      <div className="profile-container">
        <div className="heading-container">
          <h2>Datos Personales</h2>
        </div>
        <div className="avatar-container">
          <div className="avatar">
            <img src={logo} alt="Avatar" />
          </div>
          <p id="loading">Cargando...</p>
          {email && (
            <>
              <h3 className="profile-name">{name}</h3>
              <p className="profile-email">{email}</p>
            </>
          )}
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-value">{documentsStat.total}</div>
            <div className="stat-label">Documentos</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{documentsStat.current}</div>
            <div className="stat-label">Vigentes</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{documentsStat.expired}</div>
            <div className="stat-label">Expirados</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{documentsStat.permanent}</div>
            <div className="stat-label">Permanetes</div>
          </div>
        </div>
      </div>
    </CardLayout>
  );
}

export default Profile;
