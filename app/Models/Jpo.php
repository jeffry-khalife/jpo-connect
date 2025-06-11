<?php
namespace App\Models;

use PDO;

class Jpo extends Model {
    public function getAll() {
        $stmt = $this->pdo->query("SELECT j.*, e.nom as etablissement_nom, e.ville FROM jpo j JOIN etablissement e ON j.etablissement_id = e.id ORDER BY j.date_jpo ASC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM jpo WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($titre, $description, $date_jpo, $capacite, $etablissement_id) {
        $stmt = $this->pdo->prepare("INSERT INTO jpo (titre, description, date_jpo, capacite, etablissement_id) VALUES (?, ?, ?, ?, ?)");
        return $stmt->execute([$titre, $description, $date_jpo, $capacite, $etablissement_id]);
    }
}
?>