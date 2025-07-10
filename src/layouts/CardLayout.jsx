import { useLocation } from "react-router-dom";
import supabase from "../apis/supabase";
import "./CardLayout.css";

function CardLayout({ children }) {
  const canSearch = "/documents" === useLocation().pathname;

  setTimeout(() => search(), 1);
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
          <input
            type="text"
            placeholder="Buscar..."
            className="search-bar"
            disabled={!canSearch}
          />
          <button
            className="logout-button"
            onClick={async (e) => {
              e.preventDefault();
              await supabase.auth.signOut();
              localStorage.clear();
              location.replace("/login");
            }}
          >
            Salir
          </button>
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
  function search() {
    const searchBar = document.querySelector(".search-bar");
    const cardsContainer = document.querySelector(".card-container");

    searchBar.addEventListener("input", function () {
      const query = searchBar.value.trim().toLowerCase();

      cardsContainer.childNodes.forEach((card) => {
        const fullText = getTextRecursively(card).toLowerCase();
        const queryTokens = query.split(" ");

        let tokenMatch = 0;
        queryTokens.forEach((token) => {
          if (fullText.includes(token)) tokenMatch++;
        });

        if (tokenMatch === queryTokens.length) card.style.display = "flex";
        else card.style.display = "none";
      });

      document.getElementById("loading").style.display = "none";
    });

    function getTextRecursively(element) {
      let text = "";
      for (let node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          text += node.textContent;
        } else if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName !== "A"
        ) {
          text += getTextRecursively(node);
        }
      }
      return text;
    }
  }
}

export default CardLayout;
