<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../app/core/Autoload.php';

use App\Core\Router;
use App\Controllers\AuthController;
use App\Controllers\JpoController;
use App\Controllers\UtilisateurController;
use App\Controllers\InscriptionController;
use App\Controllers\CommentaireController;
use App\Controllers\EtablissementController;
use App\Controllers\RoleController;
use App\Controllers\NotificationController;

$router = new Router();

$router->add('POST', '/login', function() {
    (new AuthController())->login();
});

$router->add('GET', '/jpos', function() {
    (new JpoController())->index();
});
$router->add('GET', '/jpos/(\d+)', function($id) {
    (new JpoController())->show($id);
});
$router->add('POST', '/jpos', function() {
    (new JpoController())->create();
});


$router->add('GET', '/utilisateurs', function() { (new UtilisateurController())->index(); });
$router->add('GET', '/utilisateurs/(\d+)', function($id) { (new UtilisateurController())->show($id); });
$router->add('POST', '/utilisateurs', function() { (new UtilisateurController())->create(); });
$router->add('DELETE', '/utilisateurs/(\d+)', function($id) { (new UtilisateurController())->delete($id); });

$router->add('POST', '/inscriptions', function() { (new InscriptionController())->inscrire(); });
$router->add('DELETE', '/inscriptions', function() { (new InscriptionController())->desinscrire(); });
$router->add('GET', '/inscriptions/count/(\d+)', function($jpo_id) { (new InscriptionController())->count($jpo_id); });

$router->add('GET', '/commentaires/(\d+)', function($jpo_id) { (new CommentaireController())->index($jpo_id); });
$router->add('POST', '/commentaires', function() { (new CommentaireController())->create(); });
$router->add('DELETE', '/commentaires/(\d+)', function($id) { (new CommentaireController())->delete($id); });


$router->add('GET', '/etablissements', function() { (new EtablissementController())->index(); });
$router->add('GET', '/etablissements/(\d+)', function($id) { (new EtablissementController())->show($id); });

$router->add('GET', '/roles', function() { (new RoleController())->index(); });


$router->add('POST', '/notifications', function() { (new NotificationController())->create(); });

$router->add('GET', '/', function() {
    echo json_encode(['message' => 'API JPO Connect opérationnelle']);
});

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$base_path = '/jpo-connect/public';
if (strpos($uri, $base_path) === 0) $uri = substr($uri, strlen($base_path));
$router->dispatch($method, $uri);
?>