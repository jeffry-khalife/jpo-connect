import { useEffect, useState } from "react";
import { parseJwt } from "../utils/jwt";
import { Link, useNavigate } from "react-router-dom";
import { FaUserEdit, FaTrash, FaPlus, FaEdit, FaUserShield, FaCommentDots } from "react-icons/fa";

export default function AdminPanel() {
  const token = localStorage.getItem("jwt");
  const user = parseJwt(token);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [jpos, setJpos] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role_id > 2) {
      navigate("/");
      return;
    }
    fetch("http://localhost/jpo-connect/public/jpos", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setJpos);

    if (user.role_id === 1) {
      fetch("http://localhost/jpo-connect/public/utilisateurs", { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json()).then(setUsers);
    }

    fetch("http://localhost/jpo-connect/public/commentaires/moderation", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setComments);

    fetch("http://localhost/jpo-connect/public/stats", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setStats);
  }, [token, user, navigate]);

  const roleLabel = (role_id) => {
    switch (role_id) {
      case 1: return "Admin";
      case 2: return "Modérateur";
      case 3: return "Étudiant";
      default: return "Inconnu";
    }
  };

    function handleDeleteComment(id) {
    if (window.confirm("Supprimer ce commentaire ?")) {
      fetch(`http://localhost/jpo-connect/public/commentaires/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error("Erreur lors de la suppression");
          return res.json();
        })
        .then(() => setComments(comments.filter(c => c.id !== id)))
        .catch(err => alert("Erreur lors de la suppression du commentaire"));
    }
  }

  function handleDeleteUser(id) {
  if (window.confirm("Supprimer cet utilisateur ?")) {
    fetch(`http://localhost/jpo-connect/public/utilisateurs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Erreur lors de la suppression");
        }
        return res.json();
      })
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(err => alert("Erreur lors de la suppression de l'utilisateur : " + err.message));
  }
  }

  function handleChangeRole(id, currentRole) {
  // Cycle Admin (1) -> Modo (2) -> Étudiant (3) -> Admin (1)
  const nextRole = currentRole === 1 ? 2 : currentRole === 2 ? 3 : 1;
  const roleLabel = nextRole === 1 ? "Admin" : nextRole === 2 ? "Modérateur" : "Étudiant";
  if (window.confirm(`Changer le rôle en "${roleLabel}" ?`)) {
    fetch(`http://localhost/jpo-connect/public/utilisateurs/${id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ role_id: nextRole })
    })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Erreur lors du changement de rôle");
        }
        return res.json();
      })
      .then(() => setUsers(users.map(u => u.id === id ? { ...u, role_id: nextRole } : u)))
      .catch(err => alert("Erreur lors du changement de rôle : " + err.message));
  }
  }

  function handleDeleteJpo(id) {
  if (window.confirm("Supprimer cette JPO ?")) {
    fetch(`http://localhost/jpo-connect/public/jpos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Erreur lors de la suppression");
        }
        return res.json();
      })
      .then(() => setJpos(jpos.filter(jpo => jpo.id !== id)))
      .catch(err => alert("Erreur lors de la suppression de la JPO : " + err.message));
  }
}




  return (
    <div className="container max-w-6xl mx-auto pt-24">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <FaUserShield className="text-blue-700" /> Espace Administration
      </h2>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-5 flex flex-col items-center shadow">
          <span className="text-4xl font-bold text-blue-700">{stats ? stats.inscrits_total : "..."}</span>
          <span className="text-gray-600 mt-2"> Inscrits</span>
        </div>
        <div className="bg-green-50 rounded-lg p-5 flex flex-col items-center shadow">
          <span className="text-4xl font-bold text-green-700">{stats ? stats.presents_total : "..."}</span>
          <span className="text-gray-600 mt-2"> Présents</span>
        </div>
        <div className="bg-yellow-50 rounded-lg p-5 flex flex-col items-center shadow">
          <span className="text-4xl font-bold text-yellow-700">{jpos.length}</span>
          <span className="text-gray-600 mt-2"> JPO</span>
        </div>
        <div className="bg-pink-50 rounded-lg p-5 flex flex-col items-center shadow">
          <span className="text-4xl font-bold text-pink-700">{comments.length}</span>
          <span className="text-gray-600 mt-2"> Commentaires</span>
        </div>
      </div>

      {/* Gestion des JPO */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FaEdit /> Gestion des JPO
          </h3>
          <Link
            to="/jpos/new"
            className="flex items-center gap-1 px-3 py-1 text-xs rounded bg-green-600 hover:bg-green-700 text-white shadow transition"
          >
            <FaPlus /> Ajouter
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Titre</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Capacité</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jpos.map(jpo => (
                <tr key={jpo.id} className="border-t">
                  <td className="px-4 py-2">{jpo.titre}</td>
                  <td className="px-4 py-2">{new Date(jpo.date_jpo).toLocaleString()}</td>
                  <td className="px-4 py-2">{jpo.capacite}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/jpos/edit/${jpo.id}`}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-blue-500 hover:bg-blue-600 text-white mr-2"
                      title="Modifier"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-red-500 hover:bg-red-600 text-white"
                      title="Supprimer"
                      onClick={() => handleDeleteJpo(jpo.id)}
                    >
                      <FaTrash />
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Gestion des utilisateurs (admin seulement) */}
      {user && user.role_id === 1 && (
        <section className="mb-10">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
            <FaUserEdit /> Gestion des utilisateurs
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Nom</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Rôle</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-t">
                    <td className="px-4 py-2">{u.nom} {u.prenom}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{roleLabel(u.role_id)}</td>
                    <td className="px-4 py-2">
                      <button
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-blue-500 hover:bg-blue-600 text-white mr-2"
                        title="Changer rôle"
                        onClick={() => handleChangeRole(u.id, u.role_id)}
                      >
                        <FaUserEdit />
                      </button>
                      <button
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-red-500 hover:bg-red-600 text-white"
                        title="Supprimer"
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        <FaTrash />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

     {/* Modération des commentaires */}
      <section>
        <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
          <FaCommentDots /> Modération des commentaires
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Commentaire</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map(c => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-2">{c.nom} {c.prenom}</td>
                  <td className="px-4 py-2">{c.contenu}</td>
                  <td className="px-4 py-2">{new Date(c.date_commentaire).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <button
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-red-500 hover:bg-red-600 text-white"
                      title="Supprimer"
                      onClick={() => handleDeleteComment(c.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
