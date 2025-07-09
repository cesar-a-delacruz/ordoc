import "./Card.css";
function Card({ id, name, type, expedition, url }) {
  return (
    <div className="card">
      <img src={url} alt={name} className="card-image" />
      <h3>{name}</h3>
      <p className="type">{type}</p>
      {expedition && (
        <p className="date">
          <span>{expedition.substring(0, 4)}</span>
          {` (${new Date(expedition).toLocaleDateString("es-ES", { month: "long" })})`}
        </p>
      )}
      <a href={"/documents/" + id}>Ver Detalles</a>
    </div>
  );
}

export default Card;
