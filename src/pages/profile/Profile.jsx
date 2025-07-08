import { useState, useEffect } from "react";
import supabase from "../../apis/supabase";
import "./Profile.css";
import logo from "../../assets/images/user.png";
import CardLayout from "../../layouts/CardLayout";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [documentsStat, setDocumentsStat] = useState({
    total: null,
    current: null,
    expired: null,
  });

  useEffect(() => {
    (async () => {
      const user = (await supabase.auth.getUser()).data.user;
      setName(user.user_metadata.display_name);
      setEmail(user.user_metadata.email);

      const documentCount = (
        await supabase
          .from("documents")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
      ).count;
      const currentDate = new Date().toDateString();
      const documentCurrentCount = (
        await supabase
          .from("documents")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gt("expiration", currentDate)
      ).count;
      const documentExpiredCount = (
        await supabase
          .from("documents")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .lt("expiration", currentDate)
      ).count;
      setDocumentsStat({
        total: documentCount,
        current: documentCurrentCount,
        expired: documentExpiredCount,
      });
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
        </div>
      </div>
    </CardLayout>
  );
}

export default Profile;
