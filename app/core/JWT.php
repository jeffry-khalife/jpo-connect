<?php
namespace App\Core;

class Jwt {
    public static function encode($payload, $secret) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function decode($jwt, $secret) {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) return null;
        list($header, $payload, $signature) = $parts;

        $valid_signature = hash_hmac('sha256', "$header.$payload", $secret, true);
        $valid_signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($valid_signature));
        if (!hash_equals($signature, $valid_signature)) return null;

        return json_decode(base64_decode($payload), true);
    }
}
?>