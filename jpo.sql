-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 10 juin 2025 à 08:13
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `jpo`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
CREATE TABLE IF NOT EXISTS `commentaire` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int NOT NULL,
  `jpo_id` int NOT NULL,
  `contenu` text NOT NULL,
  `date_commentaire` datetime DEFAULT CURRENT_TIMESTAMP,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  KEY `jpo_id` (`jpo_id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`id`, `utilisateur_id`, `jpo_id`, `contenu`, `date_commentaire`, `parent_id`) VALUES
(1, 2, 1, 'Super journée, merci !', '2025-06-07 11:38:55', NULL),
(2, 3, 2, 'Très intéressant !', '2025-06-07 11:38:55', NULL),
(3, 2, 1, 'Merci pour votre retour.', '2025-06-07 11:38:55', 1);

-- --------------------------------------------------------

--
-- Structure de la table `etablissement`
--

DROP TABLE IF EXISTS `etablissement`;
CREATE TABLE IF NOT EXISTS `etablissement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `ville` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `etablissement`
--

INSERT INTO `etablissement` (`id`, `nom`, `ville`) VALUES
(1, 'La Plateforme', 'Marseille'),
(2, 'La Plateforme', 'Martigues'),
(3, 'La Plateforme', 'Paris');

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

DROP TABLE IF EXISTS `inscription`;
CREATE TABLE IF NOT EXISTS `inscription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int NOT NULL,
  `jpo_id` int NOT NULL,
  `date_inscription` datetime DEFAULT CURRENT_TIMESTAMP,
  `present` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_inscription` (`utilisateur_id`,`jpo_id`),
  KEY `jpo_id` (`jpo_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `inscription`
--

INSERT INTO `inscription` (`id`, `utilisateur_id`, `jpo_id`, `date_inscription`, `present`) VALUES
(1, 2, 1, '2025-06-07 11:38:55', 1),
(2, 3, 2, '2025-06-07 11:38:55', 0);

-- --------------------------------------------------------

--
-- Structure de la table `jpo`
--

DROP TABLE IF EXISTS `jpo`;
CREATE TABLE IF NOT EXISTS `jpo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(150) NOT NULL,
  `description` text,
  `date_jpo` datetime NOT NULL,
  `capacite` int NOT NULL,
  `etablissement_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `etablissement_id` (`etablissement_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `jpo`
--

INSERT INTO `jpo` (`id`, `titre`, `description`, `date_jpo`, `capacite`, `etablissement_id`) VALUES
(1, 'JPO', 'Journée Portes Ouvertes', '2025-06-15 09:00:00', 100, 1),
(2, 'JPO', 'Journée Portes Ouvertes', '2025-06-20 10:00:00', 80, 2),
(3, 'JPO', 'Journée Portes Ouvertes', '2025-07-01 14:00:00', 60, 3);

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int NOT NULL,
  `jpo_id` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `date_envoi` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  KEY `jpo_id` (`jpo_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `notification`
--

INSERT INTO `notification` (`id`, `utilisateur_id`, `jpo_id`, `type`, `date_envoi`) VALUES
(1, 2, 1, 'rappel', '2025-06-07 11:38:55'),
(2, 3, 2, 'confirmation', '2025-06-07 11:38:55');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `nom`) VALUES
(1, 'admin'),
(2, 'etudiant'),
(3, 'Moderateur');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`, `role_id`) VALUES
(1, 'Durand', 'Alice', 'alice@exemple.com', '$2y$10$e0NRa4h1j7zF2UQXwB6l6u3jQhQ6b6jJwX9l7jQhQ6b6jJwX9l7jQ', 1),
(2, 'Martin', 'Bob', 'bob@exemple.com', '$2y$10$e0NRa4h1j7zF2UQXwB6l6u3jQhQ6b6jJwX9l7jQhQ6b6jJwX9l7jQ', 2),
(3, 'Dupont', 'Chloe', 'chloe@exemple.com', '$2y$10$e0NRa4h1j7zF2UQXwB6l6u3jQhQ6b6jJwX9l7jQhQ6b6jJwX9l7jQ', 3),
(4, 'Dupont', 'Jean', 'jean@exemple.com', '$2y$10$xrDU06QFKy1xmC6YZTyzFOh/F6VGyb8BUQ7a4O0447Rmju2qOzNH2', 4);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
