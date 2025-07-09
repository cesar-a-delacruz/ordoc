import { useState } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../../apis/supabase";
import CardLayout from "../../layouts/CardLayout";
import "./Document.css";

function Documents() {
  const [doc, setDoc] = useState(useLocation().state);
  const [editMode, setEditMode] = useState(false);

  return (
    <CardLayout>
      <div className="document">
        <form>
          <div className="form-group">
            <img src={doc.url} alt="Preview" className="preview" />
            {editMode && (
              <input
                type="file"
                id="file"
                onChange={(e) => fillInputs(e)}
                accept=".jpg,.png,"
              />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={doc.name.substring(0, doc.name.lastIndexOf("."))}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Tipo de documento:</label>
            <select id="type" value={doc.type} disabled>
              <option value="Certificado">Certificado</option>
              <option value="Licencia">Licencia</option>
              <option value="Identificación">Identificación</option>
              <option value="Contrato">Contrato</option>
              <option value="Factura">Factura</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          {doc.expedition && (
            <div className="form-group">
              <label htmlFor="expedition">Expedición:</label>
              <input
                type="date"
                id="expedition"
                value={doc.expedition}
                disabled
              />
            </div>
          )}
          {doc.expiration && (
            <div className="form-group">
              <label htmlFor="expiration">Vencimiento:</label>
              <input
                type="date"
                id="expiration"
                value={doc.expiration}
                disabled
              />
            </div>
          )}
          {editMode && (
            <div className="button-group">
              <button type="submit">Guardar</button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editDoc(false);
                }}
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
        {!editMode && (
          <div className="button-group">
            <button onClick={() => editDoc(true)}>Editar</button>
            <button onClick={() => deleteDoc()}>Eliminar</button>
          </div>
        )}
      </div>
    </CardLayout>
  );
  function editDoc(edit) {
    setEditMode(edit);
    const formFields = document.querySelectorAll("div.document input, select");
    for (const field of formFields) {
      field.disabled = !edit;
    }
  }
  async function deleteDoc() {
    const user = (await supabase.auth.getUser()).data.user;
    const fileBucketPath = `${user.id.toString()}/${doc.name.replaceAll(" ", "-")}`;

    await supabase.storage.from("documents").remove([fileBucketPath]);
    await supabase.from("documents").delete().eq("id", doc.id);
    localStorage.setItem(
      "newLength",
      (parseInt(localStorage.getItem("newLength")) - 1).toString(),
    );

    location.replace("/documents");
  }
}

export default Documents;
