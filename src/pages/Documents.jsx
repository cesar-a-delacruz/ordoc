import { useState, useEffect } from "react";
import supabase from "../apis/supabase";
import Card from "../components/Card";
import CardLayout from "../layouts/CardLayout";

function Documents() {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    (async () => {
      const user = (await supabase.auth.getUser()).data.user;
      const data = (
        await supabase
          .from("documents")
          .select("*")
          .eq("user_id", user.id)
          .order("expedition", { ascending: false })
      ).data;
      setDocuments(data);
    })();
  }, []);

  return (
    <CardLayout>
      {documents.map((document) => (
        <Card key={document.id} {...document} />
      ))}
    </CardLayout>
  );
}

export default Documents;
