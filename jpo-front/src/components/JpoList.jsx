import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function JpoList() {
  const [jpos, setJpos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/jpo-connect/public/jpos")
      .then(res => res.json())
      .then(data => {
        setJpos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Liste des Journées Portes Ouvertes</h2>
      {loading ? (
        <div>Chargement...</div>
      ) : jpos.length === 0 ? (
        <div>Aucune JPO disponible.</div>
      ) : (
        <ul className="space-y-2">
          {jpos.map(jpo => (
            <li key={jpo.id} className="border p-4 rounded bg-gray-50 flex justify-between items-center">
              <div>
                <span className="font-semibold">{jpo.titre}</span> — {jpo.date_jpo}
              </div>
              <Link
                to={`/jpos/${jpo.id}`}
                className="text-blue-600 underline"
              >
                Voir détail
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
