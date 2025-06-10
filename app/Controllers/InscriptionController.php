<?php
namespace App\Controllers;

use App\Models\Inscription;

class InscriptionController {
    public function inscrire() {
        $data = json_decode(file_get_contents('php://input'), true);
        $model = new Inscription();
        $success = $model->inscrire($data['utilisateur_id'], $data['jpo_id']);
        echo json_encode(['success' => $success]);
    }

    public function desinscrire() {
        $data = json_decode(file_get_contents('php://input'), true);
        $model = new Inscription();
        $success = $model->desinscrire($data['utilisateur_id'], $data['jpo_id']);
        echo json_encode(['success' => $success]);
    }

    public function count($jpo_id) {
        $model = new Inscription();
        $count = $model->countInscrits($jpo_id);
        echo json_encode(['count' => $count]);
    }
}
?>