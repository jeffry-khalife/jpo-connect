<?php
namespace App\Controllers;

use App\Models\Jpo;

class JpoController {
    public function index() {
        $jpo = new Jpo();
        $data = $jpo->getAll();
        echo json_encode($data);
    }

    public function show($id) {
        $jpo = new Jpo();
        $data = $jpo->getById($id);
        if ($data) {
            echo json_encode($data);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'JPO non trouvée']);
        }
    }

    public function create() {
        $data = json_decode(file_get_contents('php://input'), true);
        $data['role_id'] = 3;
        $jpo = new Jpo();
        $success = $jpo->create($data['titre'], $data['description'], $data['date_jpo'], $data['capacite'], $data['etablissement_id']);
        echo json_encode(['success' => $success]);
    }

    public function delete($id) {
    $model = new \App\Models\Jpo();
    $success = $model->delete($id);
    if ($success) {
        http_response_code(200);
        echo json_encode(['success' => true]);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Suppression impossible"]);
    }
    }

}
?>