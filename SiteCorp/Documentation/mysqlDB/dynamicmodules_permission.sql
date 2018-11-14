-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dynamicmodules
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `permission` (
  `Id_permission` int(11) NOT NULL AUTO_INCREMENT,
  `permissionName` varchar(45) DEFAULT NULL,
  `enabled` tinyint(4) DEFAULT NULL,
  `fk_idModule` int(11) NOT NULL,
  `type` char(1) DEFAULT NULL COMMENT 'L -->  Link\nA --> Action\nV --> View',
  `Cod_Permission` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id_permission`),
  KEY `fk_idModule_idx` (`fk_idModule`),
  CONSTRAINT `fk_idModule` FOREIGN KEY (`fk_idModule`) REFERENCES `modules` (`id_module`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'Acceso',1,1,'L','DASH'),(2,'Acceso',1,2,'L','CONFIG'),(3,'Acceso',1,3,'L','SECUR'),(4,'Listar Usuarios',1,3,'V',NULL),(5,'Listar Roles',1,3,'V',NULL),(6,'Crear Usuario',1,3,'A',NULL),(7,'Editar Usuario',1,3,'A',NULL),(8,'Eliminar Usuario',1,3,'A',NULL),(9,'Crear Rol',1,3,'A',NULL),(10,'Editar Rol',1,3,'A',NULL),(11,'Eliminar Rol',1,3,'A',NULL);
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-29 21:36:22
