import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function JpoEdit() {
  const { id } = useParams();
  const [jpo, setJpo] = useState(null);
  const [etablissements, setEtablissements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  // Récupère la JPO à éditer
  useEffect(() => {
    Promise.all([
      fetch(`http://localhost/jpo-connect/public/jpos/${id}`).then(res => res.json()),
      fetch("http://localhost/jpo-connect/public/etablissements").then(res => res.json())
    ])
      .then(([jpoData, etabData]) => {
        setJpo(jpoData);
        setEtablissements(etabData);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement");
        setLoading(false);
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    fetch(`http://localhost/jpo-connect/public/jpos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jpo),
    })
      .then(async res => {
        if (!res.ok) {
          const err = await res.text();
          throw new Error(err || "Erreur lors de la modification");
        }
        return res.json();
      })
      .then(() => navigate("/admin"))
      .catch(err => setError(err.message));
  }

  if (loading) return <div>Chargement...</div>;
  if (!jpo) return <div>JPO introuvable</div>;

  return (
    <div className="container max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Modifier la JPO</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={jpo.titre}
          onChange={e => setJpo({ ...jpo, titre: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={jpo.date_jpo?.slice(0, 16) || ""}
          onChange={e => setJpo({ ...jpo, date_jpo: e.target.value })}
          required
        />
        <input
          type="number"
          value={jpo.capacite}
          onChange={e => setJpo({ ...jpo, capacite: e.target.value })}
          required
          min={1}
        />
        <input
          type="text"
          value={jpo.description}
          onChange={e => setJpo({ ...jpo, description: e.target.value })}
          required
        />
        <select
          value={jpo.etablissement_id}
          onChange={e => setJpo({ ...jpo, etablissement_id: e.target.value })}
          required
        >
          <option value="">Sélectionnez un établissement</option>
          {etablissements.map(etab => (
            <option key={etab.id} value={etab.id}>
              {etab.nom}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Modifier
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
}
