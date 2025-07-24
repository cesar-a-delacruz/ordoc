import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../../apis/supabase";
import CardLayout from "../../layouts/CardLayout";
import "./Document.css";

function Document() {
  if (!useLocation().state) location.replace("/documents");
  const [doc, setDoc] = useState(useLocation().state);
  const [editMode, setEditMode] = useState({ mode: false, prev: null });
  document.title = `Ordoc: ${doc.name}`;

  return (
    <CardLayout>
      <div className="document">
        <form onSubmit={updateDoc}>
          <div className="form-group">
            <img src={doc.url} alt="Preview" className="preview" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={doc.name}
              onChange={(e) => setDoc({ ...doc, name: e.target.value })}
              disabled
              title="Solo permite letras, números y espacios"
              pattern="[a-zA-Z0-9 ]+$"
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Tipo de documento:</label>
            <select
              id="type"
              value={doc.type}
              onChange={(e) => setDoc({ ...doc, type: e.target.value })}
              disabled
            >
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
              value={doc.expedition}
              onChange={(e) =>
                setDoc({
                  ...doc,
                  expedition: e.target.value === "" ? null : e.target.value,
                })
              }
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiration">Vencimiento:</label>
            <input
              type="date"
              id="expiration"
              value={doc.expiration}
              onChange={(e) =>
                setDoc({
                  ...doc,
                  expiration: e.target.value === "" ? null : e.target.value,
                })
              }
              disabled
            />
          </div>
          {editMode.mode && (
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
        {!editMode.mode && (
          <div className="button-group">
            <button onClick={() => editDoc(true)}>Editar</button>
            <button onClick={() => deleteDoc()}>Eliminar</button>
          </div>
        )}
      </div>
    </CardLayout>
  );

  function editDoc(edit) {
    const formFields = document.querySelectorAll(
      "div.document input, div.document select",
    );
    const prev = {};

    if (edit === true) {
      for (const field of formFields) {
        field.disabled = false;
        Object.defineProperty(prev, field.id, {
          value: field.value,
          enumerable: true,
        });
      }
      setEditMode({ mode: edit, prev: prev });
    } else {
      for (const field of formFields) {
        field.disabled = true;
      }

      setDoc({ ...editMode.prev, url: doc.url });
      setEditMode({ ...editMode, mode: edit });
    }
  }
  async function updateDoc(e) {
    e.preventDefault();
    const user = (await supabase.auth.getSession()).data.session.user;
    const extension = doc.url.substring(doc.url.lastIndexOf(".")).toLowerCase();
    const newFileName = doc.name.replaceAll(" ", "-") + extension;
    const newFilePath = `${user.id}/${newFileName}`;

    const fileRename = await supabase.storage
      .from("documents")
      .move(
        `${user.id}/${doc.url.substring(doc.url.lastIndexOf("/") + 1)}`,
        `${newFilePath}`,
      );
    if (fileRename.error) alert(fileRename.error.message);

    const baseURL = doc.url.substring(0, doc.url.lastIndexOf("/") + 1);
    const docUpdate = await supabase
      .from("documents")
      .update({
        name: doc.name,
        expedition: doc.expedition,
        expiration: doc.expiration,
        url: baseURL + newFileName,
      })
      .eq("id", doc.id);
    if (docUpdate.error) alert(docUpdate.error.message);

    localStorage.setItem("docsChanged", "changed");
    location.replace("/documents");
  }
  async function deleteDoc() {
    const user = (await supabase.auth.getSession()).data.session.user;
    const fileName = doc.name.replaceAll(" ", "-");
    const fileExtension = doc.url
      .substring(doc.url.lastIndexOf("."))
      .toLowerCase();
    const fileBucketPath = `${user.id}/${fileName}${fileExtension}`;

    const docRemove = await supabase.storage
      .from("documents")
      .remove([fileBucketPath]);
    if (docRemove.error) alert(docRemove.error.message);
    const docDelete = await supabase
      .from("documents")
      .delete()
      .eq("id", doc.id);
    if (docDelete.error) alert(docDelete.error.message);

    localStorage.setItem("docsChanged", "changed");
    location.replace("/documents");
  }
}

export default Document;
