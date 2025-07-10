import { Link } from "react-router-dom";
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
      <Link to={"/document"} state={{ ...props }}>
        Ver Detalles
      </Link>
    </div>
  );
}

export default Card;
