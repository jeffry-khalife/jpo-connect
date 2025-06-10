# JPO-connect

## Description
Backend PHP pour la gestion des Journées Portes Ouvertes (JPO).

## Structure
- `/core` : classes de base (Database, Router, Autoload, Jwt)
- `/models` : classes métier (héritent de Model)
- `/controllers` : gestion des requêtes API
- `/public` : point d'entrée (index.php)
- `/config` : configuration base de données

## Installation
1. Importer la base de données `jpo.sql`.
2. Configurer `/config/config.php` avec tes identifiants MySQL.
3. Lancer un serveur PHP pointant sur `/public`.
4. Consommer l’API via ReactJS.

## Routes disponibles (exemples)
- POST `/login` : connexion, retourne un JWT
- GET `/jpos` : liste des JPO
- GET `/jpos/{id}` : détail d'une JPO
- POST `/jpos` : créer une JPO