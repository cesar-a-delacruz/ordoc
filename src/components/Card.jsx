import { Link } from "react-router-dom";
import supabase from "../apis/supabase";
import "./Card.css";
function Card(props) {
  const { id, name, type, expedition, url } = props;
  return (
    <div className="card">
      <img
        src={url}
        alt={name.substring(0, name.lastIndexOf("."))}
        className="card-image"
      />
      <h3>{name.substring(0, name.lastIndexOf("."))}</h3>
      <p className="type">{type}</p>
      {expedition && (
        <p className="date">
          <span>{expedition.substring(0, 4)}</span>
          {` (${new Date(expedition).toLocaleDateString("es-ES", { month: "long" })})`}
        </p>
      )}
      <div className="button-group">
        <Link to={"/document"} state={{ ...props }}>
          Ver Detalles
        </Link>
        <button
          className="download"
          onClick={async (e) => {
            e.preventDefault();
            const response = await fetch(url);
            const blob = await response.blob();

            const element = document.createElement("a");
            element.href = URL.createObjectURL(blob);
            element.download = name;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }}
        >
          Descargar
        </button>
      </div>
    </div>
  );
}

export default Card;
