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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `username` varchar(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Id_user` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `companyName` varchar(45) DEFAULT NULL,
  `token` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '1',
  `fk_idRole` int(11) DEFAULT NULL,
  `avatar_img` varchar(100) NOT NULL DEFAULT '../../assets/img/faces/face-0.jpg',
  PRIMARY KEY (`Id_user`),
  KEY `fk_idRole_idx` (`fk_idRole`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('gbarquero','gerald.bv1@gmail.com','123456','2018-08-24 02:57:41',1,'Gerald','Barquero','GBV3','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdiYXJxdWVybyIsImlhdCI6MTU0MDMzMDU3NSwiZXhwIjo',1,1,'../../assets/img/faces/face-0.jpg'),('admin','admin@admin.com','admin','2018-09-10 23:00:11',2,'Admin','admin','admin',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('user3','user3@gmail.com','123456','2018-09-10 23:28:58',3,'user3','user3','GBV',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('Andibarv69','andibarv@gmail.com','123456','2018-09-10 23:41:09',4,'Andrey','Barquero','ABV','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFuZGliYXJ2NjkiLCJpYXQiOjE1MzY2MjM0MzQsImV4cCI',1,0,'../../assets/img/faces/face-0.jpg'),('Andibarv6','andibarv@gmail.com','12345','2018-09-10 23:43:35',5,'andrey','barquero','asd',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('javi','javi@gmail.com','123456','2018-09-11 14:14:31',6,'Javi','javi','JR',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('pjimenez','pjimenez@hbf.com','123456','2018-09-11 16:41:24',7,'pablo','jimenez','HBF',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('pablo','pa@gmail.com','123456','2018-09-11 16:44:03',8,'pablito','pablito','PPP',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('gjimenez','gerald.bv1@gmail.com','123456','2018-09-11 16:50:03',9,'gerald','jimenez','GBV',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('ajimenez','admin@admin.com','123456','2018-09-11 16:50:50',10,'Admin','jimenez','admin',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('user4','javi@gmail.com','123','2018-09-11 16:52:53',11,'Javi','user3','JR',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('admin2','admin@admin.com','123456','2018-09-11 16:58:34',12,'pablo','admin','admin',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('user545','user545@user545.user545','user545','2018-09-11 17:01:44',13,'user545','user545','user545',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('pjimenez3','pjimenez3','pjimenez3','2018-09-11 17:12:38',14,'pablito3','user3','pjimenez3',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('admin23','admin23','admin23','2018-09-11 17:15:04',15,'Admin','admin','admin23',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('ss','ss','ss','2018-09-11 17:24:47',16,'sss','sss','ss',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('qwe','qwe','qwe','2018-09-11 17:31:40',17,'pablo','qwe','qwe',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('123','123','132','2018-09-11 17:33:09',18,'123','123','13',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('1234','1234','1234','2018-09-11 17:36:00',19,'1234','1234','1234',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('ww','ww','ww','2018-09-11 17:40:03',20,'wwww','www','ww',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('1','1','1','2018-09-11 18:19:15',21,'1','1','1',NULL,0,0,'../../assets/img/faces/face-0.jpg'),('0','0','0','2018-09-11 18:32:50',22,'0','0','0',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('12345','12345','12345','2018-09-11 18:35:16',23,'12345','12345','12345',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('111','111','111','2018-09-11 18:36:47',24,'111','111','111',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('5','5','5','2018-09-11 18:38:50',25,'5','5','5',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('7','7','7','2018-09-11 19:24:35',26,'7','7','7',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('8','8','8','2018-09-11 19:30:04',27,'8','8','8',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('10','10','10','2018-09-11 19:38:43',28,'10','10','10',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('22','22','22','2018-09-11 20:58:48',29,'22','23','22',NULL,0,0,'../../assets/img/faces/face-0.jpg'),('00','00','00','2018-09-11 21:57:29',30,'00','00','00',NULL,0,0,'../../assets/img/faces/face-0.jpg'),('000','000','000','2018-09-11 21:57:50',31,'000','000','000',NULL,0,0,'../../assets/img/faces/face-0.jpg'),('ebarquero','ebarquero@gmail.com','123456','2018-09-15 00:50:39',32,'Eduardo','Barquero','EBV',NULL,1,0,'../../assets/img/faces/face-0.jpg'),('ptest','prueba@prueba.com','123456','2018-10-02 22:41:23',33,'prueba','pruebaasdsdsd','test',NULL,0,0,'../../assets/img/faces/face-0.jpg'),('test23','test23@gmail.com','test23','2018-10-23 16:04:41',34,'test23','test23','test23',NULL,1,NULL,'../../assets/img/faces/face-0.jpg'),('prueba76','prueba76','prueba76','2018-10-23 21:48:20',35,'prueba76','prueba76','prueba76',NULL,1,2,'../../assets/img/faces/face-0.jpg'),('prueba772','prueba772','prueba772','2018-10-23 21:51:03',36,'prueba772','prueba772','prueba772',NULL,1,2,'../../assets/img/faces/face-0.jpg'),('pruebaRol1','pruebaRol1','pruebaRol1','2018-10-23 21:52:44',37,'pruebaRol1','pruebaRol1','pruebaRol1',NULL,1,2,'../../assets/img/faces/face-0.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
