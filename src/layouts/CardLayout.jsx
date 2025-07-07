import "./CardLayout.css";

function CardLayout({ children }) {
  return (
    <div className="layout">
      <header className="layout header-with-nav">
          <h1>Ordoc</h1>
          <nav>
            <a href="/documents">Documentos</a>
            <a href="/profile">Perfil</a>
            <a href="/upload">Subir</a>
          </nav>
          <form className="actions">
            <button type="submit" className="search-button">🔍</button>
            <input type="text" placeholder="Search..." className="search-bar" />
            <button className="logout-button">Salir</button>
          </form>
      </header>

      <main className="layout">
        <div className="card-container">{children}</div>
      </main>

      <footer className="layout">
        <p>© {new Date().getFullYear()} Creado por el equipo de Ordoc</p>
      </footer>
    </div>
  );
}

export default CardLayout;
