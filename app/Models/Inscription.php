<?php
namespace App\Models;

use PDO;

class Inscription extends Model {
    public function inscrire($utilisateur_id, $jpo_id) {
        $stmt = $this->pdo->prepare("INSERT INTO inscription (utilisateur_id, jpo_id) VALUES (?, ?)");
        return $stmt->execute([$utilisateur_id, $jpo_id]);
    }

    public function desinscrire($utilisateur_id, $jpo_id) {
        $stmt = $this->pdo->prepare("DELETE FROM inscription WHERE utilisateur_id = ? AND jpo_id = ?");
        return $stmt->execute([$utilisateur_id, $jpo_id]);
    }

    public function countInscrits($jpo_id) {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM inscription WHERE jpo_id = ?");
        $stmt->execute([$jpo_id]);
        return (int)$stmt->fetchColumn();
    }
}
?>