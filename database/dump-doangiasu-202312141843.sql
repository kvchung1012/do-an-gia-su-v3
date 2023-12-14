-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: doangiasu
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booked_session`
--

DROP TABLE IF EXISTS `booked_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booked_session` (
  `booked_session_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `student_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tutor_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `checkout_session_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `course_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `data` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`booked_session_id`),
  KEY `student_id` (`student_id`),
  KEY `tutor_id` (`tutor_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `booked_session_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `booked_session_ibfk_2` FOREIGN KEY (`tutor_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `booked_session_ibfk_3` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booked_session`
--

LOCK TABLES `booked_session` WRITE;
/*!40000 ALTER TABLE `booked_session` DISABLE KEYS */;
INSERT INTO `booked_session` VALUES ('79d02a22-c287-49f8-b54a-0379c2e1bb6f','ed375ffe-41a8-4493-898e-03e53f73697d','5cb003c7-5133-47a7-bc28-0c4598fae73c','10000000',NULL,'e7f97a53-7eef-4596-935b-ce7be114d80b','PENDING',NULL),('b4f6e06b-9f54-43e4-96d9-cc2757f3cf71','ed375ffe-41a8-4493-898e-03e53f73697d','5cb003c7-5133-47a7-bc28-0c4598fae73c','10000000',NULL,'e7f97a53-7eef-4596-935b-ce7be114d80b','PENDING',NULL),('cf270766-834d-49ea-bd0c-952b68f1927a','ed375ffe-41a8-4493-898e-03e53f73697d','5cb003c7-5133-47a7-bc28-0c4598fae73c','10000000',NULL,'e7f97a53-7eef-4596-935b-ce7be114d80b','PENDING',NULL),('d8ca35d8-d2b1-4a57-8f9b-20169b6f21b6','ed375ffe-41a8-4493-898e-03e53f73697d','5cb003c7-5133-47a7-bc28-0c4598fae73c','10000000',NULL,'e7f97a53-7eef-4596-935b-ce7be114d80b','PENDING',NULL),('e90d269c-7f68-4799-b2e7-7a5fbe62ffbe','ed375ffe-41a8-4493-898e-03e53f73697d','5cb003c7-5133-47a7-bc28-0c4598fae73c','10000000',NULL,'e7f97a53-7eef-4596-935b-ce7be114d80b','PENDING',NULL);
/*!40000 ALTER TABLE `booked_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` varchar(50) NOT NULL,
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('4e49e06f-c467-4c72-ad56-2b42f3b2a1a9','Lập trình cơ bản',NULL,NULL),('59b15082-615b-4c81-9c5d-04a28ae5bf25','Tiếng anh',NULL,NULL),('644af5c5-ab82-4902-9348-a3111f2a284f','Lịch sử',NULL,NULL),('64e8282f-5f86-4812-8574-38726643e9e0','Tiếng việt',NULL,NULL),('6644b2be-a693-4c34-8e6b-f1ac38f08ecd','Hóa học',NULL,NULL),('78b920ea-5882-4137-9a79-b02e47f0157d','Văn học',NULL,'Bộ môn dành cho ai thi khối C'),('d226c3b6-f530-471a-bdf6-343e8427a402','Toán học',NULL,NULL),('ed978dca-2498-46dd-b12d-43256ad77b2d','Vật lý',NULL,NULL),('edf25b59-c94a-48f6-9d8b-e71ab4a79338','Hóa học',NULL,NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image_url` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `number_of_phase_required` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tutor_profile_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ratting` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `category_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `spend_time` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_publish` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `duration` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `tutor_profile_id` (`tutor_profile_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`tutor_profile_id`) REFERENCES `tutor_profile` (`tutor_profile_id`),
  CONSTRAINT `course_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('e7f97a53-7eef-4596-935b-ce7be114d80b','https://devhome.thuvien.edu.vn/_next/image?url=https%3A%2F%2Fapi.thuvienso.minhviet.group%2Fimages%2Fbook%2Fcau-be-chan-cuu.jpg%3Fw%3D320&w=1080&q=75','Lập trình cơ bản','Các kiến thức cơ bản, nền móng của ngành IT','10000000','10','26d0e7b8-68b7-4aa2-94b0-3cb9dcabd6f4','5','4e49e06f-c467-4c72-ad56-2b42f3b2a1a9','30h','1','30h');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_program`
--

DROP TABLE IF EXISTS `course_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_program` (
  `course_program_id` varchar(50) NOT NULL,
  `course_id` varchar(50) DEFAULT NULL,
  `tittle` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_publish` varchar(50) DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`course_program_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `course_program_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_program`
--

LOCK TABLES `course_program` WRITE;
/*!40000 ALTER TABLE `course_program` DISABLE KEYS */;
INSERT INTO `course_program` VALUES ('1fb00b26-409e-48ee-8072-8a75997e6788','e7f97a53-7eef-4596-935b-ce7be114d80b','Ông anh 96 cơ khí bách khao','1','1fb00b26-409e-48ee-8072-8a75997e6788'),('22035540-bc48-4942-8ba7-3e8c5ed4af46','e7f97a53-7eef-4596-935b-ce7be114d80b','Lập trình lương 1000$?','1','Học IT cần tố chất g'),('415c75ce-986a-402c-98e1-86cbc5d4ceb2','e7f97a53-7eef-4596-935b-ce7be114d80b','300 Bài code thiếu nhi','1','1fb00b26-409e-48ee-8072-8a75997e6788');
/*!40000 ALTER TABLE `course_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_program_phase`
--

DROP TABLE IF EXISTS `course_program_phase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_program_phase` (
  `course_program_phase_id` varchar(50) NOT NULL,
  `course_program_id` varchar(50) DEFAULT NULL,
  `orders` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `content` varchar(50) DEFAULT NULL,
  `overview_url` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`course_program_phase_id`),
  KEY `course_program_id` (`course_program_id`),
  CONSTRAINT `course_program_phase_ibfk_1` FOREIGN KEY (`course_program_id`) REFERENCES `course_program` (`course_program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_program_phase`
--

LOCK TABLES `course_program_phase` WRITE;
/*!40000 ALTER TABLE `course_program_phase` DISABLE KEYS */;
INSERT INTO `course_program_phase` VALUES ('1ead0175-3bca-4521-831e-8122d753701b','415c75ce-986a-402c-98e1-86cbc5d4ceb2','2','Sinh Viên IT cần có những gì','3. Mua áo F8 | Đăng ký học Offline','3. Mua áo F8 | Đăng ký học Offline'),('d5b31177-6d41-4b26-b2c3-4d8545d755a7','415c75ce-986a-402c-98e1-86cbc5d4ceb2','1','Hoc IT cần tố chất gì','3. Mua áo F8 | Đăng ký học Offline','3. Mua áo F8 | Đăng ký học Offline'),('d9c916a7-d054-4b05-a8f5-ffd5abdad70a','1fb00b26-409e-48ee-8072-8a75997e6788','3','Github','3. Mua áo F8 | Đăng ký học Offline','3. Mua áo F8 | Đăng ký học Offline'),('e00406d3-5feb-44c9-9897-3d20c2a442ba','22035540-bc48-4942-8ba7-3e8c5ed4af46','1','Mô hình client server là gì','3. Mua áo F8 | Đăng ký học Offline','3. Mua áo F8 | Đăng ký học Offline'),('f1d70a88-54fc-4e1c-9288-79b879ce41af','22035540-bc48-4942-8ba7-3e8c5ed4af46','2','Domain là gì','3. Mua áo F8 | Đăng ký học Offline','3. Mua áo F8 | Đăng ký học Offline');
/*!40000 ALTER TABLE `course_program_phase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_transaction`
--

DROP TABLE IF EXISTS `payment_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_transaction` (
  `payment_transaction_id` varchar(50) NOT NULL,
  `tutor_id` varchar(50) DEFAULT NULL,
  `student_id` varchar(50) DEFAULT NULL,
  `amount` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`payment_transaction_id`),
  KEY `tutor_id` (`tutor_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `payment_transaction_ibfk_1` FOREIGN KEY (`tutor_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `payment_transaction_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_transaction`
--

LOCK TABLES `payment_transaction` WRITE;
/*!40000 ALTER TABLE `payment_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('34179fbd-7abe-446f-b361-8d863006b178','Admin'),('3fd935a1-4ef6-403c-976a-df558dd911e1','Student'),('90ce2234-d181-46bb-b0b6-da055cc960bd','Tutor');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `schedule_id` varchar(50) NOT NULL,
  `tutor_available_date_id` varchar(50) DEFAULT NULL,
  `student_id` varchar(50) DEFAULT NULL,
  `booked_session_id` varchar(50) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `tutor_available_date_id` (`tutor_available_date_id`),
  KEY `student_id` (`student_id`),
  KEY `schedule_FK` (`booked_session_id`),
  CONSTRAINT `schedule_FK` FOREIGN KEY (`booked_session_id`) REFERENCES `booked_session` (`booked_session_id`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`tutor_available_date_id`) REFERENCES `tutor_available_date` (`tutor_available_date_id`),
  CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES ('537ef6e5-3dec-4795-b48a-9adf56843211','743a51a6-3193-4952-b3e8-8abab838f227','ed375ffe-41a8-4493-898e-03e53f73697d',NULL,'PENDING'),('ea637bfa-aee8-49aa-aaa6-416146a45b6c','743a51a6-3193-4952-b3e8-8abab838f227','ed375ffe-41a8-4493-898e-03e53f73697d',NULL,'PENDING');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school` (
  `school_id` varchar(50) NOT NULL,
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `location` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `level` varchar(50) DEFAULT NULL,
  `established_date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_education`
--

DROP TABLE IF EXISTS `student_education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_education` (
  `student_education_id` varchar(50) NOT NULL,
  `student_profile_id` varchar(50) DEFAULT NULL,
  `school_id` varchar(50) DEFAULT NULL,
  `from_year` varchar(50) DEFAULT NULL,
  `to_year` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`student_education_id`),
  KEY `student_profile_id` (`student_profile_id`),
  KEY `school_id` (`school_id`),
  CONSTRAINT `student_education_ibfk_1` FOREIGN KEY (`student_profile_id`) REFERENCES `student_profile` (`student_profile_id`),
  CONSTRAINT `student_education_ibfk_2` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_education`
--

LOCK TABLES `student_education` WRITE;
/*!40000 ALTER TABLE `student_education` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_profile`
--

DROP TABLE IF EXISTS `student_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_profile` (
  `student_profile_id` varchar(50) NOT NULL,
  `student_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`student_profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_profile`
--

LOCK TABLES `student_profile` WRITE;
/*!40000 ALTER TABLE `student_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `token_id` varchar(50) NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `refresh_token` varchar(50) DEFAULT NULL,
  `expired_at` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`token_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor_available_date`
--

DROP TABLE IF EXISTS `tutor_available_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor_available_date` (
  `tutor_available_date_id` varchar(50) NOT NULL,
  `start_time` varchar(50) DEFAULT NULL,
  `end_time` varchar(50) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `set_id` varchar(50) DEFAULT NULL,
  `tutor_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`tutor_available_date_id`),
  KEY `tutor_available_date_FK` (`tutor_id`),
  CONSTRAINT `tutor_available_date_FK` FOREIGN KEY (`tutor_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor_available_date`
--

LOCK TABLES `tutor_available_date` WRITE;
/*!40000 ALTER TABLE `tutor_available_date` DISABLE KEYS */;
INSERT INTO `tutor_available_date` VALUES ('19fffccb-b60d-4f8b-a1c9-8933aeda68b8',NULL,NULL,NULL,NULL,NULL),('1f3c6c55-40a4-4342-a2c4-803a9c1e896b',NULL,NULL,NULL,NULL,NULL),('743a51a6-3193-4952-b3e8-8abab838f227','12:00','13:00','10/12/2000',NULL,'31d7c7cd-be6b-4298-973a-9eb017408a94'),('7eae2ed7-30c1-4c37-bfe5-9c9e4313bbe2','12:00','13:00','10/12/2001',NULL,'31d7c7cd-be6b-4298-973a-9eb017408a94'),('7f6a55e8-b186-4e1a-af00-2b4bbcd6d7ef',NULL,NULL,NULL,NULL,NULL),('bdf73744-0b96-4c8a-96c3-172efc6029c9',NULL,NULL,NULL,NULL,NULL),('ffbdc647-8496-4682-98b3-00e367274565',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tutor_available_date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor_certification`
--

DROP TABLE IF EXISTS `tutor_certification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor_certification` (
  `tutor_certification_id` varchar(50) NOT NULL,
  `tutor_profile_id` varchar(50) DEFAULT NULL,
  `organization` varchar(50) DEFAULT NULL,
  `score` varchar(50) DEFAULT NULL,
  `award_url` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tutor_certification_id`),
  KEY `tutor_profile_id` (`tutor_profile_id`),
  CONSTRAINT `tutor_certification_ibfk_1` FOREIGN KEY (`tutor_profile_id`) REFERENCES `tutor_profile` (`tutor_profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor_certification`
--

LOCK TABLES `tutor_certification` WRITE;
/*!40000 ALTER TABLE `tutor_certification` DISABLE KEYS */;
INSERT INTO `tutor_certification` VALUES ('083af384-f5c8-4919-9485-372a24009882','5cb003c7-5133-47a7-bc28-0c4598fae73c','profile pro update em oi','10',NULL,'day la bang fake lastest'),('d71f40ab-fc81-49b5-85f5-034d6275e5f3','5cb003c7-5133-47a7-bc28-0c4598fae73c','profile pro update em oi','10',NULL,'day la bang fake 123'),('f058cb21-14cb-40f1-b632-9e060bf11112','5cb003c7-5133-47a7-bc28-0c4598fae73c','profile pro update em oi','10',NULL,'day la bang fake');
/*!40000 ALTER TABLE `tutor_certification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor_education`
--

DROP TABLE IF EXISTS `tutor_education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor_education` (
  `tutor_education_id` varchar(50) NOT NULL,
  `tutor_profile_id` varchar(50) DEFAULT NULL,
  `school_id` varchar(50) DEFAULT NULL,
  `score_url` varchar(50) DEFAULT NULL,
  `from_year` varchar(50) DEFAULT NULL,
  `to_year` varchar(50) DEFAULT NULL,
  `favorite_subject` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tutor_education_id`),
  KEY `tutor_profile_id` (`tutor_profile_id`),
  KEY `school_id` (`school_id`),
  CONSTRAINT `tutor_education_ibfk_1` FOREIGN KEY (`tutor_profile_id`) REFERENCES `tutor_profile` (`tutor_profile_id`),
  CONSTRAINT `tutor_education_ibfk_2` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor_education`
--

LOCK TABLES `tutor_education` WRITE;
/*!40000 ALTER TABLE `tutor_education` DISABLE KEYS */;
/*!40000 ALTER TABLE `tutor_education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor_experience`
--

DROP TABLE IF EXISTS `tutor_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor_experience` (
  `tutor_experience_id` varchar(50) NOT NULL,
  `tutor_profile_id` varchar(50) DEFAULT NULL,
  `organization` varchar(50) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `start_time` varchar(50) DEFAULT NULL,
  `end_time` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tutor_experience_id`),
  KEY `tutor_profile_id` (`tutor_profile_id`),
  CONSTRAINT `tutor_experience_ibfk_1` FOREIGN KEY (`tutor_profile_id`) REFERENCES `tutor_profile` (`tutor_profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor_experience`
--

LOCK TABLES `tutor_experience` WRITE;
/*!40000 ALTER TABLE `tutor_experience` DISABLE KEYS */;
/*!40000 ALTER TABLE `tutor_experience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor_profile`
--

DROP TABLE IF EXISTS `tutor_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor_profile` (
  `tutor_profile_id` varchar(50) NOT NULL,
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `stripe_account_id` varchar(50) DEFAULT NULL,
  `is_stripe_verified` varchar(50) DEFAULT NULL,
  `balance` varchar(50) DEFAULT NULL,
  `has_charge_first_time` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tutor_profile_id`),
  KEY `tutor_profile_FK` (`user_id`),
  CONSTRAINT `tutor_profile_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor_profile`
--

LOCK TABLES `tutor_profile` WRITE;
/*!40000 ALTER TABLE `tutor_profile` DISABLE KEYS */;
INSERT INTO `tutor_profile` VALUES ('26d0e7b8-68b7-4aa2-94b0-3cb9dcabd6f4','5cb003c7-5133-47a7-bc28-0c4598fae73c','profile pro update em oi','1','123123','1','100000','0'),('29642d57-51a1-406d-8b46-90d6f92c21d2','89239e55-5409-4829-b0d9-cb68e41d2ba9','','1','','1','0','0'),('33bd6df6-2bda-4847-a6ba-0ba971a48d28','b35a0066-2493-4407-b6fb-914a07b0db5d','','1','','1','0','0'),('3f9ab80a-b9cb-40e5-855b-86236645354e','f6b66d9c-0217-4eb4-ba8a-3c5aa5989600','asds asd asdas đá','1','123123','1','0','0'),('5cb003c7-5133-47a7-bc28-0c4598fae73c',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('7094ecac-ce82-4ea7-91d5-270d5fe18396','fb8bc573-19e0-4e5a-9c4f-ff98fde3dd92','qe12313','1','123123123','1','0','0');
/*!40000 ALTER TABLE `tutor_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutoring_contract`
--

DROP TABLE IF EXISTS `tutoring_contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutoring_contract` (
  `tutoring_contract_id` varchar(50) NOT NULL,
  `booked_session_id` varchar(50) DEFAULT NULL,
  `tutor_id` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `expiration_name` varchar(50) DEFAULT NULL,
  `image_url` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tutoring_contract_id`),
  KEY `booked_session_id` (`booked_session_id`),
  KEY `tutor_id` (`tutor_id`),
  CONSTRAINT `tutoring_contract_ibfk_1` FOREIGN KEY (`booked_session_id`) REFERENCES `booked_session` (`booked_session_id`),
  CONSTRAINT `tutoring_contract_ibfk_2` FOREIGN KEY (`tutor_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutoring_contract`
--

LOCK TABLES `tutoring_contract` WRITE;
/*!40000 ALTER TABLE `tutoring_contract` DISABLE KEYS */;
INSERT INTO `tutoring_contract` VALUES ('7d1103e9-7b15-4ada-bbea-e0036eb970ff','cf270766-834d-49ea-bd0c-952b68f1927a','5cb003c7-5133-47a7-bc28-0c4598fae73c',NULL,NULL,NULL),('8e5c92fa-2e16-4601-a0a0-7e5843a73270','79d02a22-c287-49f8-b54a-0379c2e1bb6f','5cb003c7-5133-47a7-bc28-0c4598fae73c',NULL,NULL,NULL),('a705bb09-288c-4c78-bb73-a50dcc2ad09c','d8ca35d8-d2b1-4a57-8f9b-20169b6f21b6','5cb003c7-5133-47a7-bc28-0c4598fae73c',NULL,NULL,NULL),('d047c629-3f82-4a3f-9ddb-3745926ec0ba','e90d269c-7f68-4799-b2e7-7a5fbe62ffbe','5cb003c7-5133-47a7-bc28-0c4598fae73c',NULL,NULL,NULL);
/*!40000 ALTER TABLE `tutoring_contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutoring_feedback`
--

DROP TABLE IF EXISTS `tutoring_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutoring_feedback` (
  `tutoring_feedback_id` varchar(50) NOT NULL,
  `schedule_id` varchar(50) DEFAULT NULL,
  `message` varchar(50) DEFAULT NULL,
  `ratting` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tutoring_feedback_id`),
  KEY `schedule_id` (`schedule_id`),
  CONSTRAINT `tutoring_feedback_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutoring_feedback`
--

LOCK TABLES `tutoring_feedback` WRITE;
/*!40000 ALTER TABLE `tutoring_feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `tutoring_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_verification_request`
--

DROP TABLE IF EXISTS `user_verification_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_verification_request` (
  `user_verification_request_id` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `data` varchar(50) DEFAULT NULL,
  `expiration_time` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `tuser_verification_request_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_verification_request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_verification_request`
--

LOCK TABLES `user_verification_request` WRITE;
/*!40000 ALTER TABLE `user_verification_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_verification_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `avatar_url` varchar(50) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `google_id` varchar(50) DEFAULT NULL,
  `role_id` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('31d7c7cd-be6b-4298-973a-9eb017408a94','tutor@gmail.com','admin','123132','1231','1','','0987654321','','3fd935a1-4ef6-403c-976a-df558dd911e1',''),('5cb003c7-5133-47a7-bc28-0c4598fae73c','admin@gmail.com','admin','admin','admin','1',NULL,'0987654321',NULL,'34179fbd-7abe-446f-b361-8d863006b178',NULL),('635ea121-e67a-4e1a-ad62-f069e6b2de47','nguyenphuthinh122500@gmail.com','admin',NULL,'Thinh','0','any','1234567890','any','3fd935a1-4ef6-403c-976a-df558dd911e1','any'),('778bd63f-7fd6-492b-ba6e-509c99998c93','student@gmail.com','admin','student C','123','0',NULL,'0897654321',NULL,'3fd935a1-4ef6-403c-976a-df558dd911e1',NULL),('89239e55-5409-4829-b0d9-cb68e41d2ba9','teacher2@gmail.com','123456','Chung','Khuất','female','','0962165244',NULL,'90ce2234-d181-46bb-b0b6-da055cc960bd','0'),('a74386e7-9b8a-424a-bd01-aa49804d8d78','tutor@gmail.com','admin','tutor a',NULL,'1',NULL,'0987654321',NULL,'90ce2234-d181-46bb-b0b6-da055cc960bd',NULL),('ac612c1d-026c-4950-8fa0-38c6b487fddd','tutor_math@gmail.com','123456','mr','math','male','','0987654321',NULL,'90ce2234-d181-46bb-b0b6-da055cc960bd','0'),('b35a0066-2493-4407-b6fb-914a07b0db5d','teacher1@gmail.com','123456','Cc','Cc','female','','0987654321',NULL,'90ce2234-d181-46bb-b0b6-da055cc960bd','0'),('ba1d9eef-4b83-4d2a-b4d9-3ad6716400d6','nguyenphuthinh122500@gmail.com','admin',NULL,'Thinh','0','any','1234567890','any','3fd935a1-4ef6-403c-976a-df558dd911e1','any'),('c50ae68e-ac28-4fa6-b311-463df65d5375','admin@gmail.com','admin','Chung','khuat','1','123312','0987654321',NULL,'3fd935a1-4ef6-403c-976a-df558dd911e1',NULL),('cf41d30b-3c9c-45ad-bbe6-1b9417895ebf','nguyenphuthinh122500@gmail.com','admin',NULL,'Thinh','0','any','1234567890','any','3fd935a1-4ef6-403c-976a-df558dd911e1','any'),('ed375ffe-41a8-4493-898e-03e53f73697d','nguyenphuthinh122500@gmail.com','admin',NULL,'Thinh','0','any','1234567890','any','3fd935a1-4ef6-403c-976a-df558dd911e1','any'),('f6b66d9c-0217-4eb4-ba8a-3c5aa5989600','teacher_math@gmail.com','123456','van','toan','male','','0987654321',NULL,'90ce2234-d181-46bb-b0b6-da055cc960bd','0'),('fb8bc573-19e0-4e5a-9c4f-ff98fde3dd92','teachermath@gmail.com','123456','Chung','Khuất','female','','0912345643',NULL,'90ce2234-d181-46bb-b0b6-da055cc960bd','0'),('fea78fc7-d503-4a82-af6b-a7526a99066f','khuatchung1012@gmail.com','admin','Khuất','Chung','1','','0987654321','','90ce2234-d181-46bb-b0b6-da055cc960bd','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'doangiasu'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-14 18:43:38
