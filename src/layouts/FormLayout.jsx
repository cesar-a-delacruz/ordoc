import "./FormLayout.css";

function FormLayout({ children }) {
  return (
    <div className="layout">
      <header className="layout header-no-nav">
        <h1>Ordoc</h1>
      </header>

      <main className="layout">{children}</main>

      <footer className="layout">
        <p>© {new Date().getFullYear()} Creado por el equipo de Ordoc</p>
      </footer>
    </div>
  );
}

export default FormLayout;
