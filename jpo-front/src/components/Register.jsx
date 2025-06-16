import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    role_id: 3 // Toujours étudiant
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost/jpo-connect/public/utilisateurs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.success) {
      setMessage("Inscription réussie ! Redirection...");
      setTimeout(() => {
        navigate("/login");
      }, 1500); 
    } else {
      setMessage(data.error || "Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="container max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Inscription</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="nom"
          type="text"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          name="prenom"
          type="text"
          placeholder="Prénom"
          value={form.prenom}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          name="mot_de_passe"
          type="password"
          placeholder="Mot de passe"
          value={form.mot_de_passe}
          onChange={handleChange}
          required
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">S'inscrire</button>
      </form>
      {message && <div className="mt-2 text-center">{message}</div>}
    </div>
  );
}
