DROP DATABASE IF EXISTS `ionic_db`;
CREATE DATABASE `ionic_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

DROP TABLE IF EXISTS `ionic_db`.`patients`;
CREATE TABLE `ionic_db`.`patients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fullname` varchar(64) DEFAULT NULL,
  `doctor` varchar(64) DEFAULT NULL,
  `recipes_quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ionic_db`.`recipes`;
CREATE TABLE `ionic_db`.`recipes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `recipeName` varchar(64) NOT NULL DEFAULT '""',
  `desc` varchar(64) NOT NULL DEFAULT '""',
  `quantity` int DEFAULT NULL,
  `patientId` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `recipe_FK_idx` (`patientId`),
  CONSTRAINT `recipeFK_` FOREIGN KEY (`patientId`) REFERENCES `ionic_db`.`patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `ionic_db`.`users`;
CREATE TABLE `ionic_db`.`users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(64) NOT NULL DEFAULT '""',
  `password` varchar(32) NOT NULL DEFAULT '""',
  `token` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TRIGGER IF EXISTS `ionic_db`.`_recipes_AFTER_INSERT_`;
CREATE TRIGGER `ionic_db`.`_recipes_AFTER_INSERT_` AFTER INSERT ON `ionic_db`.`recipes` FOR EACH ROW
	UPDATE patients
    SET  recipes_quantity = recipes_quantity + 1
    WHERE id = NEW.patientId;

DROP TRIGGER IF EXISTS `ionic_db`.`_recipes_BEFORE_DELETE_`;
CREATE TRIGGER `ionic_db`.`_recipes_BEFORE_DELETE_` BEFORE DELETE ON `ionic_db`.`recipes` FOR EACH ROW
	UPDATE patients
    SET  recipes_quantity = recipes_quantity - 1 
    WHERE id = OLD.patientId;
    
DROP TRIGGER IF EXISTS `ionic_db`.`_users_BEFORE_INSERT_`;
CREATE  TRIGGER `ionic_db`.`_users_BEFORE_INSERT_` BEFORE INSERT ON `ionic_db`.`users` FOR EACH ROW
	 SET NEW.password = MD5(NEW.password);


