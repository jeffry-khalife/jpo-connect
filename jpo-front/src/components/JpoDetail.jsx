import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { parseJwt } from "../utils/jwt";

export default function JpoDetail() {
  const { id } = useParams();
  const [jpo, setJpo] = useState(null);
  const [etablissement, setEtablissement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inscrit, setInscrit] = useState(false);
  const [inscMessage, setInscMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentMsg, setCommentMsg] = useState("");
  const [reply, setReply] = useState({});
  const [replyMsg, setReplyMsg] = useState({});
  const navigate = useNavigate();

  // Utilisateur connecté
  const token = localStorage.getItem("jwt");
  const user = parseJwt(token);
  const isModo = user && user.role_id === 2;

  // Récupère la JPO et son établissement
  useEffect(() => {
    fetch(`http://localhost/jpo-connect/public/jpos/${id}`)
      .then(res => res.json())
      .then(data => {
        setJpo(data);
        // Va chercher l'établissement associé
        fetch(`http://localhost/jpo-connect/public/etablissements/${data.etablissement_id}`)
          .then(res => res.json())
          .then(eta => setEtablissement(eta));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);


  // Récupère les commentaires (et réponses modérateur si jointure côté backend)
  useEffect(() => {
    fetch(`http://localhost/jpo-connect/public/commentaires/${id}`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [id]);

 // Vérifie si l'utilisateur est inscrit à la JPO
  useEffect(() => {
    if (user && jpo) {
      fetch(`http://localhost/jpo-connect/public/inscriptions/check?utilisateur_id=${user.id}&jpo_id=${jpo.id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setInscrit(!!data.inscrit))
        .catch(() => setInscrit(false));
    }
  }, [user, jpo, token]);

  function handleInscription() {
    fetch("http://localhost/jpo-connect/public/inscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        utilisateur_id: user.id,
        jpo_id: jpo.id,
      }),
    })
      .then(async res => {
        if (!res.ok) {
          const err = await res.text();
          throw new Error(err || "Erreur lors de l'inscription");
        }
        return res.json();
      })
      .then(() => {
        setInscrit(true);
        setInscMessage("Inscription réussie !");
      })
      .catch(err => setInscMessage("Erreur : " + err.message));
  }

  function handleDesinscription() {
    fetch("http://localhost/jpo-connect/public/inscriptions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        utilisateur_id: user.id,
        jpo_id: jpo.id,
      }),
    })
      .then(async res => {
        if (!res.ok) {
          const err = await res.text();
          throw new Error(err || "Erreur lors de la désinscription");
        }
        return res.json();
      })
      .then(() => {
        setInscrit(false);
        setInscMessage("Désinscription réussie !");
      })
      .catch(err => setInscMessage("Erreur : " + err.message));
  }

  // Commentaire
  const handleComment = async (e) => {
    e.preventDefault();
    setCommentMsg("");
    if (!user) {
      setCommentMsg("Connectez-vous pour commenter.");
      return;
    }
    const res = await fetch("http://localhost/jpo-connect/public/commentaires", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ utilisateur_id: user.id, jpo_id: id, contenu: comment })
    });
    const data = await res.json();
    if (data.success) {
      setCommentMsg("Commentaire ajouté !");
      setComment("");
      // Recharge les commentaires
      fetch(`http://localhost/jpo-connect/public/commentaires/${id}`)
        .then(res => res.json())
        .then(data => setComments(data));
    } else {
      setCommentMsg(data.error || "Erreur lors de l'ajout du commentaire.");
    }
  };

  // Réponse modérateur (parent_id)
  const handleReply = async (e, commentId) => {
    e.preventDefault();
    setReplyMsg({});
    const res = await fetch("http://localhost/jpo-connect/public/commentaires", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        utilisateur_id: user.id,
        jpo_id: id,
        contenu: reply[commentId],
        parent_id: commentId // parent_id = id du commentaire auquel on répond
      })
    });
    const data = await res.json();
    if (data.success) {
      setReplyMsg(prev => ({ ...prev, [commentId]: "Réponse envoyée !" }));
      setReply(prev => ({ ...prev, [commentId]: "" }));
      // Recharge les commentaires
      fetch(`http://localhost/jpo-connect/public/commentaires/${id}`)
        .then(res => res.json())
        .then(data => setComments(data));
    } else {
      setReplyMsg(prev => ({ ...prev, [commentId]: data.error || "Erreur lors de la réponse." }));
    }
  };

  if (loading) return <div className="container mt-8">Chargement...</div>;
  if (!jpo || !jpo.id) return <div className="container mt-8">JPO introuvable.</div>;

  return (
    <div className="container max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{jpo.titre}</h2>
      <p><span className="font-semibold">Date :</span> {jpo.date_jpo}</p>
      <p><span className="font-semibold">Ville :</span> {etablissement ? etablissement.ville : "Chargement..."}</p>
      <p><span className="font-semibold">Capacité :</span> {jpo.capacite}</p>
      <p className="mt-4"><span className="font-semibold">Description :</span><br />{jpo.description}</p>

      {/* Inscription/Désinscription */}
      <div className="mt-6">
        {!user ? (
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => navigate('/login')}
          >
            Connectez-vous pour vous inscrire
          </button>
        ) : inscrit ? (
          <button
            className="bg-red-600 text-white py-2 px-4 rounded"
            onClick={handleDesinscription}
          >
            Se désinscrire
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleInscription}
          >
            S'inscrire à cette JPO
          </button>
        )}
        {inscMessage && <div className="mt-2 text-center text-sm">{inscMessage}</div>}
      </div>

      {/* Commentaires et réponses */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">Commentaires</h3>
        <ul className="mb-4">
          {comments.length === 0 && <li>Aucun commentaire pour l'instant.</li>}
          {comments
            .filter(c => !c.parent_id)
            .map(c => (
              <li key={c.id} className="border-b py-2">
                <span className="font-semibold">{c.nom || "Utilisateur"}</span> : {c.contenu}
                {/* Affiche la réponse modérateur si elle existe */}
                {comments
                  .filter(rep => rep.parent_id === c.id)
                  .map(rep => (
                    <div key={rep.id} className="ml-4 mt-1 text-blue-700 text-sm">
                      <span className="font-semibold">Modérateur :</span> {rep.contenu}
                    </div>
                  ))}
                {/* Réponse modérateur */}
                {isModo && (
                  <form
                    className="mt-2 flex flex-col gap-1"
                    onSubmit={e => handleReply(e, c.id)}
                  >
                    <textarea
                      placeholder="Répondre en tant que modérateur..."
                      value={reply[c.id] || ""}
                      onChange={e => setReply(prev => ({ ...prev, [c.id]: e.target.value }))}
                      className="border p-1 rounded"
                    />
                    <button
                      type="submit"
                      className="bg-green-600 text-white py-1 px-2 rounded w-fit"
                    >
                      Répondre
                    </button>
                    {replyMsg[c.id] && <div className="text-sm">{replyMsg[c.id]}</div>}
                  </form>
                )}
              </li>
            ))}
        </ul>
        {user ? (
          <form onSubmit={handleComment} className="flex flex-col gap-2">
            <textarea
              placeholder="Votre commentaire..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
              className="border p-2 rounded"
            />
            <button type="submit" className="bg-green-600 text-white py-1 px-3 rounded">Ajouter un commentaire</button>
            {commentMsg && <div className="text-center text-sm">{commentMsg}</div>}
          </form>
        ) : (
          <div className="text-gray-500 text-sm">Connectez-vous pour ajouter un commentaire.</div>
        )}
      </div>
    </div>
  );
}
