import { useState, useEffect } from "react";
import client from "../supabase/client";
import Card from "../components/Card";

function Home() {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    (async () => {
      const user = (await client.auth.getUser()).data.user;
      const data = (
        await client.from("documents").select("*").eq("user_id", user.id)
      ).data;
      setDocuments(data);
    })();
  }, []);

  return (
    <div className="card-container">
      {documents.map((document) => (
        <Card key={document.id} {...document} />
      ))}
    </div>
  );
}

export default Home;
