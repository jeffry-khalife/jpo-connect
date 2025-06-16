<?php
namespace App\Controllers;

use App\Models\Inscription;

class InscriptionController {
    public function inscrire() {
        $data = json_decode(file_get_contents('php://input'), true);
        $data['role_id'] = 3;
        $model = new Inscription();
        $success = $model->inscrire($data['utilisateur_id'], $data['jpo_id']);
        echo json_encode(['success' => $success]);
    }

    public function desinscrire() {
        $data = json_decode(file_get_contents('php://input'), true);
        $data['role_id'] = 3;
        $model = new Inscription();
        $success = $model->desinscrire($data['utilisateur_id'], $data['jpo_id']);
        echo json_encode(['success' => $success]);
    }

    public function count($jpo_id) {
        $model = new Inscription();
        $count = $model->countInscrits($jpo_id);
        echo json_encode(['count' => $count]);
    }

    public function check() {
    $data = json_decode(file_get_contents('php://input'), true);
    $utilisateur_id = $data['utilisateur_id'] ?? null;
    $jpo_id = $data['jpo_id'] ?? null;

    if (!$utilisateur_id || !$jpo_id) {
        http_response_code(400);
        echo json_encode(['error' => 'Paramètres manquants']);
        return;
    }

    $model = new \App\Models\Inscription();
    $inscrit = $model->isInscrit($utilisateur_id, $jpo_id);
    echo json_encode(['inscrit' => $inscrit]);
    }

}
?>