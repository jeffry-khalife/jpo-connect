<?php
namespace App\Controllers;

use App\Models\Utilisateur;

class UtilisateurController {
    public function index() {
        $model = new Utilisateur();
        $users = $model->getAll();
        echo json_encode($users);
    }

    public function show($id) {
        $model = new Utilisateur();
        $user = $model->getById($id);
        if ($user) {
            echo json_encode($user);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Utilisateur non trouvé']);
        }
    }

    public function create() {
        $data = json_decode(file_get_contents('php://input'), true);
        $model = new Utilisateur();
        $success = $model->create($data['nom'], $data['prenom'], $data['email'], $data['mot_de_passe'], $data['role_id']);
        echo json_encode(['success' => $success]);
    }

    public function delete($id) {
        $model = new Utilisateur();
        $success = $model->delete($id);
        echo json_encode(['success' => $success]);
    }
}
?>