import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [mot_de_passe, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost/jpo-connect/public/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          mot_de_passe
        })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        setMessage('Connexion réussie !');
        onLogin(); 
        navigate('/jpos');
      } else {
        setMessage(data.error || "Identifiants invalides.");
      }
    } catch (err) {
      setMessage("Erreur serveur. Veuillez réessayer.");
    }
  };

  return (
    <div className="container max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Connexion</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={mot_de_passe}
          onChange={e => setMotDePasse(e.target.value)}
          required
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Se connecter</button>
      </form>
      {message && <div className="mt-2 text-center">{message}</div>}
    </div>
  );
}
