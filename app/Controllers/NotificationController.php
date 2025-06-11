<?php
namespace App\Controllers;

use App\Models\Notification;

class NotificationController {
    public function create() {
        $data = json_decode(file_get_contents('php://input'), true);
        $model = new Notification();
        $success = $model->add($data['utilisateur_id'], $data['jpo_id'], $data['type']);
        echo json_encode(['success' => $success]);
    }
}
?>