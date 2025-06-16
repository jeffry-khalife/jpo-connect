<?php
namespace App\Core;

class Router {
    private $routes = [];

    public function add($method, $route, $callback) {
        $this->routes[] = compact('method', 'route', 'callback');
    }

    public function dispatch($method, $uri) {
        foreach ($this->routes as $route) {
            if ($method === $route['method'] && preg_match("#^{$route['route']}$#", $uri, $matches)) {
                array_shift($matches);
                call_user_func_array($route['callback'], $matches);
                return;
            }
        }
        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
    }
}
?>