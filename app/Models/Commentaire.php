<?php
namespace App\Models;

use PDO;

class Commentaire extends Model {
    public function getByJpo($jpo_id) {
        $stmt = $this->pdo->prepare("SELECT c.*, u.nom, u.prenom FROM commentaire c JOIN utilisateur u ON c.utilisateur_id = u.id WHERE jpo_id = ? ORDER BY date_commentaire DESC");
        $stmt->execute([$jpo_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add($utilisateur_id, $jpo_id, $contenu, $parent_id = null) {
        $stmt = $this->pdo->prepare("INSERT INTO commentaire (utilisateur_id, jpo_id, contenu, parent_id) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$utilisateur_id, $jpo_id, $contenu, $parent_id]);
    }

    public function delete($id) {
    $stmt = $this->pdo->prepare("DELETE FROM commentaire WHERE id = ?");
    return $stmt->execute([$id]);
}
}
?>