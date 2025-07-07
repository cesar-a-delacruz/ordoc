import "./FormLayout.css";

function FormLayout({ children }) {
  return (
    <div className="form-layout">
      <header className="form-layout">
        <h1>Ordoc</h1>
      </header>

      <main className="form-layout">{children}</main>

      <footer className="form-layout">
        <p>© {new Date().getFullYear()} Creado por el equipo de Ordoc</p>
      </footer>
    </div>
  );
}

export default FormLayout;
