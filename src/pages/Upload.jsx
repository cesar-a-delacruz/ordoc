import { useState } from "react";
import client from "../supabase/client";

function Upload() {
  const [name, setName] = useState("");
  const [expedition, setExpedition] = useState("");
  const [expiration, setExpiration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = (await client.auth.getUser()).data.user;
    const file = document.getElementById("file").files[0];
    const fileBucketPath = `${user.id.toString()}/${name.replaceAll(" ", "-")}
      .${file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase()}`;

    await client.storage.from("documents").upload(fileBucketPath, file);
    await client.from("documents").insert({
      name: name,
      expedition: expedition,
      expiration: expiration,
      url: client.storage.from("documents").getPublicUrl(fileBucketPath).data
        .publicUrl,
    });
  };

  return (
    <div>
      <h2>Subir Documento</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />
        <label htmlFor="file">Documento:</label>
        <input type="file" id="file" required accept=".jpg,.png,.pdf," />
        <br />
        <br />
        <label htmlFor="expedition">Expedición:</label>
        <input
          type="date"
          id="expedition"
          onChange={(e) => setExpedition(e.target.value)}
          required
        />
        <br />
        <br />
        <label htmlFor="expiration">Vencimiento:</label>
        <input
          type="date"
          id="expiration"
          onChange={(e) => setExpiration(e.target.value)}
          required
        />
        <br />
        <br />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default Upload;
