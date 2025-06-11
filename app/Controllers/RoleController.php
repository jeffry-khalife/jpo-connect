<?php
namespace App\Controllers;

use App\Models\Role;

class RoleController {
    public function index() {
        $model = new Role();
        $list = $model->getAll();
        echo json_encode($list);
    }
}
?>