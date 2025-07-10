import { useState } from "react";
import supabase from "../../apis/supabase";
import google from "../../apis/google";
import "./Upload.css";
import CardLayout from "../../layouts/CardLayout";

function Upload() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [expedition, setExpedition] = useState("");
  const [expiration, setExpiration] = useState("");
  const [preview, setPreview] = useState(null);

  return (
    <CardLayout>
      <div className="form-container">
        <div className="form-header">
          <h2>Subir Documento</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="file">Documento:</label>
            <input
              type="file"
              id="file"
              onChange={(e) => fillInputs(e)}
              required
              accept=".jpg,.png,"
            />
            {preview && <img src={preview} alt="Preview" className="preview" />}
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              title="Solo permite letras, números y espacios"
              pattern="[a-zA-Z0-9 ]+$"
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Tipo:</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">-- Selecciona el tipo de documento --</option>
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
              value={expedition}
              onChange={(e) => setExpedition(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiration">Vencimiento:</label>
            <input
              type="date"
              id="expiration"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </CardLayout>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const user = (await supabase.auth.getUser()).data.user;
    const file = document.getElementById("file").files[0];
    const fileExtension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();
    const fileBucketPath =
      `${user.id.toString()}/${name.replaceAll(" ", "-")}` + fileExtension;

    await supabase.storage.from("documents").upload(fileBucketPath, file);
    await supabase.from("documents").insert({
      name: name + fileExtension,
      type: type,
      expedition: expedition,
      expiration: expiration,
      url: supabase.storage.from("documents").getPublicUrl(fileBucketPath).data
        .publicUrl,
    });
    
    localStorage.setItem("docsChanged", "changed");
    location.replace("/documents");
  }
  async function fillInputs(e) {
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);
    const uploadedFile = await google.ai.files.upload({
      file: file,
    });

    const response = await google.ai.models.generateContent({
      model: google.model,
      contents: google.promptWithFile(uploadedFile),
    });
    const parsedResponse = response.text.split(",");

    for (let i = 0; i < parsedResponse.length; i++) {
      if (i === 0) {
        parsedResponse[i] = parsedResponse[i]
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/ñ/g, "n")
          .replace(/Ñ/g, "N");
      } else if (i > 1) {
        parsedResponse[i] = Date.parse(parsedResponse[i])
          ? parsedResponse[i]
          : null;
      }
    }

    setName(parsedResponse[0]);
    setType(parsedResponse[1]);
    setExpedition(parsedResponse[2]);
    setExpiration(parsedResponse[3]);
  }
}

export default Upload;
