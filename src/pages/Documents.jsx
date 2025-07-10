import { useState, useEffect } from "react";
import supabase from "../apis/supabase";
import Card from "../components/Card";
import CardLayout from "../layouts/CardLayout";

function Documents() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    (async () => {
      const docsChanged = localStorage.getItem("docsChanged");

      if (docsChanged !== "changed") {
        setDocuments(JSON.parse(localStorage.getItem("docs")));
      } else {
        const user = (await supabase.auth.getUser()).data.user;
        const data = (
          await supabase
            .from("documents")
            .select("*")
            .eq("user_id", user.id)
            .order("expedition", { ascending: false })
        ).data;
        setDocuments(data);

        localStorage.setItem("docs", JSON.stringify(data));
        localStorage.removeItem("docsChanged");
      }

      document.getElementById("loading").style.display = "none";
    })();
  }, []);

  return (
    <CardLayout>
      <p id="loading">Cargando...</p>
      {documents || documents.length === 0 ? (
        documents.map((document) => <Card key={document.id} {...document} />)
      ) : (
        <p className="empty">
          No hay documentos diponibles. <br />
          Suba sus documentos en la sección "Subir".
        </p>
      )}
    </CardLayout>
  );
}

export default Documents;
