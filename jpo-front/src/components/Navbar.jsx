import { Link } from 'react-router-dom';
import { parseJwt } from '../utils/jwt';

export default function Navbar({ logged, onLogout }) {
  const token = localStorage.getItem("jwt");
  const user = parseJwt(token);


  const isAdmin = user && user.role_id === 1;
  const isModo = user && user.role_id === 2;

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-blue-700 p-4 shadow">
      <ul className="flex gap-4">
        <li><Link className="text-white font-bold" to="/">Accueil</Link></li>
        <li><Link className="text-white" to="/jpos">JPO</Link></li>
        {logged && isAdmin && (
          <li><Link className="text-yellow-300" to="/admin">Admin</Link></li>
        )}
        {logged ? (
          <>
            <li>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={onLogout}
              >
                Déconnexion
              </button>
            </li>
            {user && (
              <li className="text-white text-sm ml-2">
                {user.email} ({user.role_id === 1 ? "Admin" : user.role_id === 2 ? "Modérateur" : "Étudiant"})
              </li>
            )}
          </>
        ) : (
          <>
            <li>
              <Link className="text-white" to="/login">Connexion</Link>
            </li>
            <li>
              <Link className="bg-green-500 text-white px-3 py-1 rounded" to="/register">Inscription</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
