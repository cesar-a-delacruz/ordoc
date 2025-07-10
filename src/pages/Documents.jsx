import { useState, useEffect } from "react";
import supabase from "../apis/supabase";
import Card from "../components/Card";
import CardLayout from "../layouts/CardLayout";

function Documents() {
  if (localStorage.getItem("logged") !== "yes") location.replace("/login");
  document.title = "Ordoc: Documentos";

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    (async () => {
      const docsChanged = localStorage.getItem("docsChanged");

      if (docsChanged && docsChanged !== "changed") {
        setDocuments(JSON.parse(localStorage.getItem("docs")));
      } else {
        const user = (await supabase.auth.getUser()).data.user;
        const docs = await supabase
          .from("documents")
          .select("*")
          .eq("user_id", user.id)
          .order("expedition", { ascending: false });

        if (docs.error) alert(docs.error);
        setDocuments(docs.data);

        localStorage.setItem("docs", JSON.stringify(docs.data));
        localStorage.removeItem("docsChanged");
      }

      document.getElementById("loading").style.display = "none";
    })();
  }, []);

  return (
    <CardLayout>
      <p id="loading">Cargando...</p>
      {documents ? (
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
