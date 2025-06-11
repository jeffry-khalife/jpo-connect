<?php
namespace App\Controllers;

use App\Models\Etablissement;

class EtablissementController {
    public function index() {
        $model = new Etablissement();
        $list = $model->getAll();
        echo json_encode($list);
    }

    public function show($id) {
        $model = new Etablissement();
        $item = $model->getById($id);
        if ($item) {
            echo json_encode($item);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Etablissement non trouvé']);
        }
    }
}
?>