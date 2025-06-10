<?php
namespace App\Controllers;

use App\Models\Commentaire;

class CommentaireController {
    public function index($jpo_id) {
        $model = new Commentaire();
        $comments = $model->getByJpo($jpo_id);
        echo json_encode($comments);
    }

    public function create() {
        $data = json_decode(file_get_contents('php://input'), true);
        $model = new Commentaire();
        $success = $model->add($data['utilisateur_id'], $data['jpo_id'], $data['contenu'], $data['parent_id'] ?? null);
        echo json_encode(['success' => $success]);
    }

    public function delete($id) {
        $model = new Commentaire();
        $success = $model->delete($id);
        echo json_encode(['success' => $success]);
    }
}
?>