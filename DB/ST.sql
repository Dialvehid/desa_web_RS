-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: SpacetimeDB
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `POST`
--

DROP TABLE IF EXISTS `POST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `POST` (
  `idpst` int NOT NULL AUTO_INCREMENT,
  `idusr` int NOT NULL,
  `texto` varchar(255) DEFAULT NULL,
  `fecha` date NOT NULL,
  `img` text,
  UNIQUE KEY `idpst` (`idpst`),
  KEY `pk_post_users` (`idusr`),
  CONSTRAINT `pk_post_users` FOREIGN KEY (`idusr`) REFERENCES `USRS` (`idusr`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `POST`
--

LOCK TABLES `POST` WRITE;
/*!40000 ALTER TABLE `POST` DISABLE KEYS */;
INSERT INTO `POST` VALUES (1,1,'Hola mundo, he nacido','2022-10-07','0');
/*!40000 ALTER TABLE `POST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REACT_POST`
--

DROP TABLE IF EXISTS `REACT_POST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REACT_POST` (
  `idpst` int NOT NULL,
  `idusr` int NOT NULL,
  KEY `pk_post` (`idpst`),
  KEY `pk_users` (`idusr`),
  CONSTRAINT `pk_post` FOREIGN KEY (`idpst`) REFERENCES `POST` (`idpst`),
  CONSTRAINT `pk_users` FOREIGN KEY (`idusr`) REFERENCES `USRS` (`idusr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REACT_POST`
--

LOCK TABLES `REACT_POST` WRITE;
/*!40000 ALTER TABLE `REACT_POST` DISABLE KEYS */;
INSERT INTO `REACT_POST` VALUES (1,1);
/*!40000 ALTER TABLE `REACT_POST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USRS`
--

DROP TABLE IF EXISTS `USRS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USRS` (
  `idusr` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apodo` varchar(100) DEFAULT NULL,
  `fechanac` date DEFAULT NULL,
  `correo` varchar(100) NOT NULL,
  `imgperf` text,
  `pass` varchar(100) DEFAULT NULL,
  UNIQUE KEY `idusr` (`idusr`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USRS`
--

LOCK TABLES `USRS` WRITE;
/*!40000 ALTER TABLE `USRS` DISABLE KEYS */;
INSERT INTO `USRS` VALUES (1,'Desa_Spacetime','BRS','2022-10-07','hola@gmail.com','0','123456789');
/*!40000 ALTER TABLE `USRS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 19:26:30
