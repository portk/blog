-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.34 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- blog 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `blog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `blog`;

-- 테이블 blog.board 구조 내보내기
CREATE TABLE IF NOT EXISTS `board` (
  `board_id` bigint NOT NULL AUTO_INCREMENT,
  `subject_id` bigint NOT NULL,
  `writer` bigint NOT NULL,
  `board_name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FK_board_subject` (`subject_id`),
  KEY `FK_board_user` (`writer`),
  CONSTRAINT `FK_board_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_board_user` FOREIGN KEY (`writer`) REFERENCES `user` (`code`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 blog.post 구조 내보내기
CREATE TABLE IF NOT EXISTS `post` (
  `post_id` bigint NOT NULL AUTO_INCREMENT,
  `board_id` bigint NOT NULL,
  `writer` bigint NOT NULL,
  `post_title` varchar(300) NOT NULL,
  `post_context` varchar(2000) DEFAULT NULL,
  `post_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `post_modify` tinyint(1) DEFAULT '0',
  `read_count` int DEFAULT '0',
  `post_recommand` int DEFAULT '0',
  PRIMARY KEY (`post_id`),
  KEY `FK_post_board` (`board_id`),
  KEY `FK_post_user` (`writer`),
  CONSTRAINT `FK_post_board` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_post_user` FOREIGN KEY (`writer`) REFERENCES `user` (`code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 blog.reply 구조 내보내기
CREATE TABLE IF NOT EXISTS `reply` (
  `reply_id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `writer` bigint NOT NULL,
  `reply_context` varchar(600) DEFAULT NULL,
  `reply_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `reply_modify` tinyint(1) DEFAULT '0',
  `sub_id` bigint DEFAULT NULL,
  PRIMARY KEY (`reply_id`),
  KEY `FK_reply_post` (`post_id`),
  KEY `FK_reply_user` (`writer`),
  KEY `FK_reply_reply` (`sub_id`),
  CONSTRAINT `FK_reply_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_reply_reply` FOREIGN KEY (`sub_id`) REFERENCES `reply` (`reply_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_reply_user` FOREIGN KEY (`writer`) REFERENCES `user` (`code`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 blog.subject 구조 내보내기
CREATE TABLE IF NOT EXISTS `subject` (
  `subject_id` bigint NOT NULL AUTO_INCREMENT,
  `writer` bigint NOT NULL,
  `subject_name` varchar(300) NOT NULL,
  PRIMARY KEY (`subject_id`),
  KEY `FK_subject_user` (`writer`),
  CONSTRAINT `FK_subject_user` FOREIGN KEY (`writer`) REFERENCES `user` (`code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 blog.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `code` bigint NOT NULL AUTO_INCREMENT,
  `id` varchar(60) NOT NULL,
  `pw` varchar(60) NOT NULL,
  `nickname` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
