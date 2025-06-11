import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/login">Connexion</Link></li>
        <li><Link to="/register">Inscription</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/jpos">JPO</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
