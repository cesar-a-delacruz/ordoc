import { useState } from "react";
import { useLocation } from "react-router-dom";
import CardLayout from "../../layouts/CardLayout";
import "./Document.css";

function Documents() {
  const [doc, setDoc] = useState(useLocation().state);
  const [editMode, setEditMode] = useState(false);

  return (
    <CardLayout>
      <div className="document">
        <img src={doc.url} alt={doc.name} className="card-image" />
        <form>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" value={doc.name} disabled />
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
                  formEdit(false);
                }}
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
        {!editMode && (
          <div className="button-group">
            <button onClick={() => formEdit(true)}>Editar</button>
            <button>Eliminar</button>
          </div>
        )}
      </div>
    </CardLayout>
  );
  function formEdit(edit) {
    setEditMode(edit);
    const formFields = document.querySelectorAll("div.document input, select");
    for (const field of formFields) {
      field.disabled = !edit;
    }
  }
}

export default Documents;
