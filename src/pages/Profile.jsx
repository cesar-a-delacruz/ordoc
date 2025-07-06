import { useState, useEffect } from "react";
import client from "../supabase/client";
import "../styles/Profile.css";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    birth: "",
    email: "",
    address: "",
    bio: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [activeTab, setActiveTab] = useState("personal");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = (await client.auth.getUser()).data.user;
        const profileData = (
          await client.from("profiles").select("*").eq("id", user.id)
        ).data[0];

        if (profileData) {
          setProfile({
            name: profileData.name || "",
            birth: profileData.birth || "",
            email: user.email || "",
            address: profileData.address || "",
            bio: profileData.bio || ""
          });
          setAvatarUrl(profileData.avatar_url || "");
          setNotifications(profileData.notifications || {
            email: true,
            push: true
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const user = (await client.auth.getUser()).data.user;
      await client.from("profiles").update({ 
        name: profile.name,
        birth: profile.birth,
        address: profile.address,
        bio: profile.bio,
        notifications
      }).eq("id", user.id);
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const user = (await client.auth.getUser()).data.user;
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await client.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = await client.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);

      // Guardar en el perfil
      await client.from("profiles").update({ avatar_url: publicUrl }).eq("id", user.id);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Mi Perfil</h1>
        <p>Administra tu información personal y preferencias</p>
      </div>
      
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="avatar-container">
            <div className="avatar">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" />
              ) : (
                <div className="avatar-initial">{profile.name.charAt(0)}</div>
              )}
              {isEditing && (
                <label className="avatar-upload">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleAvatarUpload} 
                  />
                  <span>📷 Cambiar</span>
                </label>
              )}
            </div>
            <h2 className="profile-name">{profile.name}</h2>
            <p className="profile-email">{profile.email}</p>
          </div>
          
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">Pedidos</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">4.8</div>
              <div className="stat-label">Valoración</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">3</div>
              <div className="stat-label">Favoritos</div>
            </div>
          </div>
          
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              Información Personal
            </button>
            <button 
              className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notificaciones
            </button>
            <button 
              className={`tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Seguridad
            </button>
          </div>
        </div>
        
        <div className="profile-main">
          {activeTab === 'personal' && (
            <div className="tab-content">
              <h3>Información Personal</h3>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha de Nacimiento</label>
                  <input
                    type="date"
                    name="birth"
                    value={profile.birth}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="form-group">
                <label>Biografía</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="4"
                />
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="tab-content">
              <h3>Preferencias de Notificación</h3>
              <p>Selecciona cómo prefieres recibir las notificaciones</p>
              
              <div className="notification-preferences">
                <div className="notification-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                    <span className="custom-checkbox"></span>
                    Notificaciones por Email
                  </label>
                  <p className="notification-desc">Recibirás notificaciones importantes a tu correo electrónico</p>
                </div>
                
                <div className="notification-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={() => handleNotificationChange('sms')}
                    />
                  </label>
                </div>
                
                <div className="notification-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={() => handleNotificationChange('push')}
                    />
                    <span className="custom-checkbox"></span>
                    Notificaciones Push
                  </label>
                  <p className="notification-desc">Recibirás notificaciones en tiempo real en tu dispositivo</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="tab-content">
              <h3>Seguridad de la Cuenta</h3>
              
              <div className="security-item">
                <h4>Cambiar Contraseña</h4>
                <p>Actualiza tu contraseña regularmente para mantener tu cuenta segura</p>
                <button className="change-password-btn">Cambiar Contraseña</button>
              </div>
              
              <div className="security-item">
                <h4>Verificación en Dos Pasos</h4>
                <p>Añade una capa extra de seguridad a tu cuenta</p>
                <div className="toggle-switch">
                  <label>
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                  <span>Activada</span>
                </div>
              </div>
              
              <div className="security-item">
                <h4>Sesiones Activas</h4>
                <p>Revisa los dispositivos donde has iniciado sesión</p>
                <button className="view-sessions-btn">Ver Sesiones</button>
              </div>
            </div>
          )}
          
          <div className="profile-actions">
            {!isEditing ? (
              <button className="edit-btn" onClick={handleEdit}>
                <i className="icon">✏️</i> Editar Perfil
              </button>
            ) : (
              <>
                <button className="save-btn" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <span className="spinner"></span>
                  ) : (
                    <>
                      <i className="icon">💾</i> Guardar Cambios
                    </>
                  )}
                </button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  <i className="icon">↩️</i> Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
