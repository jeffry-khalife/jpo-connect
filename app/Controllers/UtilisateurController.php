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
        $data['role_id'] = 3;
        $model = new Utilisateur();
        $success = $model->create($data['nom'], $data['prenom'], $data['email'], $data['mot_de_passe'], $data['role_id']);
        echo json_encode(['success' => $success]);
    }

    public function delete($id) {
    $model = new Utilisateur();
    $success = $model->delete($id);
    if ($success) {
        http_response_code(200);
        echo json_encode(['success' => true]);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Suppression impossible"]);
    }
    }

    public function updateRole($id) {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['role_id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'role_id manquant']);
        return;
    }
    $model = new Utilisateur();
    $success = $model->updateRole($id, $data['role_id']);
    if ($success) {
        http_response_code(200);
        echo json_encode(['success' => true]);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Changement impossible"]);
    }
    }

}
?>