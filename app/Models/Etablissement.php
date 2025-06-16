<?php
namespace App\Models;

use PDO;

class Etablissement extends Model {
    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM etablissement");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM etablissement WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>