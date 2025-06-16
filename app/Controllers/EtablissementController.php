<?php
namespace App\Controllers;

use App\Models\Etablissement;

class EtablissementController {
    public function index() {
        $model = new Etablissement();
        $list = $model->getAll();
        header('Content-Type: application/json');
        echo json_encode($list);
    }

    public function show($id) {
    $model = new Etablissement();
    $item = $model->getById($id);
    header('Content-Type: application/json');
    if ($item) {
        echo json_encode($item);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Etablissement non trouvé']);
    }
}
}
?>
