import { useState } from "react";
import supabase from "../../apis/supabase";
import "./Upload.css";

function Upload() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [expedition, setExpedition] = useState("");
  const [expiration, setExpiration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = (await supabase.auth.getUser()).data.user;
    const file = document.getElementById("file").files[0];
    const fileBucketPath =
      `${user.id.toString()}/${name.replaceAll(" ", "-")}` +
      file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();

    await supabase.storage.from("documents").upload(fileBucketPath, file);
    await supabase.from("documents").insert({
      name: name,
      type: type,
      expedition: expedition,
      expiration: expiration,
      url: supabase.storage.from("documents").getPublicUrl(fileBucketPath).data
        .publicUrl,
    });
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Subir Documento</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file">Documento:</label>
          <input type="file" id="file" required accept=".jpg,.png,.pdf," />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo:</label>
          <select id="type" onChange={(e) => setType(e.target.value)}>
            <option value="">-- Selecciona una opción --</option>
            <option value="Certificado">Certificado</option>
            <option value="Licencia">Licencia</option>
            <option value="Identificación">Identificación</option>
            <option value="Contrato">Contrato</option>
            <option value="Factura">Factura</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="expedition">Expedición:</label>
          <input
            type="date"
            id="expedition"
            onChange={(e) => setExpedition(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiration">Vencimiento:</label>
          <input
            type="date"
            id="expiration"
            onChange={(e) => setExpiration(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
