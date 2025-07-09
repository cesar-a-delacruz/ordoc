import { useState, useEffect } from "react";
import supabase from "../apis/supabase";
import Card from "../components/Card";
import CardLayout from "../layouts/CardLayout";

// // Save data
// localStorage.setItem('theme', 'dark');

// // Retrieve data
// const theme = localStorage.getItem('theme');

// // Remove data
// localStorage.removeItem('theme');

// // Clear all data
// localStorage.clear();

function Documents() {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    (async () => {
      const curLength = localStorage.getItem('curLength');
      const newLength = localStorage.getItem('newLength');

      if (curLength && curLength === newLength) {
        setDocuments(JSON.parse(localStorage.getItem('docs')));
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
        localStorage.setItem('docs', JSON.stringify(data))
        localStorage.setItem('curLength', data.length)
        localStorage.setItem('newLength', data.length)
      }
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
