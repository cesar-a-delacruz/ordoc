function Card({ name, type, expedition, url }) {
  return (
    <div className="card">
      <img src={url} alt={name} className="card-image" />
      <h3>{name}</h3>
      <h5>{type}</h5>
      <p>{expedition}</p>
    </div>
  );
}

export default Card;
