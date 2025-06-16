<?php
namespace App\Models;

use PDO;

class Role extends Model {
    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM role");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>