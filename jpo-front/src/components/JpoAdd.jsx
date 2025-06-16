import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function JpoAdd() {
  const [titre, setTitre] = useState("");
  const [date_jpo, setDateJpo] = useState("");
  const [capacite, setCapacite] = useState("");
  const [description, setDescription] = useState("");
  const [etablissement_id, setEtablissementId] = useState("");
  const [etablissements, setEtablissements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingEtab, setLoadingEtab] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("jwt");

  // Fetch établissements au chargement
  useEffect(() => {
    fetch("http://localhost/jpo-connect/public/etablissements")
      .then(res => res.json())
      .then(data => {
        setEtablissements(data);
        setLoadingEtab(false);
      })
      .catch(() => {
        setEtablissements([]);
        setLoadingEtab(false);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    fetch("http://localhost/jpo-connect/public/jpos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titre,
        date_jpo,
        capacite: parseInt(capacite, 10),
        description,
        etablissement_id: parseInt(etablissement_id, 10),
      }),
    })
      .then(async res => {
        if (!res.ok) {
          const err = await res.text();
          throw new Error(err || "Erreur lors de l'ajout");
        }
        return res.json();
      })
      .then(() => {
        setLoading(false);
        navigate("/admin");
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  }

  return (
    <div className="container max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Ajouter une JPO</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={e => setTitre(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          placeholder="Date et heure"
          value={date_jpo}
          onChange={e => setDateJpo(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Capacité"
          value={capacite}
          onChange={e => setCapacite(e.target.value)}
          required
          min={1}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <select
          value={etablissement_id}
          onChange={e => setEtablissementId(e.target.value)}
          required
          disabled={loadingEtab}
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
          disabled={loading || loadingEtab}
        >
          {loading ? "Ajout en cours..." : "Ajouter"}
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
}
