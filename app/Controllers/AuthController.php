<?php
namespace App\Controllers;

use App\Models\Utilisateur;
use App\Core\Jwt;

class AuthController {
    public function login() {
        $data = json_decode(file_get_contents('php://input'), true);
        $data['role_id'] = 3;
        $userModel = new Utilisateur();
        if (!$data || !isset($data['email']) || !isset($data['mot_de_passe'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Email et mot de passe requis']);
            return;
        }

        $user = $userModel->getByEmail($data['email']);
        if ($user && password_verify($data['mot_de_passe'], $user['mot_de_passe'])) {
            $config = require dirname(__DIR__, 2) . '/config/config.php';
            $payload = [
                'id' => $user['id'],
                'email' => $user['email'],
                'role_id' => $user['role_id'],
                'exp' => time() + 3600
            ];
            $jwt = Jwt::encode($payload, $config['jwt_secret']);
            echo json_encode(['token' => $jwt]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Identifiants invalides']);
        }
    }
}
?>