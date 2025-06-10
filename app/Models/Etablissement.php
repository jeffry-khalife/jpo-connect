<?php
namespace App\Models;

use PDO;

class Etablissement extends Model {
    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM etablissement");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>