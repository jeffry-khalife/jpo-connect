<?php
namespace App\Models;

use PDO;

class Utilisateur extends Model {
    public function create($nom, $prenom, $email, $mot_de_passe, $role_id) {
        $hash = password_hash($mot_de_passe, PASSWORD_DEFAULT);
        $stmt = $this->pdo->prepare("INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, role_id) VALUES (?, ?, ?, ?, ?)");
        return $stmt->execute([$nom, $prenom, $email, $hash, $role_id]);
    }

    public function getByEmail($email) {
        $stmt = $this->pdo->prepare("SELECT * FROM utilisateur WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM utilisateur WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

     public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM utilisateur");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>